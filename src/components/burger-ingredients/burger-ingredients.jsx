import React from 'react';
import PropTypes from 'prop-types';

import {
    Tab
} from '@ya.praktikum/react-developer-burger-ui-components';

// components
import BurgerIngredientsList from '../burger-ingredients-list/burger-ingredients-list';

// dtos
import { burgerIngredientsItemDto } from '../../shared/dtos/burger-ingredients-item-dto';

// styles
import appStyle from '../app/app.module.css';

export default function BurgerIngredients({ burgers }) {

    const [currentTab, setCurrentTab] = React.useState("bun");

    const bunTitleRef = React.useRef(null);
    const sauceTitleRef = React.useRef(null);
    const mainTitleRef = React.useRef(null);

    const buns = React.useMemo(() => burgers?.filter(b => b.type === "bun") || [], []);
    const sauces = React.useMemo(() => burgers?.filter(b => b.type === "sauce") || [], []);
    const mains = React.useMemo(() => burgers?.filter(b => b.type === "main") || [], []);

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
            <div className={appStyle.appBurgerTabs}>
                <Tab value="bun" active={currentTab === 'bun'} onClick={tabClick}>
                    Булки
                </Tab>
                <Tab value="sauce" active={currentTab === 'sauce'} onClick={tabClick}>
                    Соусы
                </Tab>
                <Tab value="main" active={currentTab === 'main'} onClick={tabClick}>
                    Начинки
                </Tab>
            </div>
            <div className={`${appStyle.appBurgerSectionContent} custom-scroll`} style={{ height: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: 'center' }}  >
                <BurgerIngredientsList title="Булки" burgers={buns} ref={bunTitleRef}></BurgerIngredientsList>
                <BurgerIngredientsList title="Соусы" burgers={sauces} ref={sauceTitleRef}></BurgerIngredientsList>
                <BurgerIngredientsList title="Начинки" burgers={mains} ref={mainTitleRef}></BurgerIngredientsList>
            </div>
        </>
    );
}

BurgerIngredients.propTypes = {
    burgers: PropTypes.arrayOf(burgerIngredientsItemDto).isRequired
}


