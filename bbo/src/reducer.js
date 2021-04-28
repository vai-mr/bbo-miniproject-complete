export const initialState = {
    basket: [],
    user: null,
    sword: '',
};

//build a selector
//reduce iterates through the basket and calculates the total
export const getBasketTotal = (basket) => 
    basket?.reduce((amount, item) => item.price + amount, 0);


//reducer listens to the update and knows what to do

const reducer = (state,action) => {
    console.log(action);
    switch(action.type){
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket,action.item],
            };
        case 'REMOVE_FROM_BASKET':
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );

            let newBasket = [...state.basket];

            if(index >=0 ){
                newBasket.splice(index,1);


            } else {
                console.warn(
                    `Cannot remove product (id: ${action.id}) as its not in basket!`
                )
            }

            return {
                ...state,
                basket: newBasket,
            };

        case 'SET_USER':
            return {
                ...state,
                user: action.user,
            };
        
        case 'SEARCH_AGAIN':
            return {
                ...state,
                sword: action.sword,
            };

        case 'ADD_SEARCH_WORD':
            return {
                ...state,
                sword: action.sword,
            };

        case 'EMPTY_BASKET':
            return {
                ...state,
                basket: [],
            };
        default:
            return state;
    }
};

export default reducer;