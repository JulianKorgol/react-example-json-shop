import React, { useEffect, useState } from 'react';
import './App.css';
import Products from './components/products/Products';
import Cart from './components/cart/Cart';

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  let categories;

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('./products.json');
      const data = await response.json();
      
      setProducts(data.products);
    };
  
    getData();
  }, []);

  const setCartDelegate = (product) => {
    setCart([...cart, product]);
  }

  const clearCartDelegate = () => {
    setCart([]);
  }

  const deleteProduct = (id) => {
    let deleted = false;
    const newCart = [];

    cart.forEach((product) => {
      if (product.id === id && !deleted) {
        deleted = true;
        return;
      }
      newCart.push(product);
    });
    setCart(newCart);
  };

    const getCategories = () => {
        categories = [];
        products.forEach((product) => {
            if (!categories.includes(product.category)) {
            categories.push(product.category);
            }
        });
        return categories
    }

  getCategories();

  const filtrProducts = (category) => {
    if (categories.includes(category)) {
      const filteredProducts1 = products.filter((product) => product.category === category);
      setFilteredProducts(filteredProducts1);
    }
  }

  const searchForProducts = (productName) => {
      const filteredProducts2 = products.filter((product) => product.name === productName);
      console.log(filteredProducts2);
      setFilteredProducts(filteredProducts2);
  }

  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <h1>Shop</h1>
        </div>
        {!!cart.length && <Cart cart={cart} clearCart={clearCartDelegate} deleteProduct={deleteProduct}/>}
        <div className="productsList">
            <Products products={filteredProducts.length ? filteredProducts : products} setCart={setCartDelegate} filtrProducts={filtrProducts} categories={categories} searchForProducts={searchForProducts}/>
        </div>
      </div>
    </div>
  );
}

export default App;
