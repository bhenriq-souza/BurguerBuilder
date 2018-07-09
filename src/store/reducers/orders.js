import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utils/updateReducersObjects';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGUER_INIT: return purchaseInit(state, action);            
        case actionTypes.PURCHASE_BURGUER_START: return purchaseBurguerStart(state, action);                            
        case actionTypes.PURCHASE_BURGUER_SUCCESS: return purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGUER_FAILED: return purchaseBurgerFailed(state, action);                        
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action);                        
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);            
        case actionTypes.FETCH_ORDERS_FAILED: return fetchOrdersFailed(state, action);            
        default:return state;
    };
};

const purchaseInit = (state, action) => {
    return updateObject(state, { purchased: false });
};

const purchaseBurguerStart = (state, action) => {
    return updateObject(state, { loading: true }); 
};

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.data, { id: action.payload.id });
    return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    });
};

const purchaseBurgerFailed = (state, action) => {
    return updateObject(state, { loading: false });
};

const fetchOrdersStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, { 
        orders: action.payload.orders,
        loading: false 
    });
};

const fetchOrdersFailed = (state, action) => {
    return updateObject(state, { loading: false });
};

export default reducer;