import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../util/utility';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4,
    error: false,
    building: false
};

const addIngredient = (state, action) => {

    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: +(state.totalPrice + INGREDIENT_PRICES[action.ingredientName]).toFixed(2),
        building: true
    }
    return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {

    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: +(state.totalPrice - INGREDIENT_PRICES[action.ingredientName]).toFixed(2),
        building: true
    };
    return updateObject(state, updatedState);
};

const setIngredient = (state, action) => {

    const updatedState = {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false,
        building: false
    };
    return updateObject(state, updatedState);
};

const fetchIngredientFailed = (state) => {

    return updateObject(state, { error: true } );
};

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredient(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientFailed(state)
        default: return state;
    }
};

export default reducer;