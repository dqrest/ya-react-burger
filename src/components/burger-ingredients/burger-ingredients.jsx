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

    const [currentTab, setCurrentTab] = React.useState(IngredientType.Bun);

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

    function handleScroll(e) {
        const bunY = bunTitleRef?.current?.getBoundingClientRect()?.y || 0;
        const sauceY = sauceTitleRef?.current?.getBoundingClientRect()?.y || 0;
        const mainY = mainTitleRef?.current?.getBoundingClientRect()?.y || 0;
        const y = e?.currentTarget?.getBoundingClientRect()?.y || 0;
        const d1 = Math.abs(y - bunY),
            d2 = Math.abs(y - sauceY),
            d3 = Math.abs(y - mainY);
        if (d1 <= d2 && d1 <= d3) {
            currentTab !== IngredientType.Bun && setCurrentTab(IngredientType.Bun);
            return;
        }
        if (d2 <= d3) {
            currentTab !== IngredientType.Sauce && setCurrentTab(IngredientType.Sauce);
            return;
        }
        currentTab !== IngredientType.Main && setCurrentTab(IngredientType.Main);
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
                    <div className={`${appStyle.appBurgerSectionScrollingContent} custom-scroll`} onScroll={handleScroll}>
                        <BurgerIngredientsList title="Булки" ingredients={buns} ref={bunTitleRef}></BurgerIngredientsList>
                        <BurgerIngredientsList title="Соусы" ingredients={sauces} ref={sauceTitleRef}></BurgerIngredientsList>
                        <BurgerIngredientsList title="Начинки" ingredients={mains} ref={mainTitleRef}></BurgerIngredientsList>
                    </div>
                </>
            )}
        </>
    );
}

BurgerIngredients.propTypes = {
}


