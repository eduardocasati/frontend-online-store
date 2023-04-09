import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { getProductById } from "../services/api";
import {
  addProductToCart,
  readProductReviews,
  saveProductReviews,
} from "../services/localStorage";

import "../style/ProductDetails.css";

import logo from "../assets/logo.svg";

import ShoppingCartButton from "../components/ShoppingCartButton";

export default class ProductDetails extends Component {
  state = {
    productDetails: [],
    inputEmail: "",
    inputRadio: "",
    inputDetail: "",
    invalidInfo: false,
    reviewProduct: [],
    shoppingCartSize: "",
    productPictures: [],
    picturesIndex: 0,
    freeShipping: "",
  };

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const data = await getProductById(id);
    const productReview = readProductReviews(id);

    this.setState({
      productDetails: data,
      reviewProduct: productReview || [],
      shoppingCartSize: localStorage.getItem("shoppingCartSize"),
      productPictures: data.pictures,
      freeShipping: data.shipping.free_shipping,
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [ name ]: value,
    });
  };

  picturesNavigation = (index) => {
    this.setState({
      picturesIndex: index,
    });
  };

  addProduct = (product) => {
    addProductToCart(product);
    this.setState({
      shoppingCartSize: localStorage.getItem("shoppingCartSize"),
    });
  };

  validateForm = () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const { inputEmail, inputRadio, inputDetail, invalidInfo } = this.state;
    const emailFormat = /^\S+@\S+\.\S+$/;
    if (!inputEmail.match(emailFormat) || inputRadio === "") {
      return this.setState({ invalidInfo: true });
    }
    this.setState({ invalidInfo: false });
    if (invalidInfo === false) {
      saveProductReviews(id, {
        email: inputEmail,
        text: inputDetail,
        rating: inputRadio,
      });
      const productReview = readProductReviews(id);
      this.setState({
        inputEmail: "",
        inputDetail: "",
        inputRadio: "",
        reviewProduct: productReview,
      });
    }
  };

  render() {
    const {
      productDetails,
      inputDetail,
      inputEmail,
      invalidInfo,
      reviewProduct,
      shoppingCartSize,
      productPictures,
      picturesIndex,
      freeShipping,
    } = this.state;
    return (
      <>
        <header className="header">
          <div className="header__container">
            <Link to="/">
              <img src={logo} alt="Logo" className="logo-img" />
            </Link>
            <ShoppingCartButton shoppingCartSize={shoppingCartSize} />
          </div>
        </header>
        <div className="container">
          <div className="product-details">
            <div className="product-details__picture">
              {productPictures.map((picture, index) => (
                <img
                  key={index}
                  src={picture.url}
                  alt={`${productDetails.title} ${index}`}
                  className={
                    picturesIndex === index ? "active-picture" : undefined
                  }
                />
              ))}
              <div className="product-details__picture__index-nav">
                {/* O filter limita a quantidade de imagens que aparecerão na tela
                para caso a API retorne mais imagens do que cabem no layout */}
                {productPictures
                  .filter((picture, index) => index < 8)
                  .map((picture, index) => (
                    <img
                      key={index}
                      src={picture.url}
                      alt={`${productDetails.title} ${index} Thumbnail`}
                      onMouseEnter={() => this.picturesNavigation(index)}
                      // onClick para habilitar a navegação mobile
                      onClick={() => this.picturesNavigation(index)}
                      className={
                        picturesIndex === index ? "selected-picture" : undefined
                      }
                    />
                  ))}
              </div>
            </div>
            <div className="product-details__info-box">
              <h2>{productDetails.title}</h2>
              <span className="product-details__info-box__price">
                {productDetails.original_price !== null &&
                  productDetails.price < productDetails.original_price && (
                    <span className="product-details__info-box__price--original">
                      {productDetails.original_price.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  )}
                {productDetails.price ? (
                  productDetails.price.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })
                ) : (
                  <span className="price-not-set">Preço a combinar</span>
                )}
                {productDetails.original_price !== null &&
                  productDetails.price < productDetails.original_price && (
                    <span className="product-details__info-box__price--off">
                      {(
                        ((productDetails.original_price -
                          productDetails.price) *
                          100) /
                        productDetails.original_price
                      ).toFixed(0)}
                      % OFF
                    </span>
                  )}
              </span>
              {freeShipping && (
                <span className="product-details__free-shipping">
                  Frete grátis!
                </span>
              )}
              <div className="product-details__additional-info">
                <span>Estoque: {productDetails.available_quantity}</span>
                <span>Vendidos: {productDetails.sold_quantity}</span>
                <span>{productDetails.warranty}</span>
              </div>
              <button
                onClick={() => this.addProduct(productDetails)}
                type="button"
              >
                Adicionar ao carrinho
              </button>
            </div>
          </div>
          <div className="product-details__ratings">
            <h2>Opiniões sobre o produto</h2>
            <div className="product-details__ratings__container">
              {reviewProduct.length > 0 &&
                reviewProduct.map((review, index) => (
                  <div key={index} className="rating__card">
                    <span className="rating__card__email">{review.email}</span>
                    <span className="rating__card__stars">
                      <StarRatings
                        rating={Number(review.rating)}
                        starDimension="16px"
                        starSpacing="1px"
                        starRatedColor="#068dc3"
                      />
                    </span>
                    <p className="rating__card__review">{review.text}</p>
                  </div>
                ))}
            </div>
            <div className="product-details__form">
              <h3>Deixe sua avaliação</h3>
              <input
                value={inputEmail}
                onChange={this.handleChange}
                type="email"
                name="inputEmail"
                id="inputEmail"
                placeholder="Email"
                className="product-details__form__email"
              />
              <div className="product-details__form__rating">
                <span>Nota:</span>
                <input
                  onChange={this.handleChange}
                  value="1"
                  type="radio"
                  name="inputRadio"
                  id="inputRadio"
                />
                <input
                  onChange={this.handleChange}
                  value="2"
                  type="radio"
                  name="inputRadio"
                  id="inputRadio"
                />
                <input
                  onChange={this.handleChange}
                  value="3"
                  type="radio"
                  name="inputRadio"
                  id="inputRadio"
                />
                <input
                  onChange={this.handleChange}
                  value="4"
                  type="radio"
                  name="inputRadio"
                  id="inputRadio"
                />
                <input
                  onChange={this.handleChange}
                  value="5"
                  type="radio"
                  name="inputRadio"
                  id="inputRadio"
                />
              </div>
              <textarea
                value={inputDetail}
                onChange={this.handleChange}
                name="inputDetail"
                id="inputDetail"
                placeholder="Mensagem (opcional)"
                maxlength="600"
              />
              {invalidInfo && (
                <span className="product-details__form__invalid-info">
                  Por favor informe o email e dê uma nota.
                </span>
              )}
              <button onClick={this.validateForm} type="button">
                Enviar
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape(
    PropTypes.shape(PropTypes.number.isRequired).isRequired
  ).isRequired,
};
