import React from 'react';
import PropTypes from 'prop-types';

import {
    Tab
} from '@ya.praktikum/react-developer-burger-ui-components';

// styles
import biStyle from './burger-ingredients.module.css';

// components
import BurgerIngredientsList from '../burger-ingredients-list/burger-ingredients-list';
import BurgerConstructor from '../burger-constructor/burger-constructor';

// data, dtos
import { burgers } from '../../utils/data';
import { burgerIngredientsItemDto } from '../../shared/dtos/burger-ingredients-item-dto';


export default class BurgerIngredients extends React.Component {

    constructor(props) {
        super(props);
        this.state = { currentTab: "bun" };
    }

    setCurrent = (type) => {
        this.setState({
            currentTab: type
        });
    }

    render() {

        let buns = burgers?.filter(b => b.type === "bun") || [];
        let sauces = burgers?.filter(b => b.type === "sauce") || [];
        let mains = burgers?.filter(b => b.type === "main") || [];

        return (
            <main className={`${biStyle.mainContainer}`}>

                <span className={`${biStyle.mainHeaderRow} text text_type_main-large`}>
                    Соберите бургер
                </span>

                <section className={biStyle.mainBodyRow}>
                    <section className={biStyle.mainColLeft}>

                        <div style={{ display: 'flex', alignSelf: 'flex-end' }}>
                            <Tab value="bun" active={this.state.currentTab === 'bun'} onClick={this.setCurrent}>
                                Булки
                            </Tab>
                            <Tab value="sauce" active={this.state.currentTab === 'sauce'} onClick={this.setCurrent}>
                                Соусы
                            </Tab>
                            <Tab value="main" active={this.state.currentTab === 'main'} onClick={this.setCurrent}>
                                Начинки
                            </Tab>
                        </div>

                        <BurgerIngredientsList title="Булки" burgers={buns}></BurgerIngredientsList>
                        <BurgerIngredientsList title="Соусы" burgers={sauces}></BurgerIngredientsList>
                        <BurgerIngredientsList title="Начинки" burgers={mains}></BurgerIngredientsList>

                    </section>

                    <section className={biStyle.mainColRight}>
                        <BurgerConstructor burgers={burgers}></BurgerConstructor>
                    </section>

                </section>



            </main>
        )
    }
}


