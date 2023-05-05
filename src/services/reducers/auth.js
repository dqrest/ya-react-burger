import { REGISTER_USER_FAILED
    , REGISTER_USER_REQUEST
    , REGISTER_USER_SUCCESS
} from '../actions/auth';

const initialState = {    
    email: null,
    name: null
};


export const registerReducer = (state = initialState, action) => {    
    switch (action.type) {
        case REGISTER_USER_REQUEST:{
            debugger;
            return { ...state, itemRequest: true };
        }
        case REGISTER_USER_SUCCESS: {
            debugger;         
            return { ...state, itemFailed: false, email: action.email, name: action.name, itemRequest: false };
        }
        case REGISTER_USER_FAILED:{
            debugger;
            return { ...state, itemFailed: true, itemRequest: false };        
        }
        default:
            return state;
    }
}