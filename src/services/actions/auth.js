import { registerRequest } from '../../utils/auth-api';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';

export function register(formData){
    return function (dispatch) {
        dispatch({ type: REGISTER_USER_REQUEST });
        registerRequest(formData)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: REGISTER_USER_SUCCESS,
                        order: res.order
                    });
                    return;
                }
                dispatch({ type: REGISTER_USER_FAILED });
            })
            .catch(e => dispatch({ type: REGISTER_USER_FAILED }));
    };
}