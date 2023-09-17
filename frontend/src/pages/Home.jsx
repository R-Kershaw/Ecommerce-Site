import { getAllCategories, getAllProducts, getProductsInCategory, getSingleProduct } from "../api";
import { useEffect, useState } from "react";
import Product from "../components/Product";

export default function Home() {
    const [allProducts, setAllProducts] = useState([]);
    const [singleProduct, setSingleProduct] = useState(null);
    const [allCategories, setAllCategories] = useState([]);
    const [productsInCategory, setProductsInCategory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const productData = await getAllProducts();
            setAllProducts(productData);

            const categoryData = await getAllCategories();
            setAllCategories(categoryData);
            
            //   const dataSingleProduct = await getSingleProduct('2');
            //  setSingleProduct(dataSingleProduct);
            
            const productsInCategoryData = await getProductsInCategory('electronics');
            setProductsInCategory(productsInCategoryData);
            
            setLoading(false);
        }
        fetchData();
    }, []);

    //   console.log(allProducts);
    //   console.log(singleProduct);
    console.log(allCategories);
    console.log(productsInCategory);

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