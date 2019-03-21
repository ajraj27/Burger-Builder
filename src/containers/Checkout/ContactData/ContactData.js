import React,{Component} from 'react';
import classes from './ContactData.css';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';



class ContactData extends Component{
    state={
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:''
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:''
            },
            zipcode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'ZIP Code'
                },
                value:''
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:''
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your E-Mail'
                },
                value:''
            },
            delivery:{
                elementType:'select',
                elementConfig:{
                    options:[{value:'fastest',displayValue:'Fastest'},
                    {value:'cheapest',displayValue:'Cheapest'}
                ]
                },
                value:'fastest'
            },
        },    
        loading:false
        
    }

    orderHandler=(e) => {
        e.preventDefault();
        this.setState({loading:true});
        const formData={};

        for(let key in this.state.orderForm){
            formData[key]=this.state.orderForm[key].value;
        }

        const order={
        ingredients:this.props.ingredients,
         totalPrice:this.props.price,
         orderData:formData
        }

        axios.post('/orders.json',order)
        .then( res => {
            this.setState({loading:false});
            this.props.history.push('/');    

        })
        .catch((err) => this.setState({loading:false}));

    }

    inputHandler=(e,inputKey) => {
        const updatedOrderForm={...this.state.orderForm};

        const updatedFormElement={...updatedOrderForm[inputKey]};
        updatedFormElement.value=e.target.value;
        updatedOrderForm[inputKey]=updatedFormElement;
        this.setState({orderForm:updatedOrderForm});

    }

    render(){
 
        const formArray=[];
        for(let key in this.state.orderForm){
            formArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }

        let form=(
            <form onSubmit={this.orderHandler}>
                {formArray.map(el => (
                    <Input 
                    key={el.id}
                    elementType={el.config.elementType}
                    elementConfig={el.config.elementConfig} 
                    value={el.config.value}
                    changed={(event) => this.inputHandler(event,el.id)}
                    />
                ))}
                <Button btnType="Success">ORDER</Button>
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