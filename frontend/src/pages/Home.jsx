import { getAllProducts } from "../api";
import { useEffect, useState } from "react";
import Product from "../components/Product";

export default function Home() {
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const data = await getAllProducts();
            setAllProducts(data);
            setLoading(false);
        }
        fetchData();
    }, []);

    console.log(allProducts);

    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <>
            <h1>
                Home Page
            </h1>
            <br></br>
            <div>
                {allProducts.map(product => (
                    <Product key={product.id} product={product} />
                ))}
            </div>
        </>
    )
}