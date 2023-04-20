import { getIngredientsRequest } from '../../utils/burger-api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';


export function getIngredients() {

    return function (dispatch) {
        dispatch({ type: GET_INGREDIENTS_REQUEST });
        getIngredientsRequest().then(res => {
            debugger;
            if (res && res.success) {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    items: res.data
                });
                return;
            }
            dispatch({ type: GET_INGREDIENTS_FAILED });
        }).catch(e => {
            debugger;
            dispatch({ type: GET_INGREDIENTS_FAILED })
        });
    };
}

