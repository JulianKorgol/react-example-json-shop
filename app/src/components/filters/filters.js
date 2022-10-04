import React, { useRef } from 'react';

const Filters = (props) => {
    const selectRef = useRef(null);
    let selectedCategory;
    const categories = props.categories;

    const checkCategory = () => {
        selectedCategory = selectRef.current.value;
        props.filtrProducts(selectedCategory);
    }

    return (
        <div>
            <label htmlFor="category">Choose a category:</label>
            <select ref={selectRef} name="category">
                {categories.map((category) => {
                    return <option key={category} value={category}>{category}</option>;
                })};
            </select>
            <button onClick={checkCategory}>Select</button>
        </div>
    )
}

export default Filters;