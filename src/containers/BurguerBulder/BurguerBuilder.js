import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import AxiosOrders from '../../axios/axios.orders';
import Burguer from '../../components/Burguer/Burguer';
import BurguerControls from '../../components/Burguer/BuildControls/BuildControls';
import Modal from '../../components/Comum/Modal/Modal';
import OrderSummary from '../../components/Burguer/OrderSummary/OrderSummary';
import Spinner from '../../components/Comum/Spinner/Spinner';
import withErrorHandle from '../../hoc/withErrorHandle/withErrorHandle';
import * as actionsCreators from '../../store/actions/index';

class BurguerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false        
    }

    componentDidMount () {
        this.props.onSetIngredients();
    }    

    updatePurchasaState () {
        // Take a array of values (Object.keys), map it into another array with key-values and reduce it up.
        const sum = Object.keys(this.props.ingredients)
                            .map((key) => this.props.ingredients[key])
                            .reduce((sum, el) => sum + el, 0);

        return sum > 0;
    }    

    purchaseHandle = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandle = () => {
        this.setState({ loading: false, purchasing: false });
    }

    purchaseUpdateHandle = () => {
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = { ...this.props.ingredients };
        // Verify if any ingredients has value smaller then 0. If its true, the button must be disabled.
        for(let key in disabledInfo)
            disabledInfo[key] = disabledInfo[key] <= 0;
        let orderSummary = null;
        let burguer = this.props.error ? <p>Ingredients can't be loaded.</p> : <Spinner />;
        if(this.props.ingredients) {            
            burguer = (
                <Aux>
                    <Burguer ingredients={this.props.ingredients} />
                    <BurguerControls
                        disabled={disabledInfo}
                        ingredientAdded={this.props.onAddIngredient}
                        ingredientRemoved={this.props.onRemoveIngredient}
                        price={this.props.totalPrice}
                        purchasable={this.updatePurchasaState()} 
                        ordered={this.purchaseHandle} />
                </Aux>
            );
            orderSummary = (
                <OrderSummary 
                        ingredients={this.props.ingredients}
                        price={this.props.totalPrice} 
                        cancel={this.purchaseCancelHandle} 
                        continue={this.purchaseUpdateHandle} 
                />
            );
        }       
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandle}>
                    {orderSummary}
                </Modal>
                {burguer}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        error: state.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (name) => dispatch(actionsCreators.addIngredients({ ingredient: name })),
        onRemoveIngredient: (name) => dispatch(actionsCreators.removeIngredients({ ingredient: name })),
        onSetIngredients: () => dispatch(actionsCreators.initIngredients())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandle(BurguerBuilder, AxiosOrders));

/* BurguerBulder class is statefull, because it will manage the application state. 
   In many cases, you could find the state inside the constructor method, just like
   showed in comments.
   The state free in a class, just as a JSON object, its a modern approach.
*/