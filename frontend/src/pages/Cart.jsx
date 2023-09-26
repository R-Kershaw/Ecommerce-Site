import { useContext, useEffect, useState } from "react";
import CartContext, { CART_ACTION } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { getSingleProduct } from "../api";
import CartItem from "../components/CartItem";

export default function Cart() {
    const { cart, totalQuantity, dispatch } = useContext(CartContext);
    const [localCart, setLocalCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        let initialCart = getLocalStorageCart();
        async function fetchData() {
            setLocalCart([...initialCart]);
            setLoading(false);
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    function getLocalStorageCart() {
        console.log(localCart);
        console.log(JSON.parse(localStorage.getItem("state")).cart);
        const tempCart = JSON.parse(localStorage.getItem("state")).cart;
        return tempCart;
    }
    //debug methods
    function getLocalStorageState() {
        console.log(JSON.parse(localStorage.getItem("state")));
        const tempState = JSON.parse(localStorage.getItem("state"));
        return tempState;
    }

    function getLocalStorageTotalQuantity() {
        console.log(JSON.parse(localStorage.getItem("state")).totalQuantity);
        return JSON.parse(localStorage.getItem("state")).totalQuantity;
    }

    async function editProduct(productId, productQuantity) {
        try {
            //update the client's cart
            console.log(productId, productQuantity);
            dispatch({ type: CART_ACTION.EDIT_PRODUCT, payload: { id: productId, quantity: parseInt(productQuantity) } });

            //update the state of the localCart to re-render
            let newCart = [...localCart];
            let foundProduct = newCart.find((product) => {
                return product.id === productId;
            });

            if (foundProduct) {
                foundProduct.quantity = productQuantity;
                setLocalCart([...newCart]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteProduct(productId) {
        try {
            dispatch({ type: CART_ACTION.DELETE_PRODUCT, payload: { id: productId } });

            //update the state of the localCart to re-render
            let newCart = [...localCart];
            let foundProduct = newCart.find((product) => {
                return product.id === productId;
            });

            if (foundProduct) {
                const filteredOutProducts = newCart.filter(product => product.id !== productId);
                setLocalCart([...filteredOutProducts]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteCart(productId) {
        try {
            dispatch({ type: CART_ACTION.DELETE_CART, payload: { id: productId } });
        } catch (error) {
            console.log(error);
        }
    }

    function calculateTotal(){
        let tempCart = [...localCart.price];
        let total = 0;
        console.log(tempCart);
    }

    return (
        <>
            <h1>
                Cart Page
            </h1>
            <br></br>
            <div className="m-2">
                <div className="capitalize border bg-trf-50  font-bold py-2 px-2 rounded w-full shadow-md">
                    <h1 className="m-2">Shopping Cart</h1>
                </div>
                <div className="grid grid-cols-3 gap-x-2 gap-y-4">
                    <div className="grid col-span-2">
                        {localCart.map(product => (
                            //pass down edit and delete functions to children
                            <CartItem key={product.id} productId={product.id} quantity={product.quantity} editProduct={editProduct} deleteProduct={deleteProduct} />
                        ))}
                    </div>
                    <div className="my-2 inline-block col-span-1 capitalize border bg-trf-50  shadow-md font-bold py-2 px-2 rounded w-full">
                        <p className="">{`SubTotal: (${totalQuantity})`}</p>
                        <hr></hr>
                        
                    </div>
                </div>
            </div>
            <br></br>
        </>
    )
}