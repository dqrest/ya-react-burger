import type { RootState } from '../types';
import { TWSState } from '../reducers/wsocket';


export const getOrders = (store: RootState): TWSState => store.orders;