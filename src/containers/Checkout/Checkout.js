import React, {Component} from 'react';
import { Route} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary';
import ContactData from './ContactData/ContactData';


class Checkout extends Component{
    state={
        ingredients:null,
        price:0
    }

    checkoutContinuedHandler=() => {
        this.props.history.replace('/checkout/contact-data');
    }

    checkoutCancelledHandler=() => {
        this.props.history.goBack();
    }

    componentWillMount(){
        const params= new URLSearchParams(this.props.location.search);
        const ingredients={};
        let price=0;
        console.log(params.entries());
        for(let param of params.entries()){
            if(param[0]==='price'){
                price=param[1];
            }
            else{
                ingredients[param[0]]=+param[1];
            }
        }

        this.setState({ingredients,price});
    }

    render(){
        return(
            <div>
                <CheckoutSummary 
                ingredients={this.state.ingredients}
                checkoutContinued={this.checkoutContinuedHandler}
                checkoutCancelled={this.checkoutCancelledHandler}
                />
                <Route path={this.props.match.path+'/contact-data'} component={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.price} {...props}/>)} />
            </div>
        )
    }
}

export default Checkout;