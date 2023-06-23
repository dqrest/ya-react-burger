import {
    GET_ORDER_DETAILS_FAILED
    , GET_ORDER_DETAILS_REQUEST
    , GET_ORDER_DETAILS_SUCCESS
    , DELETE_ORDER_DETAILS
} from '../action-types/order-details';
import { orderDetailsReducer } from './order-details';

let state = undefined;
describe('orderDetailsReducer', () => {

    it('should return the initial state', () => {
        expect(orderDetailsReducer(state, {})).toEqual({
            item: null
            , itemRequest: false
            , itemFailed: false
        });

        state = {
            item: null
            , itemRequest: false
            , itemFailed: false
        };
    })

    it('should GET_ORDER_DETAILS_REQUEST', () => {
        expect(orderDetailsReducer(state, {
            type: GET_ORDER_DETAILS_REQUEST
        })).toEqual({
            ...state, itemRequest: true
        });

        state = {
            ...state, itemRequest: true
        };
    })

    it('should GET_ORDER_DETAILS_SUCCESS', () => {
        expect(orderDetailsReducer(state, {
            type: GET_ORDER_DETAILS_SUCCESS
            , order: 555
        })).toEqual({
            ...state, itemFailed: false, item: 555, itemRequest: false
        });

        state = {
            ...state, itemFailed: false, item: 555, itemRequest: false
        };
    })

    it('should GET_ORDER_DETAILS_FAILED', () => {
        expect(orderDetailsReducer(state, {
            type: GET_ORDER_DETAILS_FAILED            
        })).toEqual({
            ...state, itemFailed: true, itemRequest: false
        });

        state = {
            ...state, itemFailed: true, itemRequest: false
        };
    })

    it('should DELETE_ORDER_DETAILS', () => {
        expect(orderDetailsReducer(state, {
            type: DELETE_ORDER_DETAILS            
        })).toEqual({
            ...state, itemFailed: false, item: null, itemRequest: false
        });

        state = {
            ...state, itemFailed: false, item: null, itemRequest: false
        };
    })

});