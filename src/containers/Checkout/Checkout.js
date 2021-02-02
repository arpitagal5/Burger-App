import React , {Component} from 'react' ;
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData';
import { connect } from 'react-redux' ;
class Checkout extends Component{

    checkoutCancellHandler = (props) => {
    this.props.history.goBack();

    }
    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');

    }
    render(){
        return(
            <div>
            <CheckoutSummary 
            checkoutCancell = {this.checkoutCancellHandler} 
            checkoutContinue = {this.checkoutContinueHandler}
            ingredients = {this.props.ings} />

            <Route 
            path = {this.props.match.path + '/contact-data'}
            component = {ContactData}
            />
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        ings : state.ingredients 
    }
}

export default connect(mapStateToProps)(Checkout) ;
//if we have no state value only dispatch value then we wil use like
//export default connect (null , mapDispatchToProps)();


/////// we use this without redux ///

// import React , {Component} from 'react' ;
// import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
// import {Route} from 'react-router-dom';
// import ContactData from '../Checkout/ContactData/ContactData';
// class Checkout extends Component{
//     state = {
//         ingredients : null ,
//         totalPrice : 0
//     }
    


// //here did mount will change into will mount
//     componentWillMount() {
//         const query = new URLSearchParams(this.props.location.search);
//         const ingredients = {};
//         let price = 0 ;
//         for(let param of query.entries()){
//             //['salad' = '1'] like this
//             if( param[0] === 'price' ){
//                 price = param[1];
//             }else{
//                 ingredients[param[0]] = +param[1];
//             }
            
//         }
//         this.setState({ingredients : ingredients , totalPrice : price});
//     }

//     checkoutCancellHandler = (props) => {
//     this.props.history.goBack();

//     }
//     checkoutContinueHandler = () => {
//         this.props.history.replace('/checkout/contact-data');

//     }
//     render(){
//         return(
//             <div>
//             <CheckoutSummary 
//             checkoutCancell = {this.checkoutCancellHandler} 
//             checkoutContinue = {this.checkoutContinueHandler}
//             ingredients = {this.state.ingredients} />

//             <Route 
//             path = {this.props.match.path + '/contact-data'}
//             render = {(props) => (<ContactData  ingredients = {this.state.ingredients}  price = {this.state.totalPrice} {...props}/>)}
//             />
//             </div>
//         );
//     }
// }

// export default Checkout ;

