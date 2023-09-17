//needs a picture, title, and price
export default function Product({ product }) {
    const {title, image, price} = product;
    return (
        <div>
            <h1>{title}</h1>
            <img src={image}></img>
            <p>{price}</p>
        </div>
    )
}