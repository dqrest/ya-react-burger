import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE
} from '../action-types/wsocket';
import { wsReducer } from './wsocket';
import { getCurrentTimestamp } from '../../shared/utils/datetime';

let state = undefined;

const ingredient0 = {
  _id: '2784',
  name: 'Булка сушеная',
  type: 'bun',
  proteins: 118,
  fat: 224,
  carbohydrates: 343,
  calories: 424,
  price: 554,
  image: "url1",
  image_mobile: "url2",
  image_large: "url3",
  __v: 959,
  count: 1
};

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

const payload = {
  success: true,
  total: 10,
  totalToday: 20,
  timestamp: Date.UTC(2023, 5, 5, 5),
  orders: [
    {
      key: "all",
      orders: [{
        createdAt: new Date(),
        updatedAt: new Date(),
        name: "Заказ вкусного бургера",
        number: 55,
        _id: "55",
        status: 'done',
        ingredients: [
          ingredient0,
          ingredient2
        ]
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        name: "Заказ вкусного бургера 2",
        number: 567,
        _id: "567",
        status: 'done',
        ingredients: [
          ingredient0,
          ingredient3,
          ingredient2
        ]
      }
      ]
    }, 
    {
      key: "user",
      orders: [{
        createdAt: new Date(),
        updatedAt: new Date(),
        name: "Заказ вкусного бургера юзера",
        number: 5589,
        _id: "55965",
        status: 'done',
        ingredients: [
          ingredient0,
          ingredient2,
          ingredient3,
          ingredient1
        ]
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        name: "Заказ вкусного бургера юзера 2",
        number: 5674678,
        _id: "56734535-456",
        status: 'done',
        ingredients: [
          ingredient0,
          ingredient1,
          ingredient2,
          ingredient3
        ]
      }
      ]
    }
  ]
};

describe('orderDetailsReducer', () => {

  it('should return the initial state', () => {
    expect(wsReducer(state, {})).toEqual({
      wsConnected: false,
      message: undefined
    });

    state = {
      wsConnected: false,
      message: undefined
    };
  })

  it('should WS_CONNECTION_SUCCESS', () => {
    expect(wsReducer(state, { type: WS_CONNECTION_SUCCESS })).toEqual({
      ...state,
      error: undefined,
      wsConnected: true
    });

    state = {
      ...state,
      error: undefined,
      wsConnected: true
    };
  })

  it('should WS_CONNECTION_ERROR', () => {
    expect(wsReducer(state, {
      type: WS_CONNECTION_ERROR
      , payload: 'error'
    })).toEqual({
      ...state,
      error: 'error',
      wsConnected: false
    });

    state = {
      ...state,
      error: 'error',
      wsConnected: false
    };
  })

  it('should WS_CONNECTION_CLOSED', () => {
    expect(wsReducer(state, {
      type: WS_CONNECTION_CLOSED
    })).toEqual({
      ...state,
      error: undefined,
      wsConnected: false
    });

    state = {
      ...state,
      error: undefined,
      wsConnected: false
    };
  })

  it('should WS_GET_MESSAGE', () => {

    const oldOrders = state.message?.orders || [];
    const newOrders = payload?.orders || [];
    newOrders.forEach(newo => {
      const old = oldOrders.find(old => old.key === newo.key)
      if (old) {
        old.orders = newo.orders;
        return;
      }
      oldOrders.push(newo);
    });
    const msg = { ...payload,  orders: oldOrders };

    expect(wsReducer(state, {
      type: WS_GET_MESSAGE,
      payload
    })).toEqual({
      ...state,
        error: undefined,
        message: msg
    });   
  })
});