import React, { Component } from 'react';
import { connect } from 'react-redux';

import AxiosOrders from '../../../axios/axios.orders';
import Button from '../../../components/Comum/Button/Button';
import Input from '../../../components/Comum/Forms/Input/InputElement';
import Spinner from '../../../components/Comum/Spinner/Spinner';
import style from './ContactData.css';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 15
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 15
                },
                valid: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your postal code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8,
                    maxLength: 8
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 15
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: '',
                valid: true
            }
        },
        loading: false,
        formIsValid: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const formData = {};
        for( let formDataKey in this.state.orderForm ) {
            formData[formDataKey] = this.state.orderForm[formDataKey].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData            
        }
        // Firebase's routes must finde the .json extension.
        AxiosOrders
            .post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }

    checkElementValidity(value, rules) {
        let isValid = true;
        if(rules) {
            if(rules.required) {
                isValid = value.trim() !== '' && isValid;
            }
            if(rules.minLength) {
                isValid = value.length >= rules.minLength && isValid;
            }
            if(rules.maxLength) {
                isValid = value.length <= rules.minLength && isValid;
            }
        }
        return isValid; 
    }

    checkFormValidity(form) {
        let formIsValid = true;
        for( let element in form ) {
            formIsValid = form[element].valid && formIsValid;
        }
        return formIsValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkElementValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let formIsValid = this.checkFormValidity(updatedOrderForm);        
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });        
    }

    render() {
        const formElements = [];
        for(let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                { 
                  formElements.map( formElement => {
                    return ( <Input 
                                key={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                invalid={!formElement.config.valid}
                                shouldValidate={formElement.config.validation}
                                touched={formElement.config.touched}
                                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                             /> 
                            );
                  })
                }
                <Button 
                    btnType="Success" 
                    disabled={!this.state.formIsValid} > 
                    ORDER 
                </Button>               
            </form>
        );
        if(this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={style.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    };
};

export default connect(mapStateToProps)(ContactData);