import type { RootState } from '../types';
import { TConstructorIngredientsState } from '../reducers/burger-constructor-ingredients';

export const getConstructorIngredients = (store: RootState): TConstructorIngredientsState => store.constructorIngredients;