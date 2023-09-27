import { NavLink } from "react-router-dom";
import logo from '../assets/icons8-tree-32.png';
import signIn from '../assets/icons8-account-32.png';
import cart from '../assets/icons8-cart-32.png';


export default function NavBar() {
    return (
        <div className="m-2 grid grid-cols-6 md:grid-cols-12 bg-trf-400 rounded">
            <NavLink className=" sm:px-4 grid-col-start-1 md:col-start-2" to="/">
                <img className="m-1 content-start " src={logo} alt="Home" />
            </NavLink>
            <NavLink className="px-4 col-start-10" to="/users/signin">
                <img className="m-1 content-start " src={signIn} alt="Sign In" />
            </NavLink>
            <NavLink className="px-4 col-start-11" to="/cart">
                <img className="m-1 content-start " src={cart} alt="Cart" />
            </NavLink>
        </div>
    )
}
