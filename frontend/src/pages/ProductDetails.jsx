import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleProduct } from "../api";

export default function ProductDetails() {
    const navigate = useNavigate();
    const { PRODUCT_ID } = useParams();
    const [singleProduct, setSingleProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const productData = await getSingleProduct(PRODUCT_ID);
            setSingleProduct(productData);

            setLoading(false);
        }
        fetchData();
    }, []);

    //   console.log(PRODUCT_ID);
    console.log(singleProduct);

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
            <button>Add to Cart</button>
        </>
    )
}
