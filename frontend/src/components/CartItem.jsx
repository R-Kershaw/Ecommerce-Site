import { useContext, useEffect, useState } from "react";
import { getSingleProduct } from "../api";
import star from '../assets/icons8-rating-64.png';
import CartContext, { CART_ACTION } from "../contexts/CartContext";

export default function CartItem({ productId, quantity, editProduct, deleteProduct }) {
    const [product, setProduct] = useState(null);
    const [productQuantity, setProductQuantity] = useState(0);
    const { dispatch } = useContext(CartContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {

            const productData = await getSingleProduct(productId);
            setProduct(productData);
            setProductQuantity(quantity);
            setLoading(false);
        }
        fetchData();
        console.log("loaded");
    }, []);

    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-6 border bg-trf-50 rounded-lg ">
            <div className="bg-white flex">
                <img className="w-56 object-contain" src={product.image} />
            </div>

            <div className="m-2 col-span-3 flex-row">
                <h1 className="font-bold m-2">{product.title}</h1>
                <div className="-m-1 grid grid-cols-12">
                    <img className="w-5 h-5 inline-block" src={star} alt="rating" />
                    <span className="-mx-1">{parseFloat(product.rating.rate).toFixed(2)}</span>
                </div>
                <p className="font-bold m-2">${parseFloat(product.price).toFixed(2)}</p>
                <div className="m-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4">
                    <select className="w-52 col-span-2 border border-trf-950 shadow-md overflow-hidden relative hover:shadow-lg cursor-pointer" value={productQuantity}
                        onChange={(e) => {
                            editProduct(product.id, e.target.value)
                            setProductQuantity(e.target.value)
                        }}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <button className="w-26px-5 py-2.5 font-medium bg-trf-200 hover:bg-trf-300 hover:text-trf-600 text-trf-950 rounded-lg text-sm"
                        onClick={() => deleteProduct(product.id)}>Delete</button>
                </div>
            </div>
        </div>
    )
}