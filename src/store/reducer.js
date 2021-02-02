import * as actionType from './action'; 

const initialState = {
    ingredients : {
        bacon: 0 ,
        meat: 0 ,
        cheese : 0 ,
        salad : 0 
    },
    totalPrice: 4

}
const INGREDIENTS_PRICES = {
    salad: 0.4,
    bacon : 0.6 ,
    cheese : 1.4,
    meat: 1.6
}

const reducer = (state = initialState , action) => {
    switch(action.type){
        case actionType.ADD_INGREDIENT :
        return {
           ...state ,
           ingredients : {
               ...state.ingredients ,
               [action.ingredientName] : state.ingredients[action.ingredientName] + 1
           },
           totalPrice : state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
          
        }
        case actionType.REMOVE_INGREDIENT :
        return {
            ...state ,
            ingredients : {
                ...state.ingredients ,
                [action.ingredientName] : state.ingredients[action.ingredientName] - 1 
            },
            totalPrice : state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
        }
        default :
        return state ;
}
}

export default reducer ;