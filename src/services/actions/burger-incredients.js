import { getIngredientsRequest } from '../../utils/burger-api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const INCREASE_INGREDIENT_COUNT = 'INCREASE_INGREDIENT_COUNT';
export const DECREASE_INGREDIENT_COUNT = 'DECREASE_INGREDIENT_COUNT';
export const RESET_INGREDIENTS_COUNT_BY_TYPE = 'RESET_INGREDIENTS_COUNT_BY_TYPE';

export function getIngredients() {    
    return function (dispatch) {
        dispatch({ type: GET_INGREDIENTS_REQUEST });
        getIngredientsRequest()
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: GET_INGREDIENTS_SUCCESS,
                        items: res.data
                    });
                    return;
                }
                dispatch({ type: GET_INGREDIENTS_FAILED });
            })
            .catch(e => dispatch({ type: GET_INGREDIENTS_FAILED }));
    };
}

export const increaseIngredientCount = (id) => (
    { type: INCREASE_INGREDIENT_COUNT, id: id }
);
  

export const decreaseIngredientCount = (id) => (
    { type: DECREASE_INGREDIENT_COUNT, id: id }
);
 

export const resetIngredientsCountByType = (typeIngredient) => (
    { type: RESET_INGREDIENTS_COUNT_BY_TYPE, typeIngredient: typeIngredient }
);
    

