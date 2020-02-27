import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';

class Orders extends Component {

    componentDidMount() {
 
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    purchasedConfirmHandler = () => {

        this.props.onPurchasedConfirm();
    };

    render() {

        let purchasedModal = null;
        if (this.props.justPurchased) {
            purchasedModal = <Modal 
                show={this.props.justPurchased}
                modalClosed={this.purchasedConfirmHandler}>Successfully ordered the burger, please check the orders info</Modal>
        }

        let orders = <Spinner />
        if (!this.props.loading) {
            orders = (
                <div>
                    {this.props.orders.map(order => (
                        <Order 
                            key={order.id}
                            ingredients={order.ingredients}
                            price={order.price} />
                    ))}
                </div>
            );
        }
        return (
            <div>
                {orders}
                {purchasedModal}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
        justPurchased: state.order.justPurchased
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
        onPurchasedConfirm: () => dispatch(actions.purchasedConfirm())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));