import { useContext, useEffect } from "react"
import CartContext, { CART_ACTION } from "../contexts/CartContext"
import { useNavigate } from "react-router-dom";
import { addCartItem } from "../api";

export default function Cart() {
    const { cart, totalQuantity, dispatch } = useContext(CartContext);
    const navigate = useNavigate();

    function getLocalStorageState() {
        console.log(JSON.parse(localStorage.getItem("state")));
        return JSON.parse(localStorage.getItem("state"));
    }

    function getLocalStorageCart() {
        console.log(JSON.parse(localStorage.getItem("state")).cart);
        return JSON.parse(localStorage.getItem("state")).cart;
    }

    function getLocalStorageTotalQuantity() {
        console.log(JSON.parse(localStorage.getItem("state")).totalQuantity);
        return JSON.parse(localStorage.getItem("state")).totalQuantity;
    }

    async function addProduct(productId, productQuantity) {
        try {
            //update the server's cart 
            //    await addCartItem(id);

            //update the client's cart
            console.log(productId, productQuantity);
            dispatch({ type: CART_ACTION.ADD_PRODUCT, payload: { id: productId, quantity: productQuantity } });
            console.log('Cart Page state:', cart);

        } catch (error) {
            console.log(error);
        }
    }
    async function editProduct(productId, productQuantity) {
        try {
            //update the client's cart
            console.log(productId, productQuantity);
            dispatch({ type: CART_ACTION.EDIT_PRODUCT, payload: { id: productId, quantity: productQuantity } });
            console.log('Cart Page state:', cart);

        } catch (error) {
            console.log(error);
        }
    }

    async function deleteProduct(productId) {
        try {
            dispatch({ type: CART_ACTION.DELETE_PRODUCT, payload: { id: productId } });
            console.log('Cart Page state:', cart);
        } catch (error) {
            console.log(error);
        }
    }

    async function getCartQuantity() {
        try {
            console.log('cart quantity: ' + totalQuantity);
            console.log('Cart Page state:', cart);
            console.log("local storage cart: " + getLocalStorageCartState());
            console.log("local storage quantity: " + getLocalStorageCartQuantity());
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <h1>
                Cart Page
            </h1>
            <br></br>
            <button onClick={() => addProduct(2, 1)}>Add To Cart id 2</button>
            <br></br>
            <button onClick={() => addProduct(99, 1)}>Add To Cart id 99</button>
            <br></br>
            <button onClick={() => editProduct(2, 2)}>Edit Cart id 2</button>
            <br></br>
            <button onClick={() => deleteProduct(2)}>Remove product id 2</button>
            <br></br>
            <button onClick={() => deleteProduct(99)}>Remove product id 99</button>
            <br></br>
            <button onClick={() => getLocalStorageTotalQuantity()}>Get cart quantity</button>

        </>
    )
}