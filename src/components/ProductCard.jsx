import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { MdAddShoppingCart } from "react-icons/md";

import "../style/ProductCard.css";

export default class ProductCard extends Component {
  render() {
    const { productsList, addProduct } = this.props;
    return productsList.map((product) => (
      <div key={product.id} className="products__card">
        <div className="products__card__image">
          <img src={product.thumbnail} alt={product.title} />
        </div>
        <div className="product__card__info">
          <div className="product__card__price">
            {product.original_price !== null &&
              product.price < product.original_price && (
                <span className="original-price">
                  {product.original_price.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              )}
            <span>
              {product.price
                ? product.price.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })
                : <span className="price-not-set">Preço a combinar</span>}
              {product.original_price !== null &&
                product.price < product.original_price && (
                  <span className="promotional-price__off">
                    {(
                      ((product.original_price - product.price) * 100) /
                      product.original_price
                    ).toFixed(0)}
                    % OFF
                  </span>
                )}
            </span>
          </div>
          {product.shipping.free_shipping && (
            <span className="product__card__free-shipping">Frete grátis!</span>
          )}
          <Link to={`/product-details/${product.id}`}>
            <span className="product__card__title">
              {product.title.length > 80
                ? product.title.substring(0, 80) + "..."
                : product.title}
            </span>
          </Link>
        </div>
        <MdAddShoppingCart
          onClick={() => addProduct(product)}
          size={28}
          className="product__card__add-to-cart-icon"
        />
      </div>
    ));
  }
}

ProductCard.propTypes = {
  productsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
    })
  ).isRequired,
  addProduct: PropTypes.func.isRequired,
};
