import {  TOrderItemDto } from '../../shared/dtos/order-item-dto';


export interface IMessageResponse {
    orders: TOrderItemDto[];
    success: boolean;
    total: number;
    totalToday: number;
}

export interface IMessage extends Omit<IMessageResponse, 'success'> {
    timestamp: number;    
}