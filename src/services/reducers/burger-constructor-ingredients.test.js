import { constructorIngredientsReducer } from './burger-constructor-ingredients';
import {
    ADD_CONSTRUCTOR_INGREDIENT
    , DELETE_CONSTRUCTOR_INGREDIENT
    , CHANGE_ORDER_CONSTRUCTOR_INGREDIENTS
    , SET_BUN_TO_CONSTRUCTOR
    , DELETE_ALL_CONSTRUCTOR_INGREDIENTS
} from '../action-types/burger-constructor-ingredients';
import { TConstructorIngredientItem } from '../../shared/dtos/burger-ingredients-item-dto';

const bun = {
    _id: '1',
    name: 'Новый бургер',
    type: 'bun',
    proteins: 1,
    fat: 2,
    carbohydrates: 3,
    calories: 4,
    price: 5,
    image: "url1",
    image_mobile: "url2",
    image_large: "url3",
    __v: 6,
    count: 1
};
const items = [];

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

let state = undefined;

describe('constructorIngredients reducer', () => {



    it('should return the initial state', () => {
        expect(constructorIngredientsReducer(state, {})).toEqual({
            items: []
            , bun: null
        });

        state = {
            items: []
            , bun: null
        };
    })

    it('should set bun', () => {
        expect(constructorIngredientsReducer(state, {
            type: SET_BUN_TO_CONSTRUCTOR,
            bun: bun
        }))
            .toEqual({
                items: items,
                bun: bun
            });
        state.bun = bun;
    })

    it('should add ingredient1', () => {
        expect(constructorIngredientsReducer(state, {
            type: ADD_CONSTRUCTOR_INGREDIENT,
            item: ingredient1
        }))
            .toEqual({
                items: [ingredient1],
                bun: bun
            });
        state.items = [ingredient1];
    })


    it('should add ingredient2', () => {
        expect(constructorIngredientsReducer(state, {
            type: ADD_CONSTRUCTOR_INGREDIENT,
            item: ingredient2
        }))
            .toEqual({
                items: [ingredient1, ingredient2],
                bun: bun
            });
        state.items = [ingredient1, ingredient2];
    })

    it('should add ingredient3', () => {
        expect(constructorIngredientsReducer(state, {
            type: ADD_CONSTRUCTOR_INGREDIENT,
            item: ingredient3
        }))
            .toEqual({
                items: [ingredient1, ingredient2, ingredient3],
                bun: bun
            });
        state.items = [ingredient1, ingredient2, ingredient3];
    })

    const deleteIndex = 1;
    it('should delete ingredient2 width deleteIndex: ' + deleteIndex, () => {
        expect(constructorIngredientsReducer(state, {
            type: DELETE_CONSTRUCTOR_INGREDIENT,
            deleteIndex
        }))
        .toEqual({
            items: [ingredient1, ingredient3],
            bun: bun
        });
        state.items = [ingredient1, ingredient3];
    })

    const sourceIndex = 1;
    const targetIndex = 0;
    it(`should change orders with sourceIndex: ${sourceIndex}, targetIndex: ${targetIndex}`, () => {           
        expect(constructorIngredientsReducer(state, {
            type: CHANGE_ORDER_CONSTRUCTOR_INGREDIENTS,
            sourceIndex: sourceIndex,
            targetIndex: targetIndex
        }))
        .toEqual({           
            bun: bun,
            items: [ingredient3, ingredient1]
        });
        state.items = [ingredient3, ingredient1];
    })   

    it(`should delete all ingredients: ${sourceIndex}, targetIndex: ${targetIndex}`, () => {           
        expect(constructorIngredientsReducer(state, {
            type: DELETE_ALL_CONSTRUCTOR_INGREDIENTS        
        }))
        .toEqual({           
            bun: bun,
            items: []
        });
        state.items = [];
    })  
});