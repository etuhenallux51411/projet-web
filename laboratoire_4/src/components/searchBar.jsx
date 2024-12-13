import React, { useState } from 'react';
import '../assets/style/searchBarStyle.css';
function SearchBar({ placeholder, onSearch }) {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        setQuery(e.target.value);
        onSearch(e.target.value); // Appelle une fonction parent pour gérer les résultats
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder={placeholder || "Rechercher..."}
                className="search-input"
            />
        </div>
    );
}

export default SearchBar;