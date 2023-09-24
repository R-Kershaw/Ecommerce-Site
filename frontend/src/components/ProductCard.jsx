import star from '../assets/icons8-rating-64.png';

//needs a picture, title, and price, and onClick function
//"https://img.icons8.com/cotton/64/rating.png
export default function ProductCard({ product, onClick }) {
    const { title, image, price, rating } = product;
    return (
        <div className="rounded-lg my-2 w-56 bg-blue-100 border-gray-600 shadow-md overflow-hidden relative hover:shadow-lg cursor-pointer" onClick={onClick}>
            <img className="h-40 sm:h-48 w-full object-cover" src={image} />
            <h1 className="font-bold m-2">{title}</h1>
            <div className="grid grid-cols-8  justify-start">
                <img className="w-5 h-5 inline-block" src={star} alt="rating" />

                <span className="">{parseFloat(rating.rate).toFixed(2)}</span>
            </div>
            <p className="font-bold m-2">${parseFloat(price).toFixed(2)}</p>
        </div>
    )
}
