import {
    GET_INGREDIENTS_REQUEST
    , GET_INGREDIENTS_FAILED
    , GET_INGREDIENTS_SUCCESS
    , INCREASE_INGREDIENT_COUNT
    , DECREASE_INGREDIENT_COUNT
    , RESET_INGREDIENTS_COUNT_BY_TYPE
    , RESET_ALL_INGREDIENTS_COUNT
} from '../action-types/burger-incredients';

import { ingredientsReducer } from './burger-incredients';

let ingredientsState = undefined;

const ingredient1 = {
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

const ingredient2 = {
    _id: '22',
    name: 'Соус острый с солью',
    type: 'sauce',
    proteins: 91,
    fat: 92,
    carbohydrates: 53,
    calories: 74,
    price: 52,
    image: "url1",
    image_mobile: "url2",
    image_large: "url3",
    __v: 79,
    count: 1
};

const ingredient3 = {
    _id: '22',
    name: 'Соус острый с солью',
    type: 'sauce',
    proteins: 91,
    fat: 92,
    carbohydrates: 53,
    calories: 74,
    price: 52,
    image: "url1",
    image_mobile: "url2",
    image_large: "url3",
    __v: 79,
    count: 1
};

let items = [ingredient1, ingredient2, ingredient3];
const getIngredientsFailedMessage = 'get ingredients failed';

describe('ingredientsReducer', () => {

    it('should return the initial state', () => {
        expect(ingredientsReducer(ingredientsState, {})).toEqual({
            items: []
            , itemsFailed: false
            , itemsRequest: false
        });

        ingredientsState = {
            items: []
            , itemsFailed: false
            , itemsRequest: false
        };
    })

    it('should GET_INGREDIENTS_REQUEST', () => {

        expect(ingredientsReducer(ingredientsState, { type: GET_INGREDIENTS_REQUEST }))
            .toEqual({
                ...ingredientsState,
                itemsRequest: true
            });

        ingredientsState = {
            ...ingredientsState,
            itemsRequest: true
        };
    })

    it('should GET_INGREDIENTS_SUCCESS', () => {

        expect(ingredientsReducer(ingredientsState, {
            type: GET_INGREDIENTS_SUCCESS,
            items
        })).toEqual({
            ...ingredientsState,
            itemsFailed: false, items, itemsRequest: false
        });

        ingredientsState = {
            ...ingredientsState,
            itemsFailed: false, items, itemsRequest: false
        };
    })

    it('should GET_INGREDIENTS_FAILED', () => {

        expect(ingredientsReducer(ingredientsState, {
            type: GET_INGREDIENTS_FAILED            
        })).toEqual({
            ...ingredientsState,
            itemsFailed: true, itemsRequest: false
        });

        ingredientsState = {
            ...ingredientsState,
            itemsFailed: true, itemsRequest: false
        };
    })

    it('should INCREASE_INGREDIENT_COUNT', () => {
        ingredient3.count++;
        items = [ingredient1, ingredient2, ingredient3];

        expect(ingredientsReducer(ingredientsState, {
            type: INCREASE_INGREDIENT_COUNT,
            id: ingredient3._id            
        })).toEqual({
            ...ingredientsState,
            items
        });

        ingredientsState = {
            ...ingredientsState,
            items
        };
    })

    it('should DECREASE_INGREDIENT_COUNT', () => {
        ingredient1.count--;
        items = [ingredient1, ingredient2, ingredient3];

        expect(ingredientsReducer(ingredientsState, {
            type: DECREASE_INGREDIENT_COUNT,
            id: ingredient1._id            
        })).toEqual({
            ...ingredientsState,
            items
        });

        ingredientsState = {
            ...ingredientsState,
            items
        };
    })

    it('should RESET_INGREDIENTS_COUNT_BY_TYPE', () => {
        const typeIngredient = "sauce";
        
        items = [ingredient1, ingredient2, ingredient3];
        items.map(ing => ing.count = ing.type === typeIngredient ? 0 : ing.count);

        expect(ingredientsReducer(ingredientsState, {
            type: RESET_INGREDIENTS_COUNT_BY_TYPE,
            typeIngredient  
        })).toEqual({
            ...ingredientsState,
            items
        });

        ingredientsState = {
            ...ingredientsState,
            items
        };
    })

    it('should RESET_ALL_INGREDIENTS_COUNT', () => {        
        
        items = [ingredient1, ingredient2, ingredient3];
        items.map(ing => ing.count = 0);

        expect(ingredientsReducer(ingredientsState, {
            type: RESET_ALL_INGREDIENTS_COUNT              
        })).toEqual({
            ...ingredientsState,
            items
        });

        ingredientsState = {
            ...ingredientsState,
            items
        };
    })
});

