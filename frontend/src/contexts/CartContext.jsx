import { createContext, useContext, useEffect, useReducer } from "react";
import AuthContext from "./AuthContext";

const CartContext = createContext();

export const CART_ACTION = {
    FETCH_CART: "fetchCart", //fetching user's cart from the server
    ADD_PRODUCT: "addProduct",
    EDIT_PRODUCT: "editProduct",
    DELETE_PRODUCT: "deleteProduct",
    DELETE_CART: "deleteCart"
}

export const cartReducer = (state, action) => {
    //treat objects as read only in the React State, use a copy to update the objects in state
    if (!state) {
        console.log("state is null");
        return;
    }
    let newCart = [...state.cart];
    let newTotalQuantity = parseInt(state.totalQuantity);
    let newTotalPrice = state.totalPrice;
    let foundProduct = newCart.find((product) => {
        return product.id === action.payload.id;
    });

    console.log(state);
    console.log(action);
    console.log(newCart);


    switch (action.type) {
        case CART_ACTION.FETCH_CART:
            return { ...state }
        case CART_ACTION.ADD_PRODUCT: //if a product already exists in the cart then update its quantity property, otherwise add the new product to the end of the cart
            newTotalQuantity += action.payload.quantity;
            newTotalPrice += (action.payload.quantity * action.payload.price);
            //update the newly modified product that was found
            if (foundProduct) {
                foundProduct.quantity += action.payload.quantity;

                //keep the product quantity within the max limit
                let maxLimit = 5;
                if (foundProduct.quantity >= maxLimit) {
                    let difference = foundProduct.quantity - maxLimit;
                    newTotalQuantity -= difference;
                    newTotalPrice -= (difference * action.payload.price);
                    foundProduct.quantity = 5;
                }

                return { ...state, cart: [...newCart], totalQuantity: newTotalQuantity, totalPrice: newTotalPrice }
            }
            //add the new product to the end of the cart since it doesn't exist yet
            else {
                return { ...state, cart: [...state.cart, { id: action.payload.id, quantity: action.payload.quantity }], totalQuantity: newTotalQuantity, totalPrice: newTotalPrice }
            }
        case CART_ACTION.EDIT_PRODUCT: //you can only edit products that exist in the cart
            if (foundProduct) {
                //update the totalQuantity with the new product quantity
                newTotalQuantity -= foundProduct.quantity;
                newTotalPrice -= (foundProduct.quantity * action.payload.price);

                newTotalQuantity += action.payload.quantity;
                newTotalPrice += (action.payload.quantity * action.payload.price);
                console.log(newTotalPrice);
                foundProduct.quantity = action.payload.quantity;
                return { ...state, cart: [...newCart], totalQuantity: newTotalQuantity, totalPrice: newTotalPrice }
            }
            else {
                return { ...state }
            }
        case CART_ACTION.DELETE_PRODUCT:
            if (foundProduct) {
                newTotalQuantity -= foundProduct.quantity;
                newTotalPrice -= (foundProduct.quantity * action.payload.price);
                console.log(newTotalPrice);
                //don't need to use newCart because filter already returns a shallow copy of the array
                const filteredOutProducts = state.cart.filter(product => product.id !== action.payload.id);
                return { ...state, cart: [...filteredOutProducts], totalQuantity: newTotalQuantity, totalPrice: newTotalPrice }
            }
            else {
                return { ...state }
            }
        case CART_ACTION.DELETE_CART:
            return { ...state, cart: [], totalQuantity: 0, totalPrice: 0 }
        default:
            throw Error('Unknown action: ' + action.type);
    }
}

export const CartContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, { cart: [], totalQuantity: 0, totalPrice: 0 });
    const { isSignedIn } = useContext(AuthContext);

    function setLocalStorage() {
        localStorage.setItem("state", JSON.stringify(state));
    }

    function getLocalStorageState() {
        return JSON.parse(localStorage.getItem("state"));
    }

    function deleteLocalStorageState() {
        localStorage.removeItem("state");
    }

    //if the user is logged in, fetch their saved cart from the server. Can't do that with fake API store so just hold off on this for now
    useEffect(() => {

    }, []);

    //otherwise load their local cart
    useEffect(() => {
        //if the local storage is null then initialize it
        let initialState = getLocalStorageState();
        if (initialState) {
            setLocalStorage();
            initialState = getLocalStorageState();
        } else {
            state.cart = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
            setLocalStorage();
        }
    }, []);

    //update the localStorage values after the state has been set to prevent concurrency issues
    useEffect(() => {
        setLocalStorage();
    }, [state]); //update localStorage if the state's cart or totalQuantity change

    console.log('CartContext state:', state);

    return (
        <CartContext.Provider value={{ ...state, dispatch }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;