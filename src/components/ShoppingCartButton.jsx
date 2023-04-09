import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { MdOutlineShoppingCart } from "react-icons/md";

import "../style/ShoppingCartButton.css";

export default class ShoppingCartButton extends Component {
  render() {
    const { shoppingCartSize } = this.props;
    return (
      <Link to="/shoppingcart">
        <button type="button" className="shopping-cart-button">
          <MdOutlineShoppingCart size={34} className="shopping-cart-button__cart-icon" />{" "}
          {shoppingCartSize > 0 && (
            <span className="shopping-cart-button__item-quantity">
              {shoppingCartSize}
            </span>
          )}
        </button>
      </Link>
    );
  }
}

ShoppingCartButton.propTypes = {
  shoppingCartSize: PropTypes.string.isRequired,
};
