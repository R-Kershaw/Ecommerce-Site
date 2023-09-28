import { useContext, useEffect, useState } from "react";
import CartContext, { CART_ACTION } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
    const cart = useContext(CartContext);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    //prevent the user from visiting this page if the cart is empty
    useEffect(() => {
        if (cart.totalQuantity < 1) {
            navigate(`/`);
        }
    }, []);

    //remove the contents of the cart after successfully completing your order
    async function deleteCart() {
        try {
            cart.dispatch({ type: CART_ACTION.DELETE_CART, payload: { id: 0 } }); //payload only needed for foundProduct init, not actually used in this action
            localStorage.removeItem("state");
        } catch (error) {
            console.log(error);
        }
    }

    console.log(cart);
    return (
        <>
            <div className="m-2">
                <div className="capitalize border bg-trf-50  font-bold py-2 px-2 rounded w-full shadow-md">
                    <h1 className="m-2 text-xl text-trf-950">Complete your order</h1>
                </div>
                <div className="grid grid-cols-3 gap-x-2 gap-y-4">
                    <div className=" grid w-full col-span-2">
                        <div className=" grid w-full border bg-trf-50 rounded-lg my-2 shadow-md overflow-hidden relative hover:shadow-lg">
                            <p className="my-2 capitalize font-bold py-2 px-4 ">Shipping Address</p>
                        </div>
                        <div className="grid w-full border bg-trf-50 rounded-lg my-2 shadow-md overflow-hidden relative hover:shadow-lg">
                            <p className="my-2 capitalize font-bold py-2 px-4 ">Payment Method</p>
                        </div>
                        <div className="grid w-full border bg-trf-50 rounded-lg my-2 shadow-md overflow-hidden relative hover:shadow-lg">
                            <p className="my-2 capitalize font-bold py-2 px-4 ">Billing Info</p>
                        </div>
                    </div>

                    <div className="my-2 inline-block col-span-1 capitalize border bg-trf-50 shadow-md font-bold py-2 px-2 rounded w-full">
                        <button
                            className="w-full uppercase font-bold px-2 py-2.5 bg-trf-400 hover:bg-trf-500 hover:text-trf-700 text-trf-950 rounded-lg text-md"
                            onClick={() => {
                                alert("Thank for placing your order!")
                                deleteCart();
                                navigate(`/`)
                            }}>
                            checkout
                        </button>
                        <hr></hr>
                        <p className="m-2">{`SubTotal: $${cart.totalPrice.toFixed(2)}`}</p>

                        <p className="m-2">{`Item Count: (${cart.totalQuantity})`}</p>

                    </div>
                </div>
            </div>
        </>
    )
}

