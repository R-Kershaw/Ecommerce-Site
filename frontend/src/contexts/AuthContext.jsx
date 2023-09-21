import { createContext, useEffect, useReducer } from "react"

const AuthContext = createContext();

export const ACTION = {
    SET_USERNAME: 'setUsername',
    SET_PASSWORD: 'setPassword',
    SIGN_IN: 'signin',
    SIGN_OUT: 'signout'
}

//only manages state, not logic
export const authReducer = (state, action) => {
    switch (action.type) {
        case ACTION.SET_USERNAME:
            return { ...state, username: action.payload }
        case ACTION.SET_PASSWORD:
            return { ...state, password: action.payload }
        case ACTION.SIGN_IN:
            return {
                ...state,
                isSignedIn: true,
                token: action.payload
            }
        case ACTION.SIGN_OUT:
            return {
                ...state,
                username: "",
                password: "",
                token: "",
                isSignedIn: false
            }

        default:
            throw Error('Unknown action: ' + action.type);
    }
}

export const AuthContextProvider = ({ children }) => {
    //the initial state
    const [state, dispatch] = useReducer(authReducer, { username: "mor_2314", password: "83r5^_", token: "", isSignedIn: false });

    //if a token exists, get the current user
    useEffect(() => {
        const user = localStorage.getItem("tokenId");
        if (user) {
            dispatch({ type: ACTION.SIGN_IN, payload: user });
        }
    }, [])

    console.log('AuthContext state:', state);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;