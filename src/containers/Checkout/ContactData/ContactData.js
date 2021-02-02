import React ,{Component} from 'react' ;
import Button from '../../../UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../UI/Spinner/Spinner';
import Input from '../../../UI/Input/Input';
import { connect } from 'react-redux' ;


// const Customer: {
//     name: 'arpit agal',
//     Address : {
//         Street : '154/4',
//         cipcode:'412003' ,
//         Country : 'India'
//     },
//     email : 'arpitagal5@gmail.com'
// },   
// deliveryMethod : 'fastest'  

// }


class ContactData extends Component{
    state={
        orderForm :{
            name : {
                elementType : 'input' ,
                elementConfig : {
                    type : 'text' ,
                    placeholder : 'Enter Name'
                },
                value : '',
                validation : {
                    required : true
                },
                valid : false ,
                touched : false
            },

            street : {
                elementType : 'input' ,
                elementConfig : {
                    type : 'text' ,
                    placeholder : 'Enter Street'
                },
                value : '',
                validation : {
                    required : true
                },
                valid : false,
                touched : false
            },
            zipcode : {
                elementType : 'input' ,
                elementConfig : {
                    type : 'text' ,
                    placeholder : 'Enter Code'
                },
                value : '',
                validation : {
                    required : true,
                    minLength : 5,
                    maxLength : 5
                },
                valid : false,
                touched : false
            },
            country : {
                elementType : 'input' ,
                elementConfig : {
                    type : 'text' ,
                    placeholder : 'Enter Country'
                },
                value : '',
                validation : {
                    required : true
                },
                valid : false,
                touched : false
            },
            email : {
                elementType : 'input' ,
                elementConfig : {
                    type : 'email' ,
                    placeholder : 'Enter E-Mail'
                },
                value : '',
                validation : {
                    required : true
                },
                valid : false,
                touched : false
            },
            deliveryMethod :{
                elementType : 'select' ,
                elementConfig :{
                    options : [
                        { value : 'fastest' , displayValue : 'Fastest'},
                        {value : 'cheapest' , displayValue : 'Cheapest'}
                    ]
                },
                value : 'fastest',
                validation : {},
                valid:true
            }
    },
    formIsValid : false ,
    loading: false 
}

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value ;
        }
    
        this.setState({loading : true}) ;
        const order = {
            ingredients : this.props.ings ,
            price : this.props.price,
            orderData : formData 
        } 
        axios.post('/orders.json' , order )
        .then(response => {
            this.setState({loading : false });
            console.log(response);
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({ loading : false });
            console.log(error);
        });
    }
     
     checkValidity(value ,rules){
         let isValid = true ;
         if(!rules){
             return true;
         }

         if(rules.required){
             isValid = value.trim() !== '' && isValid;
         }
         if(rules.minLength){
             isValid = value.length >= rules.minLength && isValid;
         }
         if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid ;
         }
         return isValid ;
     }


    inputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value ;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value , updatedFormElement.validation);
        updatedFormElement.touched = true ;
        updatedOrderForm[inputIdentifier] = updatedFormElement ;
        
        let formIsValid = true ;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid ;
        }


       console.log(formIsValid);
       
        this.setState({orderForm : updatedOrderForm , formIsValid : formIsValid}); 

    }

    render(){
        const formElements = [];
        for(let key in this.state.orderForm){
            formElements.push({
                id : key ,
            config  : this.state.orderForm[key]

            })    
        }



        let form = ( 
         
            <form onSubmit  = {this.orderHandler}>
                { formElements.map(formElement => {
            return <Input 
            key = {formElement.id}
            elementType = {formElement.config.elementType}
            elementConfig = {formElement.config.elementConfig} 
            value = {formElement.config.value}
            inValid = {!formElement.config.valid}
            shouldValidate = {formElement.config.validation}
            touched = {formElement.config.touched}
            changed={(event) => this.inputChangeHandler(event , formElement.id)} />
        })}
        <Button btnType = "Success" disabled = {!this.state.formIsValid}>ORDER NOW</Button>
        </form>
        );

        if(this.state.loading){
            form = <Spinner />
        }
        return(
            <div className = {classes.ContactData} >
                <h1>Enter your Contact Data.</h1>
              {form}
               
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings : state.ingredients ,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData) ;



// <Input elementType = "..." elementConfig = "..." value = '...'  />
// <Input inputtype = "input" type = "email" name="email" placeholder ="Enter Email" />
// <Input inputtype = "input" type = "text" name="street" placeholder ="Enter Stree" />
// <Input inputtype = "input" type = "text" name="postal" placeholder ="Enter Postal Code" />


///////we use this without redux ////////////




// import React ,{Component} from 'react' ;
// import Button from '../../../UI/Button/Button';
// import classes from './ContactData.module.css';
// import axios from '../../../axios-orders';
// import Spinner from '../../../UI/Spinner/Spinner';
// import Input from '../../../UI/Input/Input';


// // const Customer: {
// //     name: 'arpit agal',
// //     Address : {
// //         Street : '154/4',
// //         cipcode:'412003' ,
// //         Country : 'India'
// //     },
// //     email : 'arpitagal5@gmail.com'
// // },   
// // deliveryMethod : 'fastest'  

// // }


// class ContactData extends Component{
//     state={
//         orderForm :{
//             name : {
//                 elementType : 'input' ,
//                 elementConfig : {
//                     type : 'text' ,
//                     placeholder : 'Enter Name'
//                 },
//                 value : '',
//                 validation : {
//                     required : true
//                 },
//                 valid : false ,
//                 touched : false
//             },

//             street : {
//                 elementType : 'input' ,
//                 elementConfig : {
//                     type : 'text' ,
//                     placeholder : 'Enter Street'
//                 },
//                 value : '',
//                 validation : {
//                     required : true
//                 },
//                 valid : false,
//                 touched : false
//             },
//             zipcode : {
//                 elementType : 'input' ,
//                 elementConfig : {
//                     type : 'text' ,
//                     placeholder : 'Enter Code'
//                 },
//                 value : '',
//                 validation : {
//                     required : true,
//                     minLength : 5,
//                     maxLength : 5
//                 },
//                 valid : false,
//                 touched : false
//             },
//             country : {
//                 elementType : 'input' ,
//                 elementConfig : {
//                     type : 'text' ,
//                     placeholder : 'Enter Country'
//                 },
//                 value : '',
//                 validation : {
//                     required : true
//                 },
//                 valid : false,
//                 touched : false
//             },
//             email : {
//                 elementType : 'input' ,
//                 elementConfig : {
//                     type : 'email' ,
//                     placeholder : 'Enter E-Mail'
//                 },
//                 value : '',
//                 validation : {
//                     required : true
//                 },
//                 valid : false,
//                 touched : false
//             },
//             deliveryMethod :{
//                 elementType : 'select' ,
//                 elementConfig :{
//                     options : [
//                         { value : 'fastest' , displayValue : 'Fastest'},
//                         {value : 'cheapest' , displayValue : 'Cheapest'}
//                     ]
//                 },
//                 value : 'fastest',
//                 validation : {},
//                 valid:true
//             }
//     },
//     formIsValid : false ,
//     loading: false 
// }

//     orderHandler = (event) => {
//         event.preventDefault();
//         const formData = {};
//         for(let formElementIdentifier in this.state.orderForm){
//             formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value ;
//         }
    
//         this.setState({loading : true}) ;
//         const order = {
//             ingredients : this.props.ingredients ,
//             price : this.props.price,
//             orderData : formData 
//         } 
//         axios.post('/orders.json' , order )
//         .then(response => {
//             this.setState({loading : false });
//             console.log(response);
//             this.props.history.push('/');
//         })
//         .catch(error => {
//             this.setState({ loading : false });
//             console.log(error);
//         });
//     }
     
//      checkValidity(value ,rules){
//          let isValid = true ;
//          if(!rules){
//              return true;
//          }

//          if(rules.required){
//              isValid = value.trim() !== '' && isValid;
//          }
//          if(rules.minLength){
//              isValid = value.length >= rules.minLength && isValid;
//          }
//          if(rules.maxLength){
//             isValid = value.length <= rules.maxLength && isValid ;
//          }
//          return isValid ;
//      }


//     inputChangeHandler = (event, inputIdentifier) => {
//         const updatedOrderForm = {
//             ...this.state.orderForm
//         }
//         const updatedFormElement = {
//             ...updatedOrderForm[inputIdentifier]
//         }
//         updatedFormElement.value = event.target.value ;
//         updatedFormElement.valid = this.checkValidity(updatedFormElement.value , updatedFormElement.validation);
//         updatedFormElement.touched = true ;
//         updatedOrderForm[inputIdentifier] = updatedFormElement ;
        
//         let formIsValid = true ;
//         for(let inputIdentifier in updatedOrderForm){
//             formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid ;
//         }


//        console.log(formIsValid);
       
//         this.setState({orderForm : updatedOrderForm , formIsValid : formIsValid}); 

//     }

//     render(){
//         const formElements = [];
//         for(let key in this.state.orderForm){
//             formElements.push({
//                 id : key ,
//             config  : this.state.orderForm[key]

//             })    
//         }



//         let form = ( 
         
//             <form onSubmit  = {this.orderHandler}>
//                 { formElements.map(formElement => {
//             return <Input 
//             key = {formElement.id}
//             elementType = {formElement.config.elementType}
//             elementConfig = {formElement.config.elementConfig} 
//             value = {formElement.config.value}
//             inValid = {!formElement.config.valid}
//             shouldValidate = {formElement.config.validation}
//             touched = {formElement.config.touched}
//             changed={(event) => this.inputChangeHandler(event , formElement.id)} />
//         })}
//         <Button btnType = "Success" disabled = {!this.state.formIsValid}>ORDER NOW</Button>
//         </form>
//         );

//         if(this.state.loading){
//             form = <Spinner />
//         }
//         return(
//             <div className = {classes.ContactData} >
//                 <h1>Enter your Contact Data.</h1>
//               {form}
               
//             </div>
//         );
//     }
// }

// export default ContactData ;





