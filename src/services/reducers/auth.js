import {
    REGISTER_USER_FAILED
    , REGISTER_USER_REQUEST
    , REGISTER_USER_SUCCESS
    , REFRESH_REGISTERING

    , LOGIN_USER_FAILED
    , LOGIN_USER_SUCCESS
    , LOGIN_USER_REQUEST
    , REFRESH_LOGINING
} from '../actions/auth';

const registerInitialState = {
    email: null
    , name: null
    , message: null
    , registerRequest: false
    , registerFailed: false
};

export const registerReducer = (state = registerInitialState, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST: {
            return { ...state, registerRequest: true };
        }
        case REGISTER_USER_SUCCESS: {
            return { ...state, registerRequest: false, registerFailed: false, email: action.email, name: action.name, };
        }
        case REGISTER_USER_FAILED: {
            return { ...state, registerRequest: false, registerFailed: true, message: action.message };
        }
        case REFRESH_REGISTERING: {
            return { ...state, registerRequest: action.registerRequest, registerFailed: action.registerFailed };
        }
        default:
            return state;
    }
}


const loginInitialState = {
    email: null
    , name: null
    , message: null
    , loginRequest: false
    , loginFailed: false
};

export const loginReducer = (state = loginInitialState, action) => {
    switch (action.type) {
        case LOGIN_USER_REQUEST: {
            return { ...state, loginRequest: true };
        }
        case LOGIN_USER_SUCCESS: {
            return { ...state, loginRequest: false, loginFailed: false, email: action.email, name: action.name, };
        }
        case LOGIN_USER_FAILED: {
            return { ...state, loginRequest: false, loginFailed: true, message: action.message };
        }
        case REFRESH_LOGINING: {
            return { ...state, loginRequest: action.loginRequest, loginFailed: action.loginFailed};
        }
        default:
            return state;
    }
}