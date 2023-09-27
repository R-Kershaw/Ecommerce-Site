import { useNavigate } from "react-router-dom";
import star from '../assets/icons8-rating-64.png';

//needs a picture, title, and price, and onClick function
//"https://img.icons8.com/cotton/64/rating.png
export default function ProductCard({ product }) {
    const navigate = useNavigate();
    const { title, image, price, rating } = product;
    return (
        <div className="rounded-lg my-2 w-56 border bg-trf-50  shadow-md overflow-hidden relative hover:shadow-lg cursor-pointer"
            onClick={() => navigate(`/productDetails/${product.id}`)}>
            <img className="h-40 sm:h-48 w-full object-fill" src={image} />
            <div className="m-2">
                <h1 className="font-bold m-2">{title}</h1>
                <div className="">
                    <img className="w-5 h-5 p-1 inline-block" src={star} alt="rating" />
                    <span className="m-1 p-1">{parseFloat(rating.rate).toFixed(2)}</span>
                    <span className="m-1 p-1">{rating.count} ratings</span>
                </div>
                <p className="font-bold m-2">${parseFloat(price).toFixed(2)}</p>
            </div>
        </div>
    )
}
