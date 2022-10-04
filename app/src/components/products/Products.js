import React from 'react';
import Filters from "../filters/filters";
import Search from "../search/Search";

const Products = (props) => {
    const products = props.products;


    return (
        <div>
            <h2 className="products-title">Products</h2>
            <Search products={products} searchForProducts={props.searchForProducts}/>
            <Filters products={products} filtrProducts={props.filtrProducts} categories={props.categories}/>
            <div className="products">
                {products.map((product) => {
                    return <div className="product" key={product.id}>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>{product.promoPrice ? `Cena promocyjna: ${product.promoPrice}PLN` : `Cena: ${product.price}OLN`}</p>
                        <button onClick={() => props.setCart(product)} className="btn">Add to cart</button>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Products;