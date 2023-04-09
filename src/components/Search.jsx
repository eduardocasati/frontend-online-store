import PropTypes from "prop-types";
import React, { Component } from "react";
import { BsSearch } from "react-icons/bs";
import { MdFilterList } from "react-icons/md";

import "../style/Search.css";

import CategoriesList from "./CategoriesList";

export default class Search extends Component {
  render() {
    const {
      searchInput,
      handleChange,
      onClick,
      toggleCategoriesList,
      showCategoriesList,
      searchProductsByCategory,
      categoriesList,
    } = this.props;
    return (
      <div className="product-search">
        <button
          onClick={toggleCategoriesList}
          className="product-search__categories"
        >
          <MdFilterList
            size={24}
            className={
              showCategoriesList ? "categoriest-list--open" : undefined
            }
          />
          <CategoriesList
            searchProductsByCategory={searchProductsByCategory}
            categoriesList={categoriesList}
            showCategoriesList={showCategoriesList}
            toggleCategoriesList={toggleCategoriesList}
          />
        </button>
        <input
          value={searchInput}
          onChange={handleChange}
          type="text"
          name="searchInput"
          id="searchInput"
          placeholder="Buscar produto"
        />
        <button
          onClick={onClick}
          name="searchClick"
          id="searchClick"
          type="button"
          className="product-search__search"
        >
          <BsSearch size={20} />
        </button>
      </div>
    );
  }
}

Search.propTypes = {
  searchInput: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  toggleCategoriesList: PropTypes.func.isRequired,
  showCategoriesList: PropTypes.bool.isRequired,
  searchProductsByCategory: PropTypes.func.isRequired,
  categoriesList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};
