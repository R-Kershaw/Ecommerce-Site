import { NavLink } from "react-router-dom";
import logo from '../assets/icons8-tree-32.png';
import signIn from '../assets/icons8-account-32.png';
import cart from '../assets/icons8-cart-32.png';
import CartContext from "../contexts/CartContext";
import { useContext, useEffect, useState } from "react";

export default function NavBar() {
    const { totalQuantity } = useContext(CartContext);
    const [temp, setTemp] = useState(0);

    useEffect(()=>{
        let p = JSON.parse(localStorage.getItem("state")).totalQuantity;
        setTemp(p);
        console.log(p);
    },[])

    return (
        <div className="m-2 grid grid-cols-6 md:grid-cols-12 bg-trf-400 rounded">
            <NavLink className=" sm:px-4 grid-col-start-1 md:col-start-2" to="/">
                <img className="m-1 content-start " src={logo} alt="Home" />
            </NavLink>
            <NavLink className="px-4 col-start-10" to="/users/signin">
                <img className="m-1 content-start " src={signIn} alt="Sign In" />
            </NavLink>
            <NavLink className="px-4 col-start-11 relative" to="/cart">
                <img className="m-1 content-start" src={cart} alt="Cart" />
                <span className=" bg-trf-900 px-2 py-1 text-xs text-white font-bold rounded-full top-1 -right-1 absolute">
                    {temp}
                </span>
            </NavLink>
        </div>
    )
}
