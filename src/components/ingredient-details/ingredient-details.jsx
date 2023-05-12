import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useParams, useLocation } from 'react-router-dom';

// shared
import { useIngredients } from '../burger-ingredients/burger-ingredients';
import { getIngredients } from '../../services/actions/burger-incredients';

// styles
import idStyles from './ingredient-details.module.css';

export default function IngredientDetails() {

    const dispatch = useDispatch();
    const params = useParams();
    const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(useIngredients);
    const selectedIngredient = useSelector(store => store?.ingredientDetails?.item);

    const ingredient = useMemo(() => params?.id
        ? ingredients.find(ing => ing._id === params.id)
        : selectedIngredient
        , [ingredients, params?.id, selectedIngredient]);

    useEffect(() => {
        // load all burder ingredients
        if (params?.id)
            dispatch(getIngredients());
    }, [dispatch]);

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

const DetailItem = ({ title, value, extClass }) => (
    <div className={`${extClass} ${idStyles.detailsItem}`}>
        <span className='text text_type_main-small text_color_inactive'>
            {title}
        </span>
        <span className='text text_type_digits-default text_color_inactive' style={{ alignSelf: "center" }} >
            {value}
        </span>
    </div>
);