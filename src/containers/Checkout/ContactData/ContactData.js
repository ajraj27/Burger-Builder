import React,{Component} from 'react';
import classes from './ContactData.css';

import Button from '../../../components/UI/Button/Button';


class ContactData extends Component{
    state={
        name:'',
        email:'',
        address:{
            street:'',
            postal:''
        }
    }

    render(){
        return(
            <div className={classes.ContactData}>
                <h4>Enter Contact Details!</h4>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Enter Name"/>
                    <input className={classes.Input} type="text" name="email" placeholder="Enter Mail"/>
                    <input className={classes.Input} type="text" name="street" placeholder="Street Address"/>
                    <input className={classes.Input} type="text" name="postal" placeholder="Enter Postal Code"/>
                    <Button btnType="Success">ORDER</Button>
                </form>   
            </div>
        )
    }
}

export default ContactData;