import { json, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInUser } from "../api";

export default function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPasssword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const userData = await signInUser(username, password);
            console.log(userData);
            //set userData in authContext and localStorage
            if (userData.token) {
                navigate(`/`);
            }
            else {
                setError(json.error);
            }
        } catch (error) {
            setError(error.message);
        }
    }

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
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <label>
                        Password:{""}
                        <input type="password"
                            value={password}
                            onChange={(e) => setPasssword(e.target.value)}
                        />
                    </label>
                    <button>Sign In</button>
                </form>
            </div>
        </>
    )
}