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
                value:'',
                validity:{
                    required:true
                },
                valid:false,
                touched:false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validity:{
                    required:true
                },
                valid:false,
                touched:false
            },
            zipcode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'ZIP Code'
                },
                value:'',
                validity:{
                    required:true,
                    minlength:6,
                    maxlength:6
                },
                valid:false,
                touched:false
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:'',
                validity:{
                    required:true
                },
                valid:false,
                touched:false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your E-Mail'
                },
                value:'',
                validity:{
                    required:true
                },
                valid:false,
                touched:false
            },
            delivery:{
                elementType:'select',
                elementConfig:{
                    options:[{value:'fastest',displayValue:'Fastest'},
                    {value:'cheapest',displayValue:'Cheapest'}
                ]
                },
                value:'fastest',
                validity:{},
                valid:true
            },
        },
        formValid:false,    
        loading:false
        
    }

    checkValidity(value,rules){
        let isValid=true;

        if(rules.required){
            isValid=value.trim()!=='' && isValid;
        }

        if(rules.minlength){
            isValid=value.length>=rules.minlength && isValid;
        }

        if(rules.maxlength){
            isValid=value.length<=rules.maxlength && isValid;
        }

        return isValid;
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
        updatedFormElement.valid=this.checkValidity(updatedFormElement.value,updatedFormElement.validity);
        updatedFormElement.touched=true;
        updatedOrderForm[inputKey]=updatedFormElement;
        console.log(updatedOrderForm);

        let formValid=true;

        for(let key in updatedOrderForm){
            formValid=updatedOrderForm[key].valid && formValid;
        }

        this.setState({orderForm:updatedOrderForm,formValid});

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
                    valid={el.config.valid}
                    shouldValidate={el.config.validity}
                    touched={el.config.touched}
                    />
                ))}
                <Button btnType="Success" disabled={!this.state.formValid}>ORDER</Button>
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