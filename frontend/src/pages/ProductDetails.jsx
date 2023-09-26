import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleProduct } from "../api";
import star from '../assets/icons8-rating-64.png';
import CartContext, { CART_ACTION } from "../contexts/CartContext";

export default function ProductDetails() {
    const navigate = useNavigate();
    const { PRODUCT_ID } = useParams();
    const [singleProduct, setSingleProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { dispatch } = useContext(CartContext);
    const [loading, setLoading] = useState(true);

    async function addProduct() {
        try {
            //update the server's cart 
            //    await addCartItem(id);
            console.log(singleProduct, quantity);
            //update the client's cart
            console.log(quantity);
            dispatch({ type: CART_ACTION.ADD_PRODUCT, payload: { id: singleProduct.id, quantity: parseInt(quantity) } });
            //    console.log('Cart Page state:', cart);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        async function fetchData() {
            const productData = await getSingleProduct(PRODUCT_ID);
            setSingleProduct(productData);

            setLoading(false);
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    //Add styling to make this look better
    return (
        <>
            <h1>
                Product Details Page
            </h1>
            <br></br>

            <div className="m-2 grid grid-cols-6 border bg-trf-50 rounded-lg my-2 shadow-md overflow-hidden relative hover:shadow-lg">
                <div className="bg-white flex col-span-2">
                    <img className="object-contain"src={singleProduct.image} />
                </div>
                <div className="m-6 col-span-4">
                    <h1 className="font-bold m-2">{singleProduct.title}</h1>
                    <p className="capitalize font-sm m-2">{singleProduct.category}</p>
                    <hr className="m-2"></hr>
                    <div className="">
                        <img className="m-1 w-5 h-5 inline-block" src={star} alt="rating" />
                        <span className="m-1">{parseFloat(singleProduct.rating.rate).toFixed(2)}</span>
                        <span className="m-1">{singleProduct.rating.count} ratings</span>
                    </div>
                    <p className="font-bold m-2">${singleProduct.price}</p>

                    <p className="font-medium m-2">{singleProduct.description}</p>


                    <div className="m-2 grid grid-cols-6 gap-x-2 gap-y-4">

                        <select className="w-20 sm:w-28 md:w-36 col-span-2 border border-trf-950 shadow-md overflow-hidden relative hover:shadow-lg cursor-pointer" value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <button className="font-bold w-40 sm:w-56 md:w-64 px-2 py-2.5 bg-trf-200 hover:bg-trf-300 hover:text-trf-600 text-trf-950 rounded-lg text-md" onClick={() => addProduct()}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
