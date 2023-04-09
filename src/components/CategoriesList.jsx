import PropTypes from "prop-types";
import React, { Component } from "react";
import { MdClose } from 'react-icons/md';
import { Link } from "react-scroll";

import "../style/CategoriesList.css";

export default class CategoriesList extends Component {
  render() {
    const { categoriesList, searchProductsByCategory, showCategoriesList, toggleCategoriesList } =
      this.props;
    return (
      <div
        className={
          !showCategoriesList ? "categories hide-categories" : "categories"
        }
      >
        <h3>Categorias</h3>
        <MdClose onClick={toggleCategoriesList} size={38} className="close-categories-button" />
        <ul className="categories__list">
          {categoriesList.map((category) => (
            <li key={category.id}>
              <Link to="header" smooth={true} delay={500}>
                <button
                  value={category.id}
                  onClick={searchProductsByCategory}
                  name="categoryInput"
                  id="categoryInput"
                  type="button"
                >
                  {category.name}
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

CategoriesList.propTypes = {
  categoriesList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  searchProductsByCategory: PropTypes.func.isRequired,
  showCategoriesList: PropTypes.bool.isRequired,
  toggleCategoriesList: PropTypes.func.isRequired,
};
