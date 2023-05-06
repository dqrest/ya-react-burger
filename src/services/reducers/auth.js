import {
    REGISTER_USER_FAILED
    , REGISTER_USER_REQUEST
    , REGISTER_USER_SUCCESS
    , REFRESH_REGISTERING
} from '../actions/auth';

const initialState = {
    email: null
    , name: null
    , message: null
    , registerRequest: false
    , registerFailed: false
};

export const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST: {
            return { ...state, registerRequest: true };
        }
        case REGISTER_USER_SUCCESS: {
            return { ...state, registerRequest: false, registerFailed: false, email: action.email, name: action.name,  };
        }
        case REGISTER_USER_FAILED: {
            return { ...state, registerRequest: false, registerFailed: true,  message: action.message };
        }
        case REFRESH_REGISTERING: {
            return { ...state, registerRequest: action.registerRequest, registerFailed: action.registerFailed };
        }
        default:
            return state;
    }
}