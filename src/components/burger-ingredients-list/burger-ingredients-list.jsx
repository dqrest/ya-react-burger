import React from "react"
import PropTypes from 'prop-types';

// components
import BurgerIngredientItem from '../burger-ingredient-item/burger-ingredient-item';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

// dtos
import { burgerIngredientsItemDto } from '../../shared/dtos/burger-ingredients-item-dto';

// styles
import biListStyle from './burger-ingredients-list.module.css';

export  function BurgerIngredientsListInner({ title, burgers }, ref) {

    const [modalVisible, setModalVisible] = React.useState(false);

    const [focusedBurgerItem, setFocusedBurgerItem] = React.useState({});

    const modal = (
        <Modal header="Детали инградиента" setVisible={setModalVisible}>
            <IngredientDetails burger={focusedBurgerItem?.burger}></IngredientDetails>
        </Modal>
    );

    const itemClick = (e) => {
        if(!e?.burger) return;
        setModalVisible(true);
        setFocusedBurgerItem(e);
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

