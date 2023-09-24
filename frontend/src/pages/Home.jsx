import { getAllCategories, getAllProducts, getProductsInCategory, getSingleProduct } from "../api";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
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

    const FILTER_TYPE = {
        PRICE: 'price',
        RATING: 'rating',
        REVIEWS: 'reviews'
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

    //sort by price, rating, and review count
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

    //filter by price, rating, and review count based on a min and max value
    function filterProductsByType(type, min, max) {
        let filteredProducts = [...allProducts];
        switch (type) {
            case FILTER_TYPE.PRICE:
                filteredProducts = [...allProducts].filter((product) => product.price >= min && product.price <= max);
                break;
            case FILTER_TYPE.RATING:
                filteredProducts = [...allProducts].filter((product) => product.rating.rate >= min && product.rating.rate <= max);
                break;
            case FILTER_TYPE.REVIEWS:
                filteredProducts = [...allProducts].filter((product) => product.rating.count >= min && product.rating.count <= max);
                break;
            default:
                throw new Error();
        }
        setAllProducts(filteredProducts);
        console.log(filteredProducts);
    }

    return (
        <>
            <h1>
                Home Page
            </h1>
            <br></br>
            <div >
                <button onClick={() => showProductsInCategory('electronics')}>Electronics</button>
                {/*   
                <button onClick={() => sortProductsByType(SORT_TYPE.PRICE_ASCENDING)}>Price Ascending</button>
                <button onClick={() => sortProductsByType(SORT_TYPE.PRICE_DESCENDING)}>Price Descending</button>
                <button onClick={() => sortProductsByType(SORT_TYPE.RATING_ASCENDING)}>Rating Ascending</button>
                <button onClick={() => sortProductsByType(SORT_TYPE.RATING_DESCENDING)}>Rating Descending</button>
                <button onClick={() => sortProductsByType(SORT_TYPE.REVIEWS_ASCENDING)}>Reviews Ascending</button>
                <button onClick={() => sortProductsByType(SORT_TYPE.REVIEWS_DESCENDING)}>Reviews Descending</button>
                */}
                <button onClick={() => filterProductsByType(FILTER_TYPE.PRICE, 0, 25)}>Filter By Price</button>
                <button onClick={() => filterProductsByType(FILTER_TYPE.RATING, 4, 5)}>Filter By Rating</button>
                <button onClick={() => filterProductsByType(FILTER_TYPE.REVIEWS, 100, 300)}>Filter By Reviews</button>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4">
                    {allProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onClick={() => navigate(`/productDetails/${product.id}`)}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}