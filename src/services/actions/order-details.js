import { makeOrderRequest } from '../../utils/order-api';

export const GET_ORDER_DETAILS_REQUEST = 'GET_ORDER_DETAILS_REQUEST';
export const GET_ORDER_DETAILS_SUCCESS = 'GET_ORDER_DETAILS_SUCCESS';
export const GET_ORDER_DETAILS_FAILED = 'GET_ORDER_DETAILS_FAILED';

export const DELETE_ORDER_DETAILS = 'DELETE_ORDER_DETAILS';


export function makeOrder(idIngredients){
    return function (dispatch) {
        dispatch({ type: GET_ORDER_DETAILS_REQUEST });
        makeOrderRequest(idIngredients)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: GET_ORDER_DETAILS_SUCCESS,
                        order: res.order
                    });
                    return;
                }
                dispatch({ type: GET_ORDER_DETAILS_FAILED });
            })
            .catch(e => dispatch({ type: GET_ORDER_DETAILS_FAILED }));
    };
}

export function deleteOrderDetails() {
    return function (dispatch) {
        dispatch({ type: DELETE_ORDER_DETAILS});
    }
}