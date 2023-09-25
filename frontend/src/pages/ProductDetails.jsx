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

    //   console.log(PRODUCT_ID);
    //    console.log(singleProduct);

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

            <h1>{singleProduct.title}</h1>
            <p>{`${singleProduct.rating.rate} stars ${singleProduct.rating.count} ratings`}</p>
            <p>${singleProduct.price}</p>
            <p>{singleProduct.category}</p>
            <img src={singleProduct.image} />
            <p>{singleProduct.description}</p>

            {/*Use CartContext for cart related events*/}
            <button onClick={() => addProduct()}>Add to Cart</button>
            <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </>
    )
}
