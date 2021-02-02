import React , {Component} from 'react' ;
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import classes from './Auth.module.css';
import * as actionType from '../../store/action';
import { connect } from 'react-redux';

class Auth extends Component{
    state = {
        controls :{
            email : {
                elementType : 'input' ,
                elementConfig : {
                    type : 'email' ,
                    placeholder : ' Email Address'
                },
                value : '',
                validation : {
                    required : true,
                    isEmail : true
                },
                valid : false ,
                touched : false
            },
            password : {
                elementType : 'input' ,
                elementConfig : {
                    type : 'password' ,
                    placeholder : 'Password'
                },
                value : '',
                validation : {
                    required : true,
                    minLength : 6
                },
                valid : false ,
                touched : false
            }
        }
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }
    inputChangeHandler = (event ,controlName) => {
       const updatedControls = {
           ...this.state.controls ,
           [controlName] : {
               ...this.state.controls[controlName] ,
               value : event.target.value,
               valid : this.checkValidity(event.target.value , this.state.controls[controlName].validation) ,
               touched : true
           }
       };
       this.setState({controls : updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value , this.state.controls.password.value);
    }
    render(){
        const formElements = [];
        for(let key in this.state.controls){
            formElements.push({
                id : key ,
            config  : this.state.controls[key]

            })    
        }
        const form = formElements.map(formElement => {
            return <Input 
            key = {formElement.id}
            elementType = {formElement.config.elementType}
            elementConfig = {formElement.config.elementConfig} 
            value = {formElement.config.value}
            inValid = {!formElement.config.valid}
            shouldValidate = {formElement.config.validation}
            touched = {formElement.config.touched}
            changed={(event) => this.inputChangeHandler(event , formElement.id)}  />
        })


        return(
            <div className = {classes.Auth}>
                <form onSubmit = {this.submitHandler}>
                 {form}
                 <Button btnType = "Success" >SUBMIT</Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = dispatch => {
     return {
         onAuth: (email , password) => dispatch({type : actionType.AUTH_START , emailId : email , password : password})
     }
}
export default connect(null ,mapStateToProps)(Auth) ;