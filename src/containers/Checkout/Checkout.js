import React, {Component} from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary';

class Checkout extends Component{
    state={
        ingredients:{
            salad:1,
            meat:1,
            bacon:1,
            cheese:1
        }
    }

    checkoutContinuedHandler=() => {
        this.props.history.replace('/checkout/contact-data');
    }

    checkoutCancelledHandler=() => {
        this.props.history.goBack();
    }

    componentDidMount(){
        const params= new URLSearchParams(this.props.location.search);
        const ingredients={};
        console.log(params.entries());
        for(let param of params.entries()){
            ingredients[param[0]]=+param[1];
        }

        this.setState({ingredients});
    }

    render(){
        return(
            <div>
                <CheckoutSummary 
                ingredients={this.state.ingredients}
                checkoutContinued={this.checkoutContinuedHandler}
                checkoutCancelled={this.checkoutCancelledHandler}
                />
            </div>
        )
    }
}

export default Checkout;