import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api";

export default function SignUp() {
    //email, username, password, firstname, lastname, city, street, number, zipcode, lat, long, phone
    const [username, setUsername] = useState("");
    const [password, setPasssword] = useState("");
    //you don't really need these upon initial registration. These can be set later from the account page
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");
    const [phone, setPhone] = useState("");

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            //handle validation with regular expressions. (?=) uses positive lookahead assertions
            const validUsername = /.{8,20}$/;
            const validPassword = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

            if (!validUsername.test(username)) {
                setError("Invalid Username! Must be between 8 and 20 characters long");
                return;
            }

            if (!validPassword.test(password)) {
                setError("Invalid Password! Must be between 8 and 20 characters long, contain one digit, one letter and one special character");
                return;
            }

            const newUser = await registerUser(email, username, password, firstName, lastName, city, street, houseNumber, zipcode, lat, long, phone);
            alert(`Welcome to Rainforest ${username}!`);
            navigate(`/users/signin`);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <>
            <div className="m-2  border  bg-trf-50 rounded-lg  shadow-md overflow-hidden relative hover:shadow-lg">
                <h1 className="font-bold m-4 rounded">Create a new account</h1>
                {error && <p className="font-bold m-4 rounded text-red-700">{error}</p>}
            </div>
            <div className="m-2 border bg-trf-50 rounded-lg  shadow-md overflow-hidden relative hover:shadow-lg">
                <form className=" rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Username
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Password
                            <input type="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                value={password}
                                onChange={(e) => setPasssword(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="email">
                            Email Address
                            <input type="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="font-bold w-40 sm:w-56 md:w-64 px-2 py-2.5 bg-trf-400 hover:bg-trf-500 hover:text-trf-700 text-trf-950 rounded-lg text-md">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}