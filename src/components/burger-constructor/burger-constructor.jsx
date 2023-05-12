import { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from "react-dnd";

import {
    ConstructorElement
    , Button
    , CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

// components
import Modal from '../modal/modal';
import OrderDetails, { getOrderDetails } from '../order-details/order-details';
import BurgerDraggableConstructorItem from '../burger-draggable-constructor-item/burger-draggable-constructor-item';


// shared
import { IngredientType } from '../../shared/types/ingredient-type';
import {
    addConstructorIngredient
    , deleteAllConstructorIngredients
    , setBunToConstructor
} from '../../services/actions/burger-constructor-ingredients';
import {
    increaseIngredientCount
    , resetIngredientsCountByType
    , resetAllIngredientsCount
} from '../../services/actions/burger-incredients';
import { deleteOrderDetails } from '../../services/actions/order-details';

// styles
import bcStyle from './burger-constructor.module.css';
import appStyle from '../app/app.module.css';

export const getConstructorIngredients = (store) => ({
    ingredients: store?.constructorIngredients?.items || []
    , bun: store?.constructorIngredients?.bun
});

export default function BurgerConstructor() {

    const dispatch = useDispatch();
    const [{ isOver }, dropTarget] = useDrop({
        accept: "ingredient"
        , drop(payload) {
            switch (payload?.ingredient?.type) {
                case IngredientType.Bun:
                    // reset all buns
                    dispatch(resetIngredientsCountByType(IngredientType.Bun));
                    dispatch(setBunToConstructor(payload?.ingredient));
                    // increase for upperBun
                    dispatch(increaseIngredientCount(payload?.ingredient?._id));
                    // increase for lowerBun
                    dispatch(increaseIngredientCount(payload?.ingredient?._id));
                    break;
                default:
                    dispatch(addConstructorIngredient(payload?.ingredient));
                    dispatch(increaseIngredientCount(payload?.ingredient?._id));
                    break;
            }
        }
        , collect: (monitor) => ({
            isOver: monitor.isOver(),
        })
    });    

    const { ingredients, bun } = useSelector(getConstructorIngredients);
    const { order } = useSelector(getOrderDetails);

    const [modalVisible, setModalVisible] = useState(false);
    const total = useMemo(() => (2 * bun?.price || 0) + (ingredients?.map(ing => ing?.price || 0)?.reduce((sum, currValue) => sum + currValue, 0) || 0), [ingredients, bun]);

    const modal = (
        <Modal setVisible={e => {
            setModalVisible(e);
            if (!order?.number) return;            
            dispatch(resetAllIngredientsCount());
            dispatch(setBunToConstructor(null));
            dispatch(deleteAllConstructorIngredients());
            dispatch(deleteOrderDetails());
        }}>
            {!bun
                ? <div className='text text_type_main-medium'>
                    Извините, Вы не добавили булки в список ингредиентов.
                    <br />
                    Добавьте, пожалуйста, булки в список ингредиентов.
                </div>
                : <OrderDetails />
            }            
        </Modal>
    );

    return (
        <>
            <div style={{ overflow: 'hidden' }}>
                {modalVisible && modal}
            </div>

            {bun && (
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`Верх: ${bun.name}`}
                    price={bun.price}
                    thumbnail={bun.image_mobile}
                    extraClass={`${bcStyle.burgerItem}`}
                />
            )}

            <div ref={dropTarget} className={`${appStyle.appBurgerSectionContent} custom-scroll ${isOver && appStyle.appBurgerSectionContentBordered}`}>
                {!bun && ingredients.length === 0 &&
                    <div className='text text_type_main-medium text_color_inactive' style={{ textAlign: "center" }}>
                        Перетяните сюда инградиенты...
                    </div>
                }
                {
                    ingredients.map((ing, ind) => {
                        return (
                            ing.type !== IngredientType.Bun &&
                            <BurgerDraggableConstructorItem
                                key={`${ind}_${ing._id}_wrapper`}
                                ingredient={ing}
                                index={ind}
                                isLast={ind < ingredients.length}
                            />
                        )
                    })
                }
            </div>

            {bun && (
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`Низ: ${bun.name}`}
                    price={bun.price}
                    thumbnail={bun.image_mobile}
                    extraClass={`${bcStyle.burgerItem} mt-4`}
                />
            )}

            <div className={`p-10 ${bcStyle.orderButtonWrapper}`}>
                <span className='text text_type_digits-medium mr-1'>{total}</span>
                <span className='mr-10'><CurrencyIcon /></span>
                <Button htmlType="button"
                    type="primary"
                    size="medium"
                    onClick={() => setModalVisible(true)}>
                    Оформить заказ
                </Button>
            </div>
        </>
    );
}