import { getAllCategories, getAllProducts, getProductsInCategory, getSingleProduct } from "../api";
import { useEffect, useState } from "react";
import Product from "../components/Product";

export default function Home() {
    const [allProducts, setAllProducts] = useState([]);
    const [singleProduct, setSingleProduct] = useState(null);
    const [allCategories, setAllCategories] = useState([]);
    const [productsInCategory, setProductsInCategory] = useState([]);
    const [loading, setLoading] = useState(true);

    //helper object to prevent spelling errors
    const SORT_TYPE = {
        PRICE_ASCENDING: 'priceAscending',
        PRICE_DESCENDING: 'priceDescending',
        RATING_ASCENDING: 'ratingAscending',
        RATING_DESCENDING: 'ratingDescending',
        REVIEWS_ASCENDING: 'reviewsAscending',
        REVIEWS_DESCENDING: 'reviewsDescending'
    }

    useEffect(() => {
        async function fetchData() {
            const productData = await getAllProducts();
            setAllProducts(productData);

            const categoryData = await getAllCategories();
            setAllCategories(categoryData);

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

    //sort by price, rating, popularity
    function sortProductsByType(type) {
        //spread to create a shallow copy (then set the original array as the shallow copy to re-render the array)
        let sortedProducts = [...allProducts];
        switch (type) {
            case SORT_TYPE.PRICE_ASCENDING: //high to low
                sortedProducts = [...allProducts].sort((a, b) => a.price > b.price ? 1 : -1);
                break;
            case SORT_TYPE.PRICE_DESCENDING: //low to high
                sortedProducts = [...allProducts].sort((a, b) => a.price < b.price ? 1 : -1);
                break;
            case SORT_TYPE.RATING_ASCENDING:
                sortedProducts = [...allProducts].sort((a, b) => a.rating.rate > b.rating.rate ? 1 : -1);
                break;
            case SORT_TYPE.RATING_DESCENDING:
                sortedProducts = [...allProducts].sort((a, b) => a.rating.rate < b.rating.rate ? 1 : -1);
                break;
            case SORT_TYPE.REVIEWS_ASCENDING:
                sortedProducts = [...allProducts].sort((a, b) => a.rating.count > b.rating.count ? 1 : -1);
                break;
            case SORT_TYPE.REVIEWS_DESCENDING:
                sortedProducts = [...allProducts].sort((a, b) => a.rating.count < b.rating.count ? 1 : -1);
                break;
            default:
                throw new Error();
        }
        setAllProducts(sortedProducts);
    }

    //filter by category, price, rating, popularity
    function filterByType(type) {

    }

    return (
        <>
            <h1>
                Home Page
            </h1>
            <br></br>
            <div>
                <button onClick={() => showProductsInCategory('electronics')}>Electronics</button>
                <button onClick={() => sortProductsByType(SORT_TYPE.PRICE_ASCENDING)}>Price Ascending</button>
                <button onClick={() => sortProductsByType(SORT_TYPE.PRICE_DESCENDING)}>Price Descending</button>
                <button onClick={() => sortProductsByType(SORT_TYPE.RATING_ASCENDING)}>Rating Ascending</button>
                <button onClick={() => sortProductsByType(SORT_TYPE.RATING_DESCENDING)}>Rating Descending</button>
                <button onClick={() => sortProductsByType(SORT_TYPE.REVIEWS_ASCENDING)}>Reviews Ascending</button>
                <button onClick={() => sortProductsByType(SORT_TYPE.REVIEWS_DESCENDING)}>Reviews Descending</button>
                {allProducts.map(product => (
                    <Product key={product.id} product={product} />
                ))}
            </div>
        </>
    )
}