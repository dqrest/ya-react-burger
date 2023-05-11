import {
    REGISTER_USER_FAILED
    , REGISTER_USER_REQUEST
    , REGISTER_USER_SUCCESS
    , REFRESH_REGISTERING

    , LOGIN_USER_FAILED
    , LOGIN_USER_SUCCESS
    , LOGIN_USER_REQUEST
    , REFRESH_LOGINING

    , LOGOUT_USER_FAILED
    , LOGOUT_USER_SUCCESS
    , LOGOUT_USER_REQUEST

    , FORGOT_PASSWORD_FAILED
    , FORGOT_PASSWORD_SUCCESS
    , FORGOT_PASSWORD_REQUEST
    , REFRESH_FORGOTING_PASSWORD

    , GET_USER_FAILED
    , GET_USER_SUCCESS
    , GET_USER_REQUEST

    , REFRESH_TOKEN_REQUEST
    , REFRESH_TOKEN_SUCCESS 
    , REFRESH_TOKEN_FAILED

    , PATCH_USER_REQUEST
    , PATCH_USER_SUCCESS
    , PATCH_USER_FAILED    
} from '../actions/auth';


const authInitialState = {
    user: null
    , message: null
    , request: false
    , failed: false
    , accessToken: null
    , refreshToken: null
    , actionType: null
};

export const authReducer = (state = authInitialState, action) => {
    state = {...state, actionType: action.type};
    switch (action.type) {

        case LOGIN_USER_REQUEST: {
            return { ...state, request: true };
        }
        case LOGIN_USER_SUCCESS: {
            return {
                ...state
                , request: false
                , failed: false
                , user: action.user
                , accessToken: action.accessToken
                , refreshToken: action.refreshToken                
            };
        }
        case LOGIN_USER_FAILED: {
            return {
                ...state
                , request: false
                , failed: true
                , message: action.message
                , user: null

            };
        }
        case LOGOUT_USER_REQUEST:{
            return { ...state, request: true };
        }
        case LOGOUT_USER_SUCCESS: {
            return {
                ...state
                , request: false
                , failed: false
                , user: action.user
                , accessToken: action.accessToken
                , refreshToken: action.refreshToken                
            };
        }
        case LOGOUT_USER_FAILED: {
            return {
                ...state
                , request: false
                , failed: true
                , message: action.message                
            };
        }        
        case GET_USER_REQUEST:
        case PATCH_USER_REQUEST: {
            return { ...state, request: true };
        }
        case GET_USER_SUCCESS:
        case PATCH_USER_SUCCESS: {
            return {
                ...state
                , request: false
                , failed: false
                , user: action.user
                //, message: "jwt expired"
            };
        }
        case GET_USER_FAILED:
        case PATCH_USER_FAILED: {
            return {
                ...state
                , request: false
                , failed: true
                , message: action.message
            };
        }
        case REFRESH_TOKEN_REQUEST: {
            return { ...state, request: true };
        }
        case REFRESH_TOKEN_SUCCESS: {
            return {
                ...state
                , request: false
                , failed: false
                , refreshToken: action.refreshToken
                , accessToken: action.accessToken
            };
        }
        case REFRESH_TOKEN_FAILED: {
            return {
                ...state
                , request: false
                , failed: true
                , message: action.message
            };
        }
        default:
            return state;
    }
}

////////////////////////////////////////////////////////////////////













const userProfileInitialState = {
    name: null
    , email: null
    , password: null
    , request: false
    , failed: false
    , message: null
};

export const userProfileReducer = (state = userProfileInitialState, action) => {
    switch (action.type) {
        case GET_USER_REQUEST: {
            return { ...state, request: true };
        }
        case GET_USER_SUCCESS: {
            return {
                ...state
                , request: false
                , failed: false
                , name: action.name
                , email: action.email
                , password: action.password
            };
        }
        case GET_USER_FAILED: {
            return {
                ...state
                , request: false
                , failed: true
                , message: action.message
            };
        }
        default:
            return state;
    }
};












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
            return { ...state, loginRequest: action.loginRequest, loginFailed: action.loginFailed };
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