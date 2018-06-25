import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        salad: 0,
        meat: 0,
        bacon: 0,
        cheese: 0
    },
    totalPrice: 4
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENTS:                
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload.ingredient]: state.ingredients[action.payload.ingredient] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload.ingredient]
            }
        case actionTypes.REMOVE_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload.ingredient]: state.ingredients[action.payload.ingredient] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload.ingredient]
            }
        default:
            return state;        
    }
};

export default reducer;