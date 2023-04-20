import React, { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import {
    Tab
} from '@ya.praktikum/react-developer-burger-ui-components';

// components
import BurgerIngredientsList from '../burger-ingredients-list/burger-ingredients-list';

// shared
import { IngredientType } from '../../shared/types/ingredient-type';
import { getIngredients } from '../../services/actions/burger-incredients';

// styles
import appStyle from '../app/app.module.css';

export default function BurgerIngredients() {

    const [currentTab, setCurrentTab] = React.useState("bun");

    const bunTitleRef = React.useRef(null);
    const sauceTitleRef = React.useRef(null);
    const mainTitleRef = React.useRef(null);

    const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(store => {        
        return {
            ingredients: store?.ingredients?.items || [],
            ingredientsRequest: store?.ingredients?.itemsRequest || false,
            ingredientsFailed: store?.ingredients?.itemsFailed || false,
        }
    });

    const buns = useMemo(() => ingredients?.filter(b => b.type === IngredientType.Bun) || [], [ingredients]);
    const sauces = useMemo(() => ingredients?.filter(b => b.type === IngredientType.Sauce) || [], [ingredients]);
    const mains = useMemo(() => ingredients?.filter(b => b.type === IngredientType.Main) || [], [ingredients]);

    const dispatch = useDispatch();
    useEffect(() => {
        // load all burder ingredients
        dispatch(getIngredients());
    }, [dispatch]);

    function tabClick(tab) {
        setCurrentTab(tab);
        switch (tab) {
            case "bun":
                bunTitleRef?.current?.scrollIntoView({ behavior: 'smooth' });
                break;
            case "sauce":
                sauceTitleRef?.current?.scrollIntoView({ behavior: 'smooth' });
                break;
            case "main":
                mainTitleRef?.current?.scrollIntoView({ behavior: 'smooth' });
                break;
        }
    }

    return (
        <>
            {ingredientsRequest && 'Загрузка данных...'}
            {ingredientsFailed && `Произошла ошибка при получении списка инградиентов.`}
            {!ingredientsRequest && !ingredientsFailed && (
                <>
                    <div className={appStyle.appBurgerTabs}>
                        <Tab value={IngredientType.Bun} active={currentTab === IngredientType.Bun} onClick={tabClick}>
                            Булки
                        </Tab>
                        <Tab value={IngredientType.Sauce} active={currentTab === IngredientType.Sauce} onClick={tabClick}>
                            Соусы
                        </Tab>
                        <Tab value={IngredientType.Main} active={currentTab === IngredientType.Main} onClick={tabClick}>
                            Начинки
                        </Tab>
                    </div>
                    <div className={`${appStyle.appBurgerSectionContent} custom-scroll`} style={{ height: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: 'center' }}  >
                        <BurgerIngredientsList title="Булки" burgers={buns} ref={bunTitleRef}></BurgerIngredientsList>
                        <BurgerIngredientsList title="Соусы" burgers={sauces} ref={sauceTitleRef}></BurgerIngredientsList>
                        <BurgerIngredientsList title="Начинки" burgers={mains} ref={mainTitleRef}></BurgerIngredientsList>
                    </div>
                </>
            )}
        </>
    );
}

BurgerIngredients.propTypes = {
}


