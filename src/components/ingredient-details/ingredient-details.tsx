import { useMemo, FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

// components
import Modal from '../modal/modal';

// shared
import { useIngredients } from '../burger-ingredients/burger-ingredients';
import { TBurgerIngredientsItemDto } from '../../shared/dtos/burger-ingredients-item-dto';

// styles
import idStyles from './ingredient-details.module.css';

export default function IngredientDetails() {

    const params = useParams<string>();
    const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(useIngredients);

    const ingredient = useMemo<TBurgerIngredientsItemDto | undefined>(() =>
        params && params?.id
            ? ingredients.find(ing => ing._id === params.id)
            : undefined
        , [ingredients, params?.id]);  

    return (
        <>
            {ingredientsRequest && 'Загрузка данных...'}
            {ingredientsFailed && `Произошла ошибка при получении списка инградиентов.`}
            {!ingredientsRequest && !ingredientsFailed && (
                <>
                    {ingredient
                        ? <div className={`${idStyles.content}`}>
                            <div className={idStyles.detailsContainer}>
                                <img className='mb-4' src={ingredient?.image_large}></img>
                            </div>
                            <div className={`${idStyles.caption} text text_type_main-medium mb-8`}>
                                {ingredient?.name}
                            </div>
                            <div className={idStyles.detailsContainer}>
                                <DetailItem title="Калории, ккал" value={ingredient?.calories} extClass="mr-5" />
                                <DetailItem title="Белки, г" value={ingredient?.proteins} extClass="mr-5" />
                                <DetailItem title="Жиры, г" value={ingredient?.fat} extClass="mr-5" />
                                <DetailItem title="Углеводы, г" value={ingredient?.carbohydrates} />
                            </div>
                        </div>
                        : <div>Информация ингредиента недоступна</div>
                    }
                </>
            )}
        </>
    );
}

const DetailItem: FC<TDetailItemProps> = ({ title, value, extClass }) => (
    <div className={`${extClass} ${idStyles.detailsItem}`}>
        <span className='text text_type_main-small text_color_inactive'>
            {title}
        </span>
        <span className={`text text_type_digits-default text_color_inactive ${idStyles.titleCenter}`} >
            {value}
        </span>
    </div>
);

export const ModalIngredientDetails = () => {
    const navigate = useNavigate();
    return (
        <Modal header="Детали инградиента"
            setVisible={() => { navigate('/'); }}>
            <IngredientDetails></IngredientDetails>
        </Modal>
    );
}

type TDetailItemProps = {
    title: string;
    value: number;
    extClass?: string;
};

