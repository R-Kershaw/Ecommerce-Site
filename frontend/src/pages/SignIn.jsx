import { json, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { signInUser } from "../api";
import AuthContext, { AUTH_ACTION } from "../contexts/AuthContext";

export default function SignIn() {
    const { username, password, token, isSignedIn, dispatch } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            //    const userData = await signInUser(username, password);
            const userData = await signInUser(username, password);
            await dispatch({ type: AUTH_ACTION.SIGN_IN, payload: userData.token });
            await localStorage.setItem("tokenId", userData.token);
            await localStorage.setItem("username", username);
            console.log(userData.token);
            console.log(token);
            //set userData in authContext and localStorage
            if (userData.token) {
                navigate(`/`);
            }
            else {
                //create a notification displaying what the error is
                setError(json.error);
            }
        } catch (error) {
            setError(error.message);
        }
    }
    console.log("local storage token: " + localStorage.getItem("tokenId"));
    console.log("local storage name: " + localStorage.getItem("username"));
    console.log(isSignedIn);
    console.log(token);
    console.log(username);

    function SignOut() {
        function logOut() {
            localStorage.clear();
            dispatch({ type: AUTH_ACTION.SIGN_OUT });
            //    setLoginStatus(false);
            //    setLoginMessage("You are currently logged out.")
        }

        if (isSignedIn) {
            return (
                <div className="m-2">
                    <button className="font-bold w-28 px-2 py-2.5 bg-rose-300 hover:bg-rose-400 hover:text-rose-700 text-rose-950 rounded-lg text-md" onClick={logOut}>Sign Out</button>
                </div>
            )
        }
        return null;
    }

    function Greeting() {
        if (isSignedIn) {
            return <h1 className="font-bold m-4 rounded">User Account: {username}</h1>
        }
        return (
            <h1 className="font-bold m-4 rounded">Sign Into Your Account</h1>
        )
    }

    return (
        <>
            <div className="m-2  border  bg-trf-50 rounded-lg  shadow-md overflow-hidden relative hover:shadow-lg">
                <Greeting />
            </div>
            <div className="m-2 border bg-trf-50 rounded-lg  shadow-md overflow-hidden relative hover:shadow-lg">
                <form className=" rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Username
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={username}
                                onChange={(e) => dispatch({ type: AUTH_ACTION.SET_USERNAME, payload: e.target.value })}
                            />
                        </label>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Password
                            <input type="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                value={password}
                                onChange={(e) => dispatch({ type: AUTH_ACTION.SET_PASSWORD, payload: e.target.value })}
                            />
                        </label>
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="font-bold w-40 sm:w-56 md:w-64 px-2 py-2.5 bg-trf-200 hover:bg-trf-300 hover:text-trf-600 text-trf-950 rounded-lg text-md">
                            Sign In
                        </button>
                        <button className="font-bold w-40 sm:w-56 md:w-64 px-2 py-2.5 border border-trf-950 bg-white hover:bg-trf-300 hover:text-trf-600 text-trf-950 rounded-lg text-md " href="#">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
            <SignOut />
        </>
    )
}