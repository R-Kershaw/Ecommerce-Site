import { useEffect, useState } from "react";
import { getSingleProduct } from "../api";
import star from '../assets/icons8-rating-64.png';

export default function CartItem({ productId, quantity }) {
    const [product, setProduct] = useState(null);
    const [productQuantity, setProductQuantity] = useState(0);
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
    //rounded-lg my-2 w-56 border bg-trf-50  shadow-md overflow-hidden relative hover:shadow-lg cursor-pointer
    //wrap mx-auto p-4 pb-8 md:p-20 md:flex gap-8 items-center justify-between flex-row
    return (
        <div className="grid grid-cols-6 border bg-trf-50 rounded-lg ">
            <div>
                <img className="h-40 sm:h-48 w-64 " src={product.image} />
            </div>

            <div class="my-2 col-span-3 flex-row mx-auto">
                <h1 className="font-bold m-2">{product.title}</h1>
                <div className="grid grid-cols-12  justify-start">
                    <img className="w-5 h-5 inline-block" src={star} alt="rating" />
                    <span>{parseFloat(product.rating.rate).toFixed(2)}</span>
                </div>
                <p className="font-bold m-2">${parseFloat(product.price).toFixed(2)}</p>
                <div className="m-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4">
                    <select className="w-52 col-span-2 border border-trf-950 shadow-md overflow-hidden relative hover:shadow-lg cursor-pointer" value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <button className="w-26px-5 py-2.5 font-medium bg-trf-200 hover:bg-trf-300 hover:text-trf-600 text-trf-950 rounded-lg text-sm">Delete</button>
                </div>
            </div>

        </div>
    )
}

/*
<div className="grid grid-cols-5">
            <div>
                <img className="h-40 sm:h-48 w-64 " src={product.image} />
            </div>

            <div class="col-span-4 table">
                
            </div>

        </div>
*/

/*
<div className="float-left rounded-lg my-2 border bg-trf-50 wrap mx-auto flex items-center justify-start flex-row">
            <div>
                <img className="h-40 sm:h-48 w-56 " src={product.image} />
            </div>
            <div className="m-2 table ">
                <h1 className="font-bold m-2">{product.title}</h1>
                <div className="grid grid-cols-12  justify-start">
                    <img className="w-5 h-5 inline-block" src={star} alt="rating" />
                    <span>{parseFloat(product.rating.rate).toFixed(2)}</span>
                </div>
                <p className="font-bold m-2">${parseFloat(product.price).toFixed(2)}</p>
                <div className="m-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4">
                    <select value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <button>Delete</button>
                </div>
            </div>
        </div>
*/