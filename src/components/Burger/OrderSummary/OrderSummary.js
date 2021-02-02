import React, {Component} from 'react' ;
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../../UI/Button/Button';

 class OrderSummary extends Component {
     //this could be a fuctional component , doesnt have to be class based component
     componentDidUpdate(){
         console.log('[OrderSummary] WillUpdate ');
     }
     render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey} ><span style = {{ textTransform : 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>
            );
        })
         return(
            <Aux >
            <h3>Your Order</h3>
            <p>A delicious Burger with following ingredients:</p>
            <ul>
               {ingredientSummary}
            </ul>
            <p><strong>Total Price : $ {this.props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout ??</p>
            <Button btnType = "Danger" clicked = {this.props.purchaseCancelled}>CANCEL</Button>
            <Button btnType = "Success" clicked = {this.props.purchaseContinue}>CONTINUE</Button>

        </Aux>

         );
     }
 }

//  const orderSummary = ( props) => {
//     const ingredientSummary = Object.keys(props.ingredients)
//     .map(igKey => {
//         return (
//             <li key={igKey} ><span style = {{ textTransform : 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>
//         );
//     })

//     return (
//         <Aux >
//             <h3>Your Order</h3>
//             <p>A delicious Burger with following ingredients:</p>
//             <ul>
//                {ingredientSummary}
//             </ul>
//             <p><strong>Total Price : $ {props.price.toFixed(2)}</strong></p>
//             <p>Continue to checkout ??</p>
//             <Button btnType = "Danger" clicked = {props.purchaseCancelled}>CANCEL</Button>
//             <Button btnType = "Success" clicked = {props.purchaseContinue}>CONTINUE</Button>

//         </Aux>
//     );


// }

 export default OrderSummary ;