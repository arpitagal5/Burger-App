import React from 'react' ;
import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null ;
    let errorMsg = null ;
    if(props.inValid && props.touched) {
        errorMsg = <p>Fill your data</p>
    }

    const inputClasses = [classes.InputElement];

    if (props.inValid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }
    switch(props.elementType){
        case('input'):
              inputElement = <input className = {inputClasses.join(' ')} 
              {...props.elementConfig} 
              value ={props.value} 
              onChange = {props.changed}/>;
        break ;
        case('select'):
              inputElement = (
              <select 
              className = {inputClasses.join(' ')}
              value ={props.value} 
              onChange = {props.changed} >
              {props.elementConfig.options.map(option =>{
              return <option key={option.value} value = {option.value}  >{option.displayValue}</option>
             })}
             </select>
           ); 
        break;
        case('textarea'):
             inputElement = <textarea className = {inputClasses.join(' ')} 
             {...props.elementConfig} value ={props.value} onChange = {props.changed} />; 
        break;
        default : <input className = {inputClasses.join(' ')} 
             {...props.elementConfig} value ={props.value} onChange = {props.changed} />;
    }
    return(
        <div className = {classes.Input}>
            <label className = {classes.Label}>{props.label}</label>
            {inputElement}
            {errorMsg}
        </div>
    );
}
export default input ;

