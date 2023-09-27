import { useContext, useEffect, useState } from "react";
import CartContext, { CART_ACTION } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { getSingleProduct } from "../api";
import CartItem from "../components/CartItem";

export default function Cart() {
    const { totalQuantity, dispatch } = useContext(CartContext);
    const [checkOutCart, setCheckOutCart] = useState([]);
    const [checkOutTotalPrice, setCheckOutTotalPrice] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            let initialCart = getLocalStorageCart();

            //create a new array of products with their quantities. Wait for all the data to load before setting checkOutCart
            const tempCart = await Promise.all(initialCart.map(async product => {
                let tempProduct = await getSingleProduct(product.id);
                return { 'product': tempProduct, 'quantity': product.quantity };
            }));

            let tempTotal = await calculateTotal(tempCart);
            setCheckOutTotalPrice(tempTotal);

            setCheckOutCart(tempCart);
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

    function findProductbyId(cart, productId) {
        for (const cartItem of cart) {
            if (cartItem.product.id === productId) {
                return cartItem.product;
            }
        }
    }

    async function editProduct(productId, productQuantity) {
        try {
            //update the client's cart
            console.log(productId, productQuantity);
            dispatch({ type: CART_ACTION.EDIT_PRODUCT, payload: { id: productId, quantity: parseInt(productQuantity) } });

            let newCart = [...checkOutCart];
            let foundProduct = findProductbyId(newCart, productId);
            console.log(foundProduct);

            if (foundProduct) {
                console.log('found product: ' + foundProduct.id);
                foundProduct.quantity = productQuantity;
                console.log(newCart);
                setCheckOutCart([...newCart]);

                let tempPrice = await calculateTotal(checkOutCart);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteProduct(productId) {
        try {
            dispatch({ type: CART_ACTION.DELETE_PRODUCT, payload: { id: productId } });

            let newCart = [...checkOutCart];
            let foundProduct = findProductbyId(newCart, productId);

            if (foundProduct) {
                const filteredOutProducts = newCart.filter(cartItem => cartItem.product.id !== productId);
                setCheckOutCart([...filteredOutProducts]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteCart(productId) {
        try {
            dispatch({ type: CART_ACTION.DELETE_CART, payload: { id: productId } });
            setCheckOutCart([]);
        } catch (error) {
            console.log(error);
        }
    }

    async function calculateTotal(cart) {
        try {
            let tempCart = [...cart];
            return parseFloat(tempCart.reduce((sum, cartItem) => sum + (cartItem.product.price * cartItem.quantity), 0)).toFixed(2);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="m-2">
                <div className="capitalize border bg-trf-50  font-bold py-2 px-2 rounded w-full shadow-md">
                    <h1 className="m-2">Shopping Cart</h1>
                </div>
                <div className="grid grid-cols-3 gap-x-2 gap-y-4">
                    <div className="grid col-span-2">
                        {checkOutCart.map(cartItem => (
                            //pass down edit and delete functions to children
                            <CartItem key={cartItem.product.id} product={cartItem.product} quantity={cartItem.quantity} editProduct={editProduct} deleteProduct={deleteProduct} />
                        ))}
                    </div>
                    <div className="my-2 inline-block col-span-1 capitalize border bg-trf-50  shadow-md font-bold py-2 px-2 rounded w-full">
                        <p className="">{`SubTotal: (${checkOutTotalPrice})`}</p>
                        <hr></hr>
                        <p className="">{`Item Count: (${totalQuantity})`}</p>
                    </div>
                </div>
            </div>
            <br></br>
        </>
    )
}