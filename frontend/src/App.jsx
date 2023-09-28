import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Cart from "./pages/Cart";
import NavBar from "./components/NavBar";
import Checkout from "./pages/Checkout";
import ProductDetails from "./pages/ProductDetails";
import SignUp from "./pages/SignUp";

export default function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/signin" element={<SignIn />} />
          <Route path="/users/signup" element={<SignUp />}/>
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/checkout" element={<Checkout />} />
          <Route path="/productDetails/:PRODUCT_ID" element={<ProductDetails />} />
        </Routes>
      </main>
    </>
  )
}