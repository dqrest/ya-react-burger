import { FC, useMemo } from "react";
import { v4 as uuid } from 'uuid';

// shared
import { TOrderItemDto } from '../../shared/dtos/order-item-dto';
import { TOrderState } from '../../shared/types/order-state';

// styles
import odStyle from './orders-desk.module.css';


const OrdersDesk: FC<TOrdersList> = ({ orders, total, totalToday }) => {
    return <>
        <div className={odStyle.row}>
            <div className={odStyle.column}>
                <p className="text text_type_main-medium">Готовы:</p>
                <div className={`${odStyle.columnContent} custom-scroll`}>
                    {orders.filter(o => o.status === TOrderState.Done)
                        .map(o =>
                            <span key={uuid()}>
                                <span key={uuid()} className={odStyle.doneOrder}>
                                    {o.number}
                                </span>
                                <br key={uuid()} />
                            </span>)
                    }
                </div>
            </div>
            <div className={odStyle.column}>
                <p className="text text_type_main-medium">В работе:</p>
                <div className={`${odStyle.columnContent} custom-scroll`}>
                    {orders.filter(o => o.status === TOrderState.Created)
                        .map(o =>
                            <span key={uuid()}>
                                <span key={uuid()}>
                                    {o.number}
                                </span>
                                <br key={uuid()} />
                            </span>)
                    }
                </div>
            </div>
        </div>
        <span className="text text_type_main-medium">
            Выполнено за все время:
            <br/>
            <span className="text text_type_digits-large">
                {total}
            </span>
        </span>
        <span className="text text_type_main-medium">
            Выполнено за сегодня:
            <br />
            <span className="text text_type_digits-large">
                {totalToday}
            </span>
        </span>
    </>
}

type TOrdersList = {
    orders: Array<TOrderItemDto>;
    totalToday: number;
    total: number;
}


export default OrdersDesk;