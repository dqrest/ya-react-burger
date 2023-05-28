import { useState, FC, forwardRef } from "react"
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

// components
import BurgerIngredientItem from '../burger-ingredient-item/burger-ingredient-item';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

// shared
import { TBurgerIngredientsItemDto } from '../../shared/dtos/burger-ingredients-item-dto';
import { setIngredientDetails } from '../../services/actions/ingredient-details';
import { TIngredientArg } from '../burger-ingredient-item/burger-ingredient-item';

// styles
import biListStyle from './burger-ingredients-list.module.css';

export const BurgerIngredientsListInner: FC<TBurgerIngredientsList> = ({ title, ingredients }, ref) => {

    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();

    const modal = (
        <Modal header="Детали инградиента"
            setVisible={(e: any) => { setModalVisible(e); dispatch(setIngredientDetails(null)); navigate('/'); }}>
            <IngredientDetails></IngredientDetails>
        </Modal>
    );

    const itemClick = (e: TIngredientArg) => {
        if (!e?.ingredient) return;
        dispatch(setIngredientDetails(e.ingredient));
        navigate('/ingredients/' + e?.ingredient?._id, { state: { background: location } });
        setModalVisible(true);
    }

    return (
        <>
            <div style={{ overflow: 'hidden' }}>
                {modalVisible && modal}
            </div>
            <span className={`text text_type_main-medium mt-2 ${biListStyle.burgerListCaption}`} ref={ref}>
                {title}
            </span>
            {ingredients.map((ing) =>
                <BurgerIngredientItem
                    key={ing._id}
                    ingredient={ing}
                    count={ing.count || 0}
                    itemClick={itemClick} />
            )}
        </>
    );
}

const BurgerIngredientsList = forwardRef <HTMLSpanElement, TBurgerIngredientsList>(({ title, ingredients }, ref) => BurgerIngredientsListInner({ title, ingredients }, ref));

type TBurgerIngredientsList = {
    title: string;
    ingredients: Array<TBurgerIngredientsItemDto>;
}

export default BurgerIngredientsList;

