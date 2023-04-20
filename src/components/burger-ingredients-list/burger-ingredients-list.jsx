import React from "react"
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

// components
import BurgerIngredientItem from '../burger-ingredient-item/burger-ingredient-item';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

// shared
import { burgerIngredientsItemDto } from '../../shared/dtos/burger-ingredients-item-dto';
import { setIngredientDetails } from '../../services/actions/ingredient-details';

// styles
import biListStyle from './burger-ingredients-list.module.css';

export function BurgerIngredientsListInner({ title, burgers }, ref) {

    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = React.useState(false);

    const [focusedBurgerItem, setFocusedBurgerItem] = React.useState();

    const modal = (
        <Modal header="Детали инградиента" setVisible={setModalVisible}>
            <IngredientDetails></IngredientDetails>
            {/* {focusedBurgerItem?.burger
                ? <IngredientDetails burger={focusedBurgerItem?.burger}></IngredientDetails>
                : <div>Невозможно отобразить такой инградиент. Попытайтесь, пожалуйста, отобразить его позже.</div>
            } */}
        </Modal>
    );

    const itemClick = (e) => {
        if (!e?.burger) return;
        setModalVisible(true);
        //setFocusedBurgerItem(e);
        dispatch(setIngredientDetails(e.burger));
    }

    return (
        <>
            <div style={{ overflow: 'hidden' }}>
                {modalVisible && modal}
            </div>
            <span className={`text text_type_main-medium pt-4 ${biListStyle.burgerListCaption}`} ref={ref}>
                {title}
            </span>
            {burgers.map((b, ind) =>
                <BurgerIngredientItem key={b._id} burger={b} count={1} itemClick={itemClick} />
            )}
        </>
    );
}

const BurgerIngredientsList = React.forwardRef(({ title, burgers }, ref) => BurgerIngredientsListInner({ title, burgers }, ref));
export default BurgerIngredientsList;

BurgerIngredientsList.propTypes = {
    title: PropTypes.string.isRequired,
    burgers: PropTypes.arrayOf(burgerIngredientsItemDto).isRequired
}

