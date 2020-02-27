import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    // for in (Index) vs for of (Object)
    // let list = [4, 5, 6];
    // for (let i in list) console.log(i) -> 0, 1, 2
    // for (let i of list) console.log(i) -> 4, 5, 6

    // for of is also used with an object specific iterator like in this case
    componentDidMount() {

        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            // param = ['salad', '1']
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients: ingredients, totalPrice: price});
    }

    checkoutCancelledHandler = () => {

        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        
        this.props.history.replace('/checkout/contact-data');
    };

    // using render instead of component will make the result component miss the history props
    // pass props in the arrow function to fix it
    render() {
        let summary = <Redirect to="/" />
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/orders" /> : null
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                    <Route 
                        path={this.props.match.path + '/contact-data'} 
                        component={ContactData} />
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {

    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
};

export default connect(mapStateToProps)(Checkout);