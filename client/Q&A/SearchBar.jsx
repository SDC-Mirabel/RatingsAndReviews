import React from 'react';

const SearchBar = () => (
  <div className="search-wrapper">
    <input className="search-bar" type="text" placeholder="Have A Question? Search For Answers..."/>
    <button className="search-bar"><i class="fas fa-search"></i></button>
  </div>
)

export default SearchBar;