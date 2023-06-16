import {  TOrderItemDto } from '../../shared/dtos/order-item-dto';
import {  TOrdersKey } from '../../shared/types/order-state';

export interface IOrderDictionary {
    key?: TOrdersKey;
    orders: TOrderItemDto[];
}

export interface IMessageResponse {
    orders: TOrderItemDto[];
    success: boolean;
    total: number;
    totalToday: number;
}

export interface IMessage extends Omit<IMessageResponse, 'success' | 'orders'>  {
    timestamp: number;    
    orders: IOrderDictionary[]
}

