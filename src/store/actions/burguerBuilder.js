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
                dispatch(fetchIngredientsFailed());
            });
    };
};

const setIngredients = payload => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        payload: payload
    }
};

const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED        
    }
}



