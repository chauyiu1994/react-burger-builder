import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
// not a component but a wrapper so not capital case
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

export class BurgerBuilder extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }

    // putting the purchaseable state as local state instead of redux since it is only for this class
    // although purchaseable is closely related to the ingredients
    state = {
        purchasing: false
    };

    componentDidMount() {
        
        this.props.onInitIngredients()
    }

    // need to use arrow function because:
    // 1. no need to pass as a reference
    // 2. no need to use the (this) syntax (using arrow function make sure the this refer to this class)
    updatePurchaseState(ingredients) {

        // DONT DO THIS
        // this may result in a outdated version of state copied
        // const ingredients = {
        //     ...this.props.ings
        // };
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum = sum + el;
            }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {

        // redirect to sign up page if not authenticated
        if (this.props.isAuthenticated) {
            this.setState({purchasing: true});
        } else {
            // setting auth redirect to the checkout page
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
        
    };

    purchaseCancelHandler = () => {

        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {

        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    };

    render() {

        // check if less button should be disabled for each ingredients
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        // show spinner while getting or posting data for the burger and ordersummary conditionally
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.props.ings !== null) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls 
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        price={this.props.price}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        ordered={this.purchaseHandler}
                        disabled={disabledInfo}
                        isAuth={this.props.isAuthenticated} />
                </Aux>
            );

            orderSummary = (
                <OrderSummary 
                    ingredients={this.props.ings}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.props.pric} />
            );
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateTpProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
};

export default connect(mapStateTpProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));