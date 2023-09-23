import { createContext, useEffect, useReducer } from "react";

const CartContext = createContext();

export const CART_ACTION = {
    FETCH_CART: "fetchCart", //fetching user's cart from the server
    ADD_PRODUCT: "addProduct",
    EDIT_PRODUCT: "editProduct",
    DELETE_PRODUCT: "deleteProduct",
}

export const cartReducer = (state, action) => {
    //gets a reference to the object to directly modify its properties
    let foundProduct = state.cart.find((product) => {
        return product.id === action.payload.id;
    });

    switch (action.type) {
        case CART_ACTION.FETCH_CART:
            break;
        case CART_ACTION.ADD_PRODUCT: //if a product already exists in the cart then update its quantity property, otherwise add the new product to the end of the cart
            //update the newly modified product that was found
            if (foundProduct) {
                foundProduct.quantity += action.payload.quantity;
                return { ...state, cart: [...state.cart] }
            }
            //add the new product to the end of the cart since it doesn't exist yet
            else {
                return { ...state, cart: [...state.cart, { id: action.payload.id, quantity: action.payload.quantity }] }
            }
        case CART_ACTION.EDIT_PRODUCT: //you can only edit products that exist in the cart
            if (foundProduct) {
                foundProduct.quantity = action.payload.quantity;
                return { ...state, cart: [...state.cart] }
            }
            else {
                return { ...state }
            }
        case CART_ACTION.DELETE_PRODUCT:
            const filteredOutProducts = state.cart.filter(product => product.id !== action.payload.id);
            return { ...state, cart: [...filteredOutProducts] }
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