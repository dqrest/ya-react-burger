import { useMemo, useState } from 'react';
import { useDrop } from "react-dnd";
import { useNavigate } from 'react-router-dom';

import {
    ConstructorElement
    , Button
    , CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

// components
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import BurgerDraggableConstructorItem from '../burger-draggable-constructor-item/burger-draggable-constructor-item';

// shared
import { useSelector } from '../../services/hooks';
import { TBurgerIngredientsItemDto, TConstructorIngredientItem } from '../../shared/dtos/burger-ingredients-item-dto';
import { TIngredient } from '../../shared/types/ingredient-type';
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
import { useProvideAuth } from '../../services/auth';
import { getConstructorIngredients } from '../../services/selectors/burger-constructor-ingredients';
import { useOrderDetails } from '../../services/selectors/order-details';
import { getCookie } from '../../shared/utils/cookie';
import { makeOrder } from '../../services/actions/order-details';
import { useDispatch } from '../../services/hooks';

// styles
import bcStyle from './burger-constructor.module.css';
import appStyle from '../app/app.module.css';

export type TConstructorIngredientsSelector = {
    ingredients: Array<TConstructorIngredientItem>,
    bun: TConstructorIngredientItem
};

export default function BurgerConstructor() {

    const { user } = useProvideAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [{ isOver }, dropTarget] = useDrop<TIngredientDrag, unknown, TIngredientDropCollectedProps>({
        accept: "ingredient"
        , drop(payload: TIngredientDrag): void {
            switch (payload?.ingredient?.type) {
                case TIngredient.Bun:
                    // reset all buns
                    dispatch(resetIngredientsCountByType(TIngredient.Bun));
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

    const { items: ingredients, bun: bun } = useSelector(getConstructorIngredients);
    const { item } = useSelector(useOrderDetails);

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const total = useMemo<number>(() => (2 * (bun?.price || 0)) + (ingredients?.map(ing => ing?.price || 0)?.reduce((sum, currValue) => sum + currValue, 0) || 0), [ingredients, bun]);

    const ids = useMemo<string[]>(() => bun
        ? ingredients
            ? [...ingredients?.filter(ing => ing?._id).map(ing => ing._id) || [], bun?._id, bun?._id]
            : [bun._id, bun._id]
        : [],
        [ingredients, bun]);

    const modal = (
        <Modal
            setVisible={(e: any) => {             
                setModalVisible(e);
                if (!item?.number) return;
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

    function makeOrderClick() {
        if (!user) {
            navigate('/login?fallback=/');
            return;
        }
        setModalVisible(true);
        const accessToken = getCookie('token');
        const refreshToken = getCookie('refreshToken');
        if (bun && accessToken && refreshToken) dispatch(makeOrder(ids, accessToken, refreshToken));
    }

    return (
        <>
            <div className={bcStyle.hiddenContent}>
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
            <div data-testid="burgerConstructor" ref={dropTarget} className={`${appStyle.appBurgerSectionContent} custom-scroll ${isOver && appStyle.appBurgerSectionContentBordered}`}>
                {!bun && ingredients.length === 0 &&
                    <div className={`text text_type_main-medium text_color_inactive ${bcStyle.textCenter}`} >
                        Перетяните сюда инградиенты...
                    </div>
                }
                {
                    ingredients.map((ing, ind) => {
                        return (
                            ing.type !== TIngredient.Bun &&
                            <BurgerDraggableConstructorItem
                                key={ing.uuid}
                                ingredient={ing}
                                index={ind}
                                isLast={ind < ingredients.length}
                                isFirst={ind === 0}
                            />
                        )
                    })
                }
            </div>
            {
                bun && (
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`Низ: ${bun.name}`}
                        price={bun.price}
                        thumbnail={bun.image_mobile}
                        extraClass={`${bcStyle.burgerItem} mt-4`}
                    />
                )
            }
            <div className={`p-10 ${bcStyle.orderButtonWrapper}`}>
                <span className='text text_type_digits-medium mr-1'>{total}</span>
                <span className='mr-10'><CurrencyIcon type="primary" /></span>
                <Button htmlType="button"
                    type="primary"
                    size="medium"
                    onClick={makeOrderClick}>
                    Оформить заказ
                </Button>
            </div>
        </>
    );
}

type TIngredientDropCollectedProps = {
    isOver: boolean;
};

type TIngredientDrag = {
    ingredient: TBurgerIngredientsItemDto
};



