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

export function BurgerIngredientsListInner({ title, ingredients }, ref) {

    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = React.useState(false);

    const modal = (
        <Modal header="Детали инградиента"
            setVisible={(e) => { setModalVisible(e); dispatch(setIngredientDetails(null)); }}>
            <IngredientDetails></IngredientDetails>
        </Modal>
    );

    const itemClick = (e) => {
        if (!e?.ingredient) return;
        setModalVisible(true);
        dispatch(setIngredientDetails(e.ingredient));
    }

    return (
        <>
            <div style={{ overflow: 'hidden' }}>
                {modalVisible && modal}
            </div>
            <span className={`text text_type_main-medium pt-4 ${biListStyle.burgerListCaption}`} ref={ref}>
                {title}
            </span>
            {ingredients.map((ing, ind) =>
                <BurgerIngredientItem
                    key={ing._id}
                    ingredient={ing}
                    count={ing.count || 0}
                    itemClick={itemClick} />
            )}
        </>
    );
}

const BurgerIngredientsList = React.forwardRef(({ title, ingredients }, ref) => BurgerIngredientsListInner({ title, ingredients }, ref));
export default BurgerIngredientsList;

BurgerIngredientsList.propTypes = {
    title: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(burgerIngredientsItemDto).isRequired
}

