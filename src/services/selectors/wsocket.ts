import type { RootState } from '../types';
import { TOrderItemDto } from '../../shared/dtos/order-item-dto';
import { TOrdersKey } from '../../shared/types/order-state';

export type TOrdersInfo = {
    orders: TOrderItemDto[];
    total: number;
    totalToday: number;
};

export const getUserOrders = (store: RootState): TOrdersInfo => {
    return {
        orders: store.orders?.message?.orders?.find(o => o.key === TOrdersKey.User)?.orders || []
        , total: store.orders?.message?.total || 0
        , totalToday: store.orders?.message?.totalToday || 0
    }
}

export const getAllOrders = (store: RootState): TOrdersInfo => {
    return {
        orders: store.orders?.message?.orders?.find(o => o.key === TOrdersKey.All)?.orders || []
        , total: store.orders?.message?.total || 0
        , totalToday: store.orders?.message?.totalToday || 0
    }

};