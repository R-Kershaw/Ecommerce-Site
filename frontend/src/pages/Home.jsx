import { getAllCategories, getAllProducts, getProductsInCategory } from "../api";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Home() {
    const [allProducts, setAllProducts] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedCategory, setSelectedCategory] = useState("default");
    const [selectedSort, setSelectedSort] = useState("default");
    const [selectedFilter, setSelectedFilter] = useState("default");
    const [filterMin, setFilterMin] = useState(0);
    const [filterMax, setFilterMax] = useState(0);

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
        PRICE_0_25: 'price_0_25',
        PRICE_25_50: 'price_25_50',
        PRICE_50_100: 'price_50_100',
        PRICE_100_200: 'price_100_200',
        PRICE_200_PLUS: 'price_200_PLUS',
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

    useEffect(() => {
        sortProductsByType(selectedSort);
    }, [selectedSort]);

    useEffect(() => {
        console.log(filterMin, filterMax);
        console.log(allProducts.filter(product => product.category === selectedCategory && product.price >= filterMin && product.price <= filterMax));
        filterProductsByType(selectedFilter);
    }, [selectedFilter]);

    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
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
                break;
        }
        setAllProducts(sortedProducts);
    }

    //filter by price, rating, and review count based on a min and max value
    /*    function filterProductsByType(type, min, max) {
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
                    break;
            }
            setAllProducts(filteredProducts);
            console.log(filteredProducts);
        }
        function filterProductsByType(type) {
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
                    break;
            }
            setAllProducts(filteredProducts);
            console.log(filteredProducts);
        }*/

    function filterProductsByType(type) {
        console.log('entered');
        switch (type) {
            case FILTER_TYPE.PRICE_0_25:
                setFilterMin(0);
                setFilterMax(25);
                break;
            case FILTER_TYPE.PRICE_25_50:
                setFilterMin(25);
                setFilterMax(50);
                break;
            case FILTER_TYPE.PRICE_50_100:
                setFilterMin(50);
                setFilterMax(100);
                break;
            case FILTER_TYPE.PRICE_100_200:
                setFilterMin(100);
                setFilterMax(200);
                break;
            case FILTER_TYPE.PRICE_200_PLUS:
                setFilterMin(200);
                setFilterMax(Number.MAX_SAFE_INTEGER);
                break;
            default:
                setFilterMin(0);
                setFilterMax(Number.MAX_SAFE_INTEGER);
                break;
        }
    }

    return (
        <>
            <div className="m-2">
                <div className="m-1 grid grid-cols-8 gap-x-2 gap-y-4">
                    <select className="col-span-3 capitalize border bg-trf-50 font-bold py-2 px-2 rounded shadow-md"
                        value={selectedCategory}
                        onChange={(e) => { setSelectedCategory(e.target.value) }}>
                        <option value="default"> category: all</option>
                        {allCategories.map((category) =>
                            <option value={category}>
                                {category}
                            </option>)}
                    </select>
                </div>

                <div className="m-1 grid grid-cols-8 gap-x-2 gap-y-4">
                    <select className="col-span-3 capitalize border bg-trf-50 font-bold py-2 px-2 rounded shadow-md"
                        value={selectedSort}
                        onChange={(e) => { setSelectedSort(e.target.value) }}>
                        <option value="default"> sort by: all</option>
                        <option value={SORT_TYPE.PRICE_ASCENDING}> Price Ascending</option>
                        <option value={SORT_TYPE.PRICE_DESCENDING}> Price Descending</option>
                        <option value={SORT_TYPE.RATING_ASCENDING}> Rating Ascending</option>
                        <option value={SORT_TYPE.RATING_DESCENDING}> Rating Descending</option>
                        <option value={SORT_TYPE.REVIEWS_ASCENDING}> Review Count Ascending</option>
                        <option value={SORT_TYPE.REVIEWS_DESCENDING}> Review Count Descending</option>
                    </select>
                </div>

                <div className="m-1 grid grid-cols-8 gap-x-2 gap-y-4">
                    <select className="col-span-3 capitalize border bg-trf-50 font-bold py-2 px-2 rounded shadow-md"
                        value={selectedFilter}
                        onChange={(e) => { setSelectedFilter(e.target.value) }}>
                        <option value="default"> filter by: none</option>
                        <option value={FILTER_TYPE.PRICE_0_25}> Under $25</option>
                        <option value={FILTER_TYPE.PRICE_25_50}> $25 to $50</option>
                        <option value={FILTER_TYPE.PRICE_50_100}> $50 to $100</option>
                        <option value={FILTER_TYPE.PRICE_100_200}> $100 to $200</option>
                        <option value={FILTER_TYPE.PRICE_200_PLUS}> $200 & Above</option>
                    </select>
                </div>

                <div className="my-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4">
                    {/*allProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))*/}
                    {selectedCategory !== 'default' && selectedFilter !== 'default' //if the category and filter are both selected
                        ? allProducts.filter(product => product.category === selectedCategory && product.price >= filterMin && product.price <= filterMax).map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))
                        : selectedCategory !== 'default' //if the category is selected only
                            ? allProducts.filter(product => product.category === selectedCategory).map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))
                            : selectedFilter !== 'default' //if the filter is set only
                                ? allProducts.filter(product => product.price >= filterMin && product.price <= filterMax).map(product => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                    />))
                                : //default condition when no category or filter is selected
                                allProducts.map(product => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                    />))
                    }
                </div>
            </div>
        </>
    )
}