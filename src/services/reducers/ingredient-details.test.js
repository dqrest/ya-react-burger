import { SET_INGREDIENT_DETAILS, DELETE_INGREDIENT_DETAILS } from '../action-types/ingredient-details';
import { ingredientDetailsReducer } from './ingredient-details';

let state = undefined;
const item = {
    _id: '2',
    name: 'Соус вкусный',
    type: 'sauce',
    proteins: 11,
    fat: 22,
    carbohydrates: 33,
    calories: 44,
    price: 54,
    image: "url1",
    image_mobile: "url2",
    image_large: "url3",
    __v: 99,
    count: 1
};

describe('ingredientDetailsReducer', () => {

    it('should return the initial state', () => {
        expect(ingredientDetailsReducer(state, {})).toEqual({
            item: null           
        });

        state = {
            item: null           
        };
    })

    it('should SET_INGREDIENT_DETAILS', () => {
        expect(ingredientDetailsReducer(state, {
            type: SET_INGREDIENT_DETAILS
            , item
        })).toEqual({
            ...state
            , item
        });

        state = {
            ...state
            , item       
        };
    })

    it('should SET_INGREDIENT_DETAILS', () => {
        expect(ingredientDetailsReducer(state, {
            type: DELETE_INGREDIENT_DETAILS            
        })).toEqual({
            ...state
            , item: null
        });

        state = {
            ...state
            , item: null   
        };
    })



});




