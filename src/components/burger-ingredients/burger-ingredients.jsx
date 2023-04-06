import React from 'react';
import PropTypes from 'prop-types';

import {
    Tab
} from '@ya.praktikum/react-developer-burger-ui-components';

// components
import BurgerIngredientsList from '../burger-ingredients-list/burger-ingredients-list';

// data, dtos
import { burgerIngredientsItemDto } from '../../shared/dtos/burger-ingredients-item-dto';

// styles
import appStyle from '../app/app.module.css';

export default function BurgerIngredients({burgers}) {

    const [currentTab, setCurrentTab] = React.useState("bun");

    let buns = burgers?.filter(b => b.type === "bun") || [];
    let sauces = burgers?.filter(b => b.type === "sauce") || [];
    let mains = burgers?.filter(b => b.type === "main") || [];

    return (
        <>
            <div className={appStyle.appBurgerTabs}>
                <Tab value="bun" active={currentTab === 'bun'} onClick={setCurrentTab}>
                    Булки
                </Tab>
                <Tab value="sauce" active={currentTab === 'sauce'} onClick={setCurrentTab}>
                    Соусы
                </Tab>
                <Tab value="main" active={currentTab === 'main'} onClick={setCurrentTab}>
                    Начинки
                </Tab>
            </div>
            <div className={`${appStyle.appBurgerSectionContent} custom-scroll`} style={{ height: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: 'center' }}  >
                <BurgerIngredientsList title="Булки" burgers={buns}></BurgerIngredientsList>
                <BurgerIngredientsList title="Соусы" burgers={sauces}></BurgerIngredientsList>
                <BurgerIngredientsList title="Начинки" burgers={mains}></BurgerIngredientsList>
            </div>            
        </>
    );
}

BurgerIngredients.propTypes = {
    burgers: PropTypes.arrayOf(burgerIngredientsItemDto).isRequired
}


