import { registerRequest } from '../../utils/auth-api';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';

export const REFRESH_REGISTERING = 'REFRESH_REGISTERING';

export function register(formData){
    return function (dispatch) {
        dispatch({ type: REGISTER_USER_REQUEST });
        registerRequest(formData)
            .then(res => {                
                if (res && res.success) {
                    dispatch({
                        type: REGISTER_USER_SUCCESS,
                        user: {
                            email: res.email
                            , name: res.name
                        }
                    });
                    return;
                }
                dispatch({ type: REGISTER_USER_FAILED });
            })
            .catch(e => dispatch({ type: REGISTER_USER_FAILED, message: e.message }));
    };
}

export const refreshRegistering = () => (
    { type: REFRESH_REGISTERING, registerRequest: false, registerFailed: false  }
);