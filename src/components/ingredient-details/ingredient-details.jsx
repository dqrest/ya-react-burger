// styles
import idStyles from './ingredient-details.module.css';

export default function IngredientDetails({ item }) {

    const burger = item?.burger || {};
    
    return (
        <div className={`${idStyles.content}`}>
            <img className='mb-4' src={burger?.image_large}></img>
            <div className={`${idStyles.caption} text text_type_main-medium mb-8`}>
                {burger?.name}
            </div>
            <div className={idStyles.detailsContainer}>
                <DetailItem title="Калории, ккал" value={burger.calories} extClass="mr-5" />
                <DetailItem title="Белки, г" value={burger.proteins} extClass="mr-5" />
                <DetailItem title="Жиры, г" value={burger.fat} extClass="mr-5" />
                <DetailItem title="Углеводы, г" value={burger.carbohydrates} />
            </div>
        </div>
    );
}

const DetailItem = ({ title, value, extClass }) => (
    <div className={`${extClass}`} style={{ display: "flex", flexDirection: "column", flexWrap: "nowrap", justifyContent: "center" }}>
        <span className='text text_type_main-small text_color_inactive'>            
            {title}
        </span>
        <span className='text text_type_digits-default text_color_inactive' style={{alignSelf: "center"}} >
            {value}
        </span>
    </div>
);