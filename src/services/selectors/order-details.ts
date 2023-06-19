import type { RootState } from '../types';
import { TOrderState } from '../reducers/order-details';

export const useOrderDetails = (store: RootState): TOrderState => store.orderDetails;

