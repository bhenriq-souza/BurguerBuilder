import AxiosOrders from '../../axios/axios.orders';
import * as actionTypes from '../actions/actionTypes';

export const addIngredients = payload => {
    return {
        type: actionTypes.ADD_INGREDIENTS,
        payload: payload
    };
};

export const removeIngredients = payload => {
    return {
        type: actionTypes.REMOVE_INGREDIENTS,
        payload: payload
    };
};

export const initIngredients = () => {
    return dispatch => {
        AxiosOrders
            .get('/ingredients.json')
            .then( response => { 
                dispatch(setIngredients({ ingredients: response.data }));
            })
            .catch(error => {
                dispatch(fetchFailed());
            });
    };
};

const setIngredients = payload => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        payload: payload
    };
};

export const initTotalPrice = () => {
    return dispatch => {
        AxiosOrders
            .get('/price.json')
            .then( response => {
                dispatch(setPrice({ initialPrice: response.data }));
            })
            .catch( error => {
                dispatch(fetchFailed());
            });
    };
};

const setPrice = payload => {
    return {
        type: actionTypes.SET_INITIAL_TOTAL,
        payload: payload
    };
};

export const initIngredientsPrice = () => {
    return dispatch => {
        AxiosOrders
            .get('/ingredientPrices.json')
            .then( response => {
                dispatch(setIngredientPrices({ ingredientPrices: response.data }));
            })
            .catch( error => {
                dispatch(fetchFailed());
            });
    };
}

export const setIngredientPrices = payload => {
    return {
        type: actionTypes.SET_INGREDIENTS_PRICES,
        payload: payload
    };
};

const fetchFailed = () => {
    return {
        type: actionTypes.FETCH_FAILED 
    };
};


