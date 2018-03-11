import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import AxiosOrders from '../../axios/axios.orders';
import Burguer from '../../components/Burguer/Burguer';
import BurguerControls from '../../components/Burguer/BuildControls/BuildControls';
import Modal from '../../components/Comum/Modal/Modal';
import OrderSummary from '../../components/Burguer/OrderSummary/OrderSummary';
import Spinner from '../../components/Comum/Spinner/Spinner';
import withErrorHandle from '../../hoc/withErrorHandle/withErrorHandle';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4 ,
    meat: 1.3,
    bacon: 0.7
};

class BurguerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {

    //     };
    // }
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    updatePurchasaState (ingredients) {
        // Take a array of values (Object.keys), map it into another array with key-values and reduce it up.
        const sum = Object.keys(ingredients)
                            .map((key) => ingredients[key])
                            .reduce((sum, el) => sum + el, 0);

        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        
        // updates ingredient counting.
        const bkpIngredientCount = this.state.ingredients[type];
        const updateIngredientCount = bkpIngredientCount + 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updateIngredientCount;

        // updates final price.
        const bkpPrice = this.state.totalPrice;
        const updatedPrice = INGREDIENT_PRICES[type] + bkpPrice;

        // updates the state.
        this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice });

        // Verify if the order is purchasable
        this.updatePurchasaState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {

        // updates ingredient counting, only if there are ingredients yet.
        const bkpIngredientCount = this.state.ingredients[type];
        
        if(bkpIngredientCount <= 0)
            return;
            
        const updateIngredientCount = bkpIngredientCount - 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updateIngredientCount;
        
        // updates final price.
        const bkpPrice = this.state.totalPrice;
        const updatedPrice = bkpPrice - INGREDIENT_PRICES[type];

        // updates the state.
        this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice });

        // Verify if the order is purchasable
        this.updatePurchasaState(updatedIngredients);
    }

    purchaseHandle = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandle = () => {
        this.setState({ loading: false, purchasing: false });
    }

    purchaseUpdateHandle = () => {
        //alert('You continued.');
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Bruno Souza',
                address: {
                    street: 'Rua teste 1',
                    zipCode: '12345678',
                    country: 'Brazil'
                },
                email: 'teste@teste.com',
                deliveryMethod: 'fastest'
            }
        }
        
        // Firebase's routes must finde the .json extension.
        AxiosOrders
            .post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false, purchasing: false });
            })
            .catch(error => {
                this.setState({ loading: false, purchasing: false });
            });
            
    }

    render() {

        const disabledInfo = { ...this.state.ingredients };

        // Verify if any ingredients has value smaller then 0. If its true, the button must be disabled.
        for(let key in disabledInfo)
            disabledInfo[key] = disabledInfo[key] <= 0;

        let orderSummary = (
            <OrderSummary 
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice} 
                        cancel={this.purchaseCancelHandle} 
                        continue={this.purchaseUpdateHandle} />
        );

        if(this.state.loading) {
            orderSummary = ( <Spinner /> );
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandle}>
                    {orderSummary}
                </Modal>
                <Burguer ingredients={this.state.ingredients} />
                <BurguerControls
                    disabled={disabledInfo}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable} 
                    ordered={this.purchaseHandle} />
            </Aux>
        );
    }
}

export default withErrorHandle(BurguerBuilder, AxiosOrders);

/* BurguerBulder class is statefull, because it will manage the application state. 
   In many cases, you could finde the state inside the constructor method, just like
   showed in comments.
   The state free in a class, just as a JSON object, its a modern approach.
*/