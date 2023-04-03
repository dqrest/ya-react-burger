import React from 'react';
import PropTypes from 'prop-types';

// dtos
import { burgerIngredientsItemDto } from '../../shared/dtos/burger-ingredients-item-dto';

class BurgerIngredientItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <img src={this.props.burger?.image}>
                </img>
                <div style={{ }}>{this.props.burger?.name} </div>
                <br></br>
            </>
        );
    }
}

BurgerIngredientItem.propTypes = {
    burger: burgerIngredientsItemDto.isRequired
};

export default BurgerIngredientItem;