import React, { useRef } from 'react';

const Search = (props) => {
    const searchPattern = useRef(null);
    let productName;

    const checkName = () => {
        productName = searchPattern.current.value;
        props.searchForProducts(productName);
    }

    return (
        <div>
            <label htmlFor="search">Search for a product:</label>
            <input ref={searchPattern} type="text" name="search"/>
            <button onClick={checkName}>Search</button>
        </div>
    )
}

export default Search;