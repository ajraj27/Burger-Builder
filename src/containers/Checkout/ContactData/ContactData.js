import React,{Component} from 'react';
import classes from './ContactData.css';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';



class ContactData extends Component{
    state={
        name:'',
        email:'',
        address:{
            street:'',
            postal:''
        },
        loading:false
        
    }

    orderHandler=(e) => {
        e.preventDefault();
        this.setState({loading:true});
        const order={
        ingredients:this.props.ingredients,
         totalPrice:this.props.price,
        customer:{
            name:'Anuj',
         address:{
             street:'IIIT Road',
             zipcode:211015,
             country:'India'
            },
            email:'test@gmail.com'
        },
        delivery:'fastest'
        }

        axios.post('/orders.json',order)
        .then( res => {
            this.setState({loading:false});
            this.props.history.push('/');    

        })
        .catch((err) => this.setState({loading:false}));

    }

    render(){
        let form=(
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Enter Name"/>
                <input className={classes.Input} type="text" name="email" placeholder="Enter Mail"/>
                <input className={classes.Input} type="text" name="street" placeholder="Street Address"/>
                <input className={classes.Input} type="text" name="postal" placeholder="Enter Postal Code"/>
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
            
        );

        if(this.state.loading){
            form=<Spinner />
        }
            
        return(
            <div className={classes.ContactData}>
                <h4>Enter Contact Details!</h4>
                    {form} 
            </div>
        )
    }
}

export default ContactData;