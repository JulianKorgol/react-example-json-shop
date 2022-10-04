import React, {useEffect, useRef} from 'react';
import './Cart.css';

const Cart = (props) => {
    const cart = props.cart;
    const inputRef = useRef(null);
    let discount = 0;

    const [totalPrice, setTotalPrice] = React.useState(0);
    const [totalPriceWithOutDiscount, setTotalPriceWithOutDiscount] = React.useState(0);

    const productsToDisplay = {};

    const eachProduct = () => {
        let t = 0;
        cart.forEach((product) => {
            if (productsToDisplay[product.id]) {
                productsToDisplay[product.id].count += 1;
                t += (product.promoPrice ? product.promoPrice : product.price);
            } else {
                productsToDisplay[product.id] = product;
                productsToDisplay[product.id].count = 1;
                t += (product.promoPrice ? product.promoPrice : product.price);
            }
        });
        return t;
    }

    eachProduct();

    const DiscountedCart = () => {
        if (inputRef.current.value === '123') {
            discount = 10;
        }
        discount /= 100;
        setTotalPrice(totalPriceWithOutDiscount - (totalPriceWithOutDiscount * discount));
    }

    useEffect(() => {
        setTotalPrice(cart.reduce((acc, item) => acc + (item.promoPrice ? item.promoPrice : item.price), 0))
        setTotalPriceWithOutDiscount(totalPrice);
    }, [])

    useEffect(() => {
        setTotalPrice(eachProduct());
        setTotalPriceWithOutDiscount(totalPrice);
    }, [cart]);

    return (
        <div className="cart">
            <h2>Cart</h2>
            {Object.keys(productsToDisplay).map((item, index) => {
                return <div key={index} className="product">
                    <p>{productsToDisplay[item].name}</p>
                    <p>Price: {productsToDisplay[item].promoPrice ? productsToDisplay[item].promoPrice : productsToDisplay[item].price}</p>
                    <p>Product quantity: {productsToDisplay[item].count}</p>
                    <button onClick={() => props.deleteProduct(productsToDisplay[item].id)}>Delete</button>
                </div>
            })}
            <p>Total price: {totalPrice} PLN</p>
            <p>You will save on these purchases: {cart.reduce((acc, item) => acc + (item.promoPrice ? item.price - item.promoPrice : item.price), 0)} PLN</p>
            <div>
                <input ref={inputRef} type="text" placeholder="Discount" />
                <button type="submit" onClick={DiscountedCart}>Discount</button>
            </div>
            <button onClick={props.clearCart} className="clearCartButton">Clear Cart</button>
        </div>
    )
};

export default Cart;