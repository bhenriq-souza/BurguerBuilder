import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utils/updateReducersObjects';

const initialState = {
    ingredients: null,
    totalPrice: 0,
    loading: false,
    error: false,
    building: false
};

let INGREDIENT_PRICES = {};

const reducer = (state = initialState, action) => {    
    switch(action.type) {
        case actionTypes.ADD_INGREDIENTS: return addIngredients(state, action);            
        case actionTypes.REMOVE_INGREDIENTS: return removeIngredients(state, action);                       
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.SET_INITIAL_TOTAL: return setPrice(state, action);  
        case actionTypes.SET_INGREDIENTS_PRICES: return setIngredientPrices(action);
        case actionTypes.FETCH_FAILED: return fetchFailed(state, action);            
        default: return state;        
    };
};

const addIngredients = (state, action) => {
    let updatedIngredient = null, updatedIngredients = null, updatedState = null;
    updatedIngredient = { [action.payload.ingredient]: state.ingredients[action.payload.ingredient] + 1 };
    updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload.ingredient],
        building: true
    };
    return updateObject(state, updatedState);
};

const removeIngredients = (state, action) => {
    let updatedIngredient = null, updatedIngredients = null, updatedState = null;
    updatedIngredient = { [action.payload.ingredient]: state.ingredients[action.payload.ingredient] - 1 };
    updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload.ingredient],
        building: true
    };
    return updateObject(state, updatedState);
};

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: action.payload.ingredients,
        error: false,
        building: false
    });
};

const setPrice = (state, action) => {
    return updateObject(state, {
        totalPrice: action.payload.initialPrice,
        error: false
    });
};

const setIngredientPrices = action => {
    INGREDIENT_PRICES = action.payload.ingredientPrices;
};

const fetchFailed = (state, action) => {
    return updateObject(state, { error: false });
};

export default reducer;