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

    console.log(allProducts);
    //   console.log(singleProduct);
    //   console.log(allCategories);
    //   console.log(productsInCategory);

    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    //use with the category navbar
    async function showProductsInCategory(categoryName) {
        if (allCategories.includes(categoryName)) {
            const productsInCategoryData = await getProductsInCategory(categoryName);
            setAllProducts(productsInCategoryData);
        }
        else {
            //if the category name is invalid or doesn't exist, just show all items
            const productsInCategoryData = await getAllProducts();
            setAllProducts(productsInCategoryData);
            console.log("value does not exists in this object");
        }
        console.log(allProducts);
    }

    //sort functions
    //low to high
    
    //helper object to prevent spelling errors
    const SORT_TYPE = {
        PRICE_ASCENDING: 'priceAscending',
        PRICE_DESCENDING: 'priceDescending'
    }
    
    function sortProductsByType(type) {
        //spread to create a shallow copy (then set the original array as the shallow copy to re-render the array)
        let sortedProducts = [...allProducts];
        switch (type) {
            case SORT_TYPE.PRICE_ASCENDING:
                sortedProducts = [...allProducts].sort((a, b) => a.price > b.price ? 1 : -1);
                break;
            case SORT_TYPE.PRICE_DESCENDING:
                sortedProducts = [...allProducts].sort((a, b) => a.price < b.price ? 1 : -1);
                break;
            default:
                throw new Error();
        }
        setAllProducts(sortedProducts);
    }

    function ascendingPrice() {
        //spread to create a shallow copy then set the original array as the shallow copy to re-render
        const sortedProducts = [...allProducts].sort((a, b) => a.price > b.price ? 1 : -1);
        setAllProducts(sortedProducts);
    }

    //high to low
    function descendingPrice(a, b) {
        const sortedProducts = [...allProducts].sort((a, b) => a.price < b.price ? 1 : -1);
        setAllProducts(sortedProducts);
    }

    return (
        <>
            <h1>
                Home Page
            </h1>
            <br></br>
            <div>
                <button onClick={() => showProductsInCategory('electronics')}>Electronics</button>
                <button onClick={() => sortProductsByType(SORT_TYPE.PRICE_ASCENDING)}>Sort By Price Ascending</button>
                <button onClick={() => sortProductsByType(SORT_TYPE.PRICE_DESCENDING)}>Sort By Price Descending</button>
                {allProducts.map(product => (
                    <Product key={product.id} product={product} />
                ))}
            </div>
        </>
    )
}