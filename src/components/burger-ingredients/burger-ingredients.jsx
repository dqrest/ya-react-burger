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

        let buns = this.props.burgers?.filter(b => b.type === "bun") || [];
        let sauces = this.props.burgers?.filter(b => b.type === "sauce") || [];
        let mains = this.props.burgers?.filter(b => b.type === "main") || [];

        return (
            <>
                <div className={appStyle.appBurgerTabs}>
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
                <div className={`${appStyle.appBurgerSectionContent} custom-scroll`} style={{ height: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: 'center' }}>
                    <BurgerIngredientsList title="Булки" burgers={buns}></BurgerIngredientsList>
                    <BurgerIngredientsList title="Соусы" burgers={sauces}></BurgerIngredientsList>
                    <BurgerIngredientsList title="Начинки" burgers={mains}></BurgerIngredientsList>
                </div>
            </>
        )
    }
}

BurgerIngredients.propTypes = {
    burgers: PropTypes.arrayOf(burgerIngredientsItemDto).isRequired
}


