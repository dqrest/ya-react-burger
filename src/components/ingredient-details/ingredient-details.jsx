import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

// styles
import idStyles from './ingredient-details.module.css';

export default function IngredientDetails() {

    const ingredient = useSelector(store => store?.ingredientDetails?.item);

    return (
        <>
            {ingredient
                ? <div className={`${idStyles.content}`}>
                    <img className='mb-4' src={ingredient?.image_large}></img>
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


IngredientDetails.propTypes = {
    //burger: burgerIngredientsItemDto.isRequired
}