import type { RootState } from '../types';
import { TIngredientsState } from '../reducers/burger-incredients';

export const useIngredients = (store: RootState): TIngredientsState => store.ingredients;