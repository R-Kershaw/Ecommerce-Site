import { createContext, useEffect, useReducer } from "react";

const CartContext = createContext();

export const CART_ACTION = {
    FETCH_CART: "fetchCart", //fetching user's cart from the server
    ADD_PRODUCT: "addProduct",
    EDIT_PRODUCT: "editProduct",
    DELETE_PRODUCT: "deleteProduct"
}

export const cartReducer = (state, action) => {
    //treat objects as read only in the React State, use a copy to update the objects in state
    let newCart = [...state.cart];
    let foundProduct = newCart.find((product) => {
        return product.id === action.payload.id;
    });

    console.log(newCart);

    switch (action.type) {
        case CART_ACTION.FETCH_CART:
            break;
        case CART_ACTION.ADD_PRODUCT: //if a product already exists in the cart then update its quantity property, otherwise add the new product to the end of the cart
            state.totalQuantity += action.payload.quantity;
            //update the newly modified product that was found
            if (foundProduct) {
                foundProduct.quantity += action.payload.quantity;
                return { ...state, cart: [...newCart] }
            }
            //add the new product to the end of the cart since it doesn't exist yet
            else {
                return { ...state, cart: [...state.cart, { id: action.payload.id, quantity: action.payload.quantity }] }
            }
        case CART_ACTION.EDIT_PRODUCT: //you can only edit products that exist in the cart

            if (foundProduct) {
                //update the totalQuantity with the new product quantity
                state.totalQuantity -= foundProduct.quantity;
                state.totalQuantity += action.payload.quantity;

                foundProduct.quantity = action.payload.quantity;
                return { ...state, cart: [...newCart] }
            }
            else {
                return { ...state }
            }
        case CART_ACTION.DELETE_PRODUCT:
            if (foundProduct) {
                state.totalQuantity -= foundProduct.quantity;
            }
            const filteredOutProducts = newCart.filter(product => product.id !== action.payload.id);
            return { ...state, cart: [...filteredOutProducts] }
        default:
            throw Error('Unknown action: ' + action.type);
    }
}

export const CartContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, { cart: [], totalQuantity: 0 });

    function setLocalStorage() {
        localStorage.setItem("state", JSON.stringify(state));
    }

    function getLocalStorageState() {
        return JSON.parse(localStorage.getItem("state"));
    }

    //if the user is logged in, fetch their saved cart from the server
    useEffect(() => {

    }, []);

    //otherwise load their local cart
    useEffect(() => {
        //if the local storage is null then initialize it
        let initialState = getLocalStorageState();
        if (!initialState) {
            setLocalStorage();
            initialState = getLocalStorageState();
        } else {
            state.cart = initialState.cart;
            state.totalQuantity = initialState.totalQuantity;
        }
    }, []);

    //update the localStorage values after the state has been set to prevent concurrency issues
    useEffect(() => {
        setLocalStorage();
    }, [state.cart, state.totalQuantity]); //update localStorage if the state's cart or totalQuantity change

    console.log('CartContext state:', state);

    return (
        <CartContext.Provider value={{ ...state, dispatch }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;