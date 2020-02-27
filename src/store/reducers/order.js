import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../util/utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
    justPurchased: false
};

const purchaseInit = state => updateObject(state, { purchased: false } );

const purchaseBurgerStart = state => updateObject(state, { loading: true } );

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, { id: action.orderId } );
    const updatedState = {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder),
        justPurchased: true
    };
    return updateObject(state, updatedState);
};

const purchaseBurgerFail = state => updateObject(state, { loading: false } );

const orderStart = state => updateObject(state, { purchased: false } );

const orderSuccess = (state, action) => {
    const updatedState = {
        orders: action.orders,
        loading: false
    };
    return updateObject(state, updatedState);
};

const orderFail = state => updateObject(state, { loading: true } );

const purchasedConfirm = state => updateObject(state, { justPurchased: false } );

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.PURCHASE_INIT: return purchaseInit(state);
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state);
        case actionTypes.FETCH_ORDERS_START: return orderStart(state);
        case actionTypes.FETCH_ORDERS_SUCCESS: return orderSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAIL: return orderFail(state);
        case actionTypes.PURCHASED_CONFIRM: return purchasedConfirm(state);
        default: return state;
    }
}

export default reducer;