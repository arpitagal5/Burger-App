import React , {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../UI/Spinner/Spinner';

import { connect } from 'react-redux';
import * as actionType from '../../store/action';


class BurgerBuilder extends Component{
  
    // state = {
    //     ingredients : {
    //         salad : 0,
    //         bacon: 0 ,
    //         cheese: 0 ,
    //         meat : 0
    //     },
    //     totalPrice : 5,
    //     purchasable : false ,
    //     purchasing : false ,
    //     loading : false
    // }
    state = {  
      
        purchasable : false ,
        purchasing : false ,
        loading : false ,
        error : false
    }


    componentDidMount(){
        // axios.get('https://react-burger-app-50325-default-rtdb.firebaseio.com/ingredients.json')
        // .then(response => {
        //      this.setState({ ingredients : response.data});
        // })
        // .catch(error => {
        //     this.setState({error : true });
        // })
    }


   

    updatePurchaseState  (ingredients) {
    
        const sum = Object.keys(ingredients)
        .map(igKey =>{
            return ingredients[igKey] ;
        })
        .reduce((sum , el) => {
            return sum + el ;
        },0);
        return sum > 0 ;
    }


    orderStateHandler = () => {
        this.setState({purchasing : true});
    }

    purchaseCancelHandler  = () => {
        this.setState({purchasing:false});

    }
    purchaseContinueHandler = () => {
        // console.log(this.props);
        // this.props.history.push('/checkout');


        
        // alert('Successfully Ordered !!');
        // this.setState({loading : true}) ;
        // const order = {
        //     ingredients : this.state.ingredients ,
        //     price : this.state.totalPrice,
        //     Customer: {
        //         name: 'arpit agal',
        //         Address : {
        //             Street : '154/4',
        //             cipcode:'412003' ,
        //             Country : 'India'
        //         },
        //         email : 'arpitagal5@gmail.com'
        //     },   
        //     deliveryMethod : 'fastest'   
        // }
        // axios.post('/orders.json' , order )
        // .then(response => {
        //     this.setState({loading : false , purchasing : false});
        //     console.log(response);
        // })
        // .catch(error => {
        //     this.setState({ loading : false , purchasing : false });
        //     console.log(error);
        // });
 

        this.props.history.push('/checkout');
    }

      render(){
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null ;

        
       
        let burger = this.state.error ? <p>Something went wrong here </p> : <Spinner />   ;
         if(this.props.ings){         
             burger = (
                <Aux>
                <Burger ingredients = {this.props.ings} />
                <BuildControls ingredientAdded = {this.props.onAddIngredient}
                 ingredientRemoved = {this.props.onRemoveIngredient} 
                 disabled = {disabledInfo} 
                 //here we used purchasable value that might be true or false from above condition
                 purchasable = {this.updatePurchaseState(this.props.ings)}
                 ordered = {this.orderStateHandler}
                 price={this.props.price}   />
                </Aux>
             );

             orderSummary =  
             < OrderSummary ingredients = {this.props.ings}
             price = {this.props.price}
             purchaseCancelled = {this.purchaseCancelHandler} 
             purchaseContinue = {this.purchaseContinueHandler}/> ;    
         }
         if(this.state.loading){
            orderSummary = <Spinner /> ;
            
        }

       

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>

              {orderSummary}
              </Modal>
             {burger}

            </Aux>
         

        );
    }
}

const mapStateToProps = state => {
    return {
        ings : state.ingredients ,
        price : state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient : (ingName) => dispatch({type : actionType.ADD_INGREDIENT , ingredientName : ingName}) ,
        onRemoveIngredient : (ingName) => dispatch({type : actionType.REMOVE_INGREDIENT , ingredientName : ingName})
    };

};

export default connect(mapStateToProps ,mapDispatchToProps)(withErrorHandler(BurgerBuilder , axios)) ;
    
//     render(){
//         const disabledInfo = {
//             ...this.state.ingredients 
//         };
//         for (let key in disabledInfo) {
//             disabledInfo[key] = disabledInfo[key] <= 0
//         }

//          let orderSummary =  
//          < OrderSummary ingredients = {this.state.ingredients}
//          price = {this.state.totalPrice}
//          purchaseCancelled = {this.purchaseCancelHandler} 
//          purchaseContinue = {this.purchaseContinueHandler}/> ;

//         if(this.state.loading){
//             orderSummary = <Spinner /> ;
            
//         }

       

//         return(
//             <Aux>
//                 <Modal show={this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>

//               {orderSummary}
//               </Modal>
//             <Burger ingredients = {this.state.ingredients} />
//             <BuildControls ingredientAdded = {this.addIngredientHandler}
//             ingredientRemoved = {this.removeIngredientHandler} 
//             disabled = {disabledInfo} 
//             purchasable = {this.state.purchasable}
//             ordered = {this.orderStateHandler}
//             price={this.state.totalPrice}   
//             />

//             </Aux>
         

//         );
//     }
// }

// export default withErrorHandler(BurgerBuilder , axios) ;




///// we use this without redux ///////////////////////////



// import React , {Component} from 'react';
// import Aux from '../../hoc/Auxiliary/Auxiliary';
// import Burger from '../../components/Burger/Burger';
// import BuildControls from '../../components/Burger/BuildControls/BuildControls';
// import Modal from '../../UI/Modal/Modal';
// import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
// import axios from '../../axios-orders';
// import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
// import Spinner from '../../UI/Spinner/Spinner';

// const INGREDIENTS_PRICES = {
//     salad: 0.4,
//     bacon : 0.6 ,
//     cheese : 1.4,
//     meat: 1.6
// }

// class BurgerBuilder extends Component{
  
//     // state = {
//     //     ingredients : {
//     //         salad : 0,
//     //         bacon: 0 ,
//     //         cheese: 0 ,
//     //         meat : 0
//     //     },
//     //     totalPrice : 5,
//     //     purchasable : false ,
//     //     purchasing : false ,
//     //     loading : false
//     // }
//     state = {
//         ingredients : null ,
//         totalPrice : 5,
//         purchasable : false ,
//         purchasing : false ,
//         loading : false ,
//         error : false
//     }


//     componentDidMount(){
//         axios.get('https://react-burger-app-50325-default-rtdb.firebaseio.com/ingredients.json')
//         .then(response => {
//              this.setState({ ingredients : response.data});
//         })
//         .catch(error => {
//             this.setState({error : true });
//         })
//     }


   

//     updatePurchaseState  (ingredients) {
    
//         const sum = Object.keys(ingredients)
//         .map(igKey =>{
//             return ingredients[igKey] ;
//         })
//         .reduce((sum , el) => {
//             return sum + el ;
//         },0);
//         this.setState ({ purchasable : sum > 0 });
//     }


//     addIngredientHandler = (type) => {
//         const oldCount = this.state.ingredients[type];
//         const updatedCount = oldCount + 1 ;
//         const updatedIngredients = {
//             ...this.state.ingredients
//         }
//         updatedIngredients[type] = updatedCount ;
//         const priceAddition = INGREDIENTS_PRICES[type];
//         const oldPrice = this.state.totalPrice ;
//         const newPrice = priceAddition + oldPrice ;
//         console.log(newPrice);
//         this.setState({ totalPrice:newPrice , ingredients:updatedIngredients });
//         this.updatePurchaseState(updatedIngredients);

//     }

//     removeIngredientHandler = (type) => {
//         const oldCount = this.state.ingredients[type];
//         const updatedCount = oldCount - 1 ;
//         const updatedIngredients = {
//             ...this.state.ingredients
//         }
//         if(oldCount <= 0){
//             return ;
//         } 
//         updatedIngredients[type] = updatedCount ;
//         const priceDeduction = INGREDIENTS_PRICES[type];
//         const oldPrice = this.state.totalPrice ;
//         const newPrice = oldPrice - priceDeduction ;
//         console.log(newPrice);
//         this.setState({ totalPrice:newPrice , ingredients:updatedIngredients });
//         this.updatePurchaseState(updatedIngredients);

//     }
//     orderStateHandler = () => {
//         this.setState({purchasing : true});
//     }

//     purchaseCancelHandler  = () => {
//         this.setState({purchasing:false});

//     }
//     purchaseContinueHandler = () => {
//         // console.log(this.props);
//         // this.props.history.push('/checkout');


        
//         // alert('Successfully Ordered !!');
//         // this.setState({loading : true}) ;
//         // const order = {
//         //     ingredients : this.state.ingredients ,
//         //     price : this.state.totalPrice,
//         //     Customer: {
//         //         name: 'arpit agal',
//         //         Address : {
//         //             Street : '154/4',
//         //             cipcode:'412003' ,
//         //             Country : 'India'
//         //         },
//         //         email : 'arpitagal5@gmail.com'
//         //     },   
//         //     deliveryMethod : 'fastest'   
//         // }
//         // axios.post('/orders.json' , order )
//         // .then(response => {
//         //     this.setState({loading : false , purchasing : false});
//         //     console.log(response);
//         // })
//         // .catch(error => {
//         //     this.setState({ loading : false , purchasing : false });
//         //     console.log(error);
//         // });
//         const queryParams = [];
//         for ( let i in this.state.ingredients){
//             queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
//         }
//         queryParams.push('price=' + this.state.totalPrice);
//         const queryString = queryParams.join('&');


//         this.props.history.push({
//             pathname: '/checkout' ,
//             search : '?' + queryString
//         });
//     }

//       render(){
//         const disabledInfo = {
//             ...this.state.ingredients 
//         };
//         for (let key in disabledInfo) {
//             disabledInfo[key] = disabledInfo[key] <= 0
//         }

//         let orderSummary = null ;

        
       
//         let burger = this.state.error ? <p>Something went wrong here </p> : <Spinner />   ;
//          if(this.state.ingredients){         
//              burger = (
//                 <Aux>
//                 <Burger ingredients = {this.state.ingredients} />
//                 <BuildControls ingredientAdded = {this.addIngredientHandler}
//                  ingredientRemoved = {this.removeIngredientHandler} 
//                  disabled = {disabledInfo} 
//                  purchasable = {this.state.purchasable}
//                  ordered = {this.orderStateHandler}
//                  price={this.state.totalPrice}   />
//                 </Aux>
//              );

//              orderSummary =  
//              < OrderSummary ingredients = {this.state.ingredients}
//              price = {this.state.totalPrice}
//              purchaseCancelled = {this.purchaseCancelHandler} 
//              purchaseContinue = {this.purchaseContinueHandler}/> ;    
//          }
//          if(this.state.loading){
//             orderSummary = <Spinner /> ;
            
//         }

       

//         return(
//             <Aux>
//                 <Modal show={this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>

//               {orderSummary}
//               </Modal>
//              {burger}

//             </Aux>
         

//         );
//     }
// }

// export default withErrorHandler(BurgerBuilder , axios) ;
    
// //     render(){
// //         const disabledInfo = {
// //             ...this.state.ingredients 
// //         };
// //         for (let key in disabledInfo) {
// //             disabledInfo[key] = disabledInfo[key] <= 0
// //         }

// //          let orderSummary =  
// //          < OrderSummary ingredients = {this.state.ingredients}
// //          price = {this.state.totalPrice}
// //          purchaseCancelled = {this.purchaseCancelHandler} 
// //          purchaseContinue = {this.purchaseContinueHandler}/> ;

// //         if(this.state.loading){
// //             orderSummary = <Spinner /> ;
            
// //         }

       

// //         return(
// //             <Aux>
// //                 <Modal show={this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>

// //               {orderSummary}
// //               </Modal>
// //             <Burger ingredients = {this.state.ingredients} />
// //             <BuildControls ingredientAdded = {this.addIngredientHandler}
// //             ingredientRemoved = {this.removeIngredientHandler} 
// //             disabled = {disabledInfo} 
// //             purchasable = {this.state.purchasable}
// //             ordered = {this.orderStateHandler}
// //             price={this.state.totalPrice}   
// //             />

// //             </Aux>
         

// //         );
// //     }
// // }

// // export default withErrorHandler(BurgerBuilder , axios) ;