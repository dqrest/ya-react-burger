import {
    REGISTER_USER_FAILED
    , REGISTER_USER_REQUEST
    , REGISTER_USER_SUCCESS
    , REFRESH_REGISTERING

    , LOGIN_USER_FAILED
    , LOGIN_USER_SUCCESS
    , LOGIN_USER_REQUEST
    , REFRESH_LOGINING

    , FORGOT_PASSWORD_FAILED
    , FORGOT_PASSWORD_SUCCESS
    , FORGOT_PASSWORD_REQUEST
    , REFRESH_FORGOTING_PASSWORD
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

const forgotPasswordInitialState = {
    email: null    
    , message: null
    , forgotPasswordRequest: false
    , forgotPasswordFailed: false
};

export const forgotPasswordReducer = (state = forgotPasswordInitialState, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST: {
            return { ...state, forgotPasswordRequest: true };
        }
        case FORGOT_PASSWORD_SUCCESS: {
            return { ...state, forgotPasswordRequest: false, forgotPasswordFailed: false, email: action.email, name: action.name, };
        }
        case FORGOT_PASSWORD_FAILED: {
            return { ...state, forgotPasswordRequest: false, forgotPasswordFailed: true, message: action.message };
        }
        case REFRESH_FORGOTING_PASSWORD: {
            return { ...state, forgotPasswordRequest: action.forgotPasswordRequest, forgotPasswordFailed: action.forgotPasswordFailed };
        }
        default:
            return state;
    }
}