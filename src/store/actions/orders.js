import AxiosOrders from '../../axios/axios.orders';
import * as actionTypes from '../actions/actionTypes';

export const purchaseBurguer = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurguerStart());
        AxiosOrders
            .post('/orders.json', orderData) 
            .then( response => {
                dispatch(purchaseBurguerSuccess(response.data.name, orderData));
            })
            .catch( error => {
                dispatch(purchaseBurguerFailed(error));
            });
    };
};

export const purchaseBurguerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGUER_START
    };
};

export const purchaseBurguerSuccess = (orderId, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGUER_SUCCESS,
        payload: {
            id: orderId,
            data: orderData
        }
    };
};

export const purchaseBurguerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGUER_FAILED,
        error: error
    };
};

export const purchaseBurguerInit = () => {
    return {
        type: actionTypes.PURCHASE_BURGUER_INIT
    };
};

export const fetchOrders = () => {    
    return dispatch => {
        dispatch(fetchOrdersStart());
        AxiosOrders
            .get('/orders.json')
            .then( response => {
                const arrayOrders = [];
                for(let key in response.data) {
                    arrayOrders.push({
                        ...response.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess({ orders: arrayOrders }));
            })
            .catch( error => {
                dispatch(fetchOrdersFailed(error));
            });
    };
};

export const fetchOrdersSuccess = payload => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        payload: payload
    };
};

export const fetchOrdersFailed = error => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};






