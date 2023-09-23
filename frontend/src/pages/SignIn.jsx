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

    return (
        <>
            <h1>
                Sign In Page
            </h1>
            <br></br>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:{""}
                        <input
                            value={username}
                            onChange={(e) => dispatch({ type: AUTH_ACTION.SET_USERNAME, payload: e.target.value })}
                        />
                    </label>
                    <label>
                        Password:{""}
                        <input type="password"
                            value={password}
                            onChange={(e) => dispatch({ type: AUTH_ACTION.SET_PASSWORD, payload: e.target.value })}
                        />
                    </label>
                    <button>Sign In</button>
                </form>
                <br></br>
                <button onClick={()=>{
                    dispatch({type:AUTH_ACTION.SIGN_OUT});
                    localStorage.clear();
                }}>Sign Out</button>
            </div>
        </>
    )
}