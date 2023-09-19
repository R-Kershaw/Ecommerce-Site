//needs a picture, title, and price, and onClick function
export default function ProductCard({ product, onClick }) {
    const { title, image, price } = product;
    return (
        <div onClick={onClick}>
            <h1>{title}</h1>
            <img src={image} />
            <p>{price}</p>
        </div>
    )
}