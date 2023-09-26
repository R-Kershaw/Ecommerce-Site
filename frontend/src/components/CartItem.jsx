import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import star from '../assets/icons8-rating-64.png';

export default function CartItem({ product, quantity, editProduct, deleteProduct }) {
    const navigate = useNavigate();
    const [productQuantity, setProductQuantity] = useState(0);
    const { id, title, image, price, rating } = product;

    useEffect(() => {
        setProductQuantity(quantity);
    }, []);



    return (
        <div className="grid grid-cols-6 border bg-trf-50 rounded-lg my-2 shadow-md overflow-hidden relative hover:shadow-lg">
            <div className="bg-white flex cursor-pointer col-span-1 sm:col-span-2">
                <img className="w-56 object-contain" src={image} onClick={() => navigate(`/productDetails/${id}`)} />
            </div>

            <div className="m-3 col-span-3 flex-row">
                <h1 className="font-bold m-2 cursor-pointer" onClick={() => navigate(`/productDetails/${id}`)}>{title}</h1>
                <div className="m-1">
                    <img className="m-1 w-5 h-5 inline-block" src={star} alt="rating" />
                    <span className="m-1">{parseFloat(rating.rate).toFixed(2)}</span>
                </div>
                <p className="font-bold m-2">${parseFloat(price).toFixed(2)}</p>
                <div className="m-2 grid grid-cols-3 gap-x-2 gap-y-4">
                    <select className="w-20 sm:w-28 md:w-36 col-span-2 border border-trf-950 shadow-md overflow-hidden relative hover:shadow-lg cursor-pointer" value={productQuantity}
                        onChange={(e) => {
                            editProduct(id, e.target.value)
                            setProductQuantity(e.target.value)
                        }}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <button className="w-16 sm:w-24 md:w-28 px-2 py-2.5 bg-rose-300 hover:bg-rose-400 hover:text-rose-700 text-rose-950 rounded-lg text-md"
                        onClick={() => deleteProduct(id)}>Delete</button>
                </div>
            </div>
        </div>
    )
}