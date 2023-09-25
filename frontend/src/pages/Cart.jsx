import { useContext, useEffect, useState } from "react";
import CartContext, { CART_ACTION } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { getSingleProduct } from "../api";
import ProductCard from "../components/ProductCard";

export default function Cart() {
    const { cart, totalQuantity, dispatch } = useContext(CartContext);
    const [localCart, setLocalCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(JSON.parse(localStorage.getItem("state")));
        let initialCart = getLocalStorageCart();
        async function fetchData() {

            //create a new temporary array of all the saved values. Wait for all the data to load before setting localCart
            const tempCart = await Promise.all(initialCart.map(async product => {
                let tempProduct = await getSingleProduct(product.id);
                return tempProduct;
            }))

            setLocalCart(tempCart);
            setLoading(false);
        }
        fetchData();
    }, [])

    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }
    function getLocalStorageState() {
        console.log(JSON.parse(localStorage.getItem("state")));
        const tempState = JSON.parse(localStorage.getItem("state"));
        return tempState;
    }

    function getLocalStorageCart() {
        console.log(localCart);
        console.log(JSON.parse(localStorage.getItem("state")).cart);
        const tempCart = JSON.parse(localStorage.getItem("state")).cart;
        return tempCart;
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

            /*
            //update the state of the localCart to re-render
            let newCart = [...localCart];
            let foundProduct = newCart.find((product) => {
                return product.id === productId;
            });
            if (foundProduct) {
                const filteredOutProducts = newCart.filter(product => product.id !== productId);
                setLocalCart([...filteredOutProducts]);
            }
            */
            console.log('Cart Page state:', cart);
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteCart(productId) {
        try {
            dispatch({ type: CART_ACTION.DELETE_CART, payload: { id: productId } });
            console.log('Cart Page state:', cart);
        } catch (error) {
            console.log(error);
        }
    }

    async function getCartQuantity() {
        try {
            console.log('cart quantity: ' + totalQuantity);
            console.log('Cart Page state:', cart);
            console.log("local storage cart: " + getLocalStorageCart());
            console.log("local storage quantity: " + getLocalStorageTotalQuantity());
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
            <button onClick={() => getLocalStorageCart()}>Get local storage state</button>
            <br></br>
            <button onClick={() => localStorage.clear()}>Clear local storage</button>
            <br></br>
            <button onClick={() => deleteCart(-1)}>Empty Cart</button>
            <br></br>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4">
                {localCart.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onClick={() => navigate(`/productDetails/${product.id}`)}
                    />
                ))}

            </div>
            <br></br>
        </>
    )
}