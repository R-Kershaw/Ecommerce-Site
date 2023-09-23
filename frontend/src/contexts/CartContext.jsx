import { createContext, useEffect, useReducer } from "react";

const CartContext = createContext();

export const CART_ACTION = {
    FETCH_CART: "fetchCart", //fetching user's cart from the server
    ADD_PRODUCT: "addProduct",
    EDIT_PRODUCT: "editProduct",
    DELETE_PRODUCT: "deleteProduct",
}
/*case CART_ACTION.ADD_PRODUCT:
            console.log(action);
            console.log(action.payload.id);
            console.log(action.payload.quantity);
            return { ...state } */

export const cartReducer = (state, action) => {
    switch (action.type) {
        case CART_ACTION.FETCH_CART:
            break;
        case CART_ACTION.ADD_PRODUCT:
            console.log(action);
            
            //gets a reference to the object to directly modify the value
            let newProduct = state.cart.find((product) => {
                return product.id === action.payload.id;
            });
            if (newProduct) {
                console.log("Product already exists");
                //   console.log(newProduct);
                newProduct.quantity += action.payload.quantity;
                // console.log(newProduct);
                return { ...state, cart: [...state.cart]  } //update the newly modified product that was found
            }
            else {
                console.log("Product does not exist yet");
                return { ...state, cart: [...state.cart, { id: action.payload.id, quantity: action.payload.quantity }] } //add the latest item to the end of the cart
            }
            console.log(newProduct);

        case CART_ACTION.EDIT_PRODUCT:
            //    console.log(state.cart.)
            return { ...state, cart: [...state.cart, { id: action.payload.id, quantity: action.payload.quantity }] }
            break;
        case CART_ACTION.DELETE_PRODUCT:
            break;
        default:
            throw Error('Unknown action: ' + action.type);
    }
}

export const CartContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, { cart: [] });

    //if the user is logged in, fetch their saved cart from the server
    useEffect(() => {

    });

    console.log('CartContext state:', state);

    return (
        <CartContext.Provider value={{ ...state, dispatch }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;