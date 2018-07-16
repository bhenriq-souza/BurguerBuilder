import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Button from '../../components/Comum/Button/Button';
import Input from '../../components/Comum/Forms/Input/InputElement';
import Spinner from '../../components/Comum/Spinner/Spinner';
import style from './Authentication.css';
import * as actions from '../../store/actions/index';

class Authentication extends Component {
    state = {
        authForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true

                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
    };

    componentDidMount() {
        if(!this.props.isBuildingBurguer && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
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
            if (rules.isEmail) {
                const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                isValid = pattern.test(value) && isValid;
            }
            if (rules.isNumeric) {
                const pattern = /^\d+$/;
                isValid = pattern.test(value) && isValid;
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
        const updatedAuthForm = { 
            ...this.state.authForm,
            [inputIdentifier]: {
                ...this.state.authForm[inputIdentifier],
                value: event.target.value,
                valid: this.checkElementValidity(event.target.value, this.state.authForm[inputIdentifier].validation),
                touched: true
            }
        };
        this.setState({ authForm: updatedAuthForm });        
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onUserAuth(this.state.authForm.email.value, this.state.authForm.password.value, this.state.isSignUp);
    }

    switchAuthModeHandler = () => {
        this.setState( prevState => {
            return { isSignUp: !prevState.isSignUp };
        });
    }

    render() {
        const formElements = [];
        for(let key in this.state.authForm) {
            formElements.push({
                id: key,
                config: this.state.authForm[key]
            });
        }
        let form = formElements.map( formElement => {
            return (
                <Input 
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
        }); 
        
        if(this.props.loading) {
            form = <Spinner />;
        }

        let errorMessage = null;
        if(this.props.error) {
            errorMessage = <p>{this.props.error.message}</p>;
        }

        let authSuccessRedirect = null;
        if(this.props.isAuth) {
            authSuccessRedirect = <Redirect to={this.props.authRedirectPath} />;
        }        

        return (
            <div className={style.Authentication}>
                {authSuccessRedirect}
                {errorMessage}
                <form onSubmit={this.onSubmitHandler}>
                    {form}
                    <Button btnType="Success" >SUBMIT</Button>                    
                </form>
                <Button 
                    btnType="Danger" 
                    clicked={this.switchAuthModeHandler} 
                    > SWITCH TO { this.state.isSignUp ? 'SIGNIN' : 'SIGNUP' }
                </Button>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        isBuildingBurguer: state.burguerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUserAuth: (email, password, isSignUp) => dispatch(actions.authenticateUser(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Authentication);