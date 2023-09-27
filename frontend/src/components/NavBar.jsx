import { NavLink } from "react-router-dom";
import homeLogo from '../assets/icons8-tree-32.png';
import signInLogo from '../assets/icons8-account-32.png';
import cartLogo from '../assets/icons8-cart-32.png';
import CartContext, { CART_ACTION } from "../contexts/CartContext";
import { useContext, useEffect } from "react";

export default function NavBar() {
    const cart = useContext(CartContext);

    useEffect(() => {
        cart.dispatch({ type: CART_ACTION.FETCH_CART, payload: { id: 0 } })
    })

    return (
        <div className="m-2 grid grid-cols-6 md:grid-cols-12 bg-trf-400 rounded">
            <NavLink className=" sm:px-4 grid-col-start-1 md:col-start-2" to="/">
                <img className="m-1 content-start " src={homeLogo} alt="Home" />
            </NavLink>
            <NavLink className="px-4 col-start-10" to="/users/signin">
                <img className="m-1 content-start " src={signInLogo} alt="Sign In" />
            </NavLink>
            <NavLink className="px-4 col-start-11 relative" to="/cart">
                <img className="m-1 content-start" src={cartLogo} alt="Cart" />
                <span className=" bg-trf-900 px-2 py-1 text-xs text-white font-bold rounded-full top-1 -right-1 absolute">
                    {cart.totalQuantity}
                </span>
            </NavLink>
        </div>
    )
}
