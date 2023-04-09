import React, { Component } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  addProductToCart,
  deleteProductFromCart,
  readShoppingCart,
  removeProductFromCart,
} from "../services/localStorage";

import "../style/ShoppingCart.css";

import emptyCart from "../assets/empty-cart.png";
import logo from "../assets/logo.svg";

export default class ShoppingCart extends Component {
  state = {
    cartProducts: [],
    shoppingCartSize: "",
  };

  componentDidMount() {
    const data = readShoppingCart();
    this.setState({
      cartProducts: data,
      shoppingCartSize: localStorage.getItem("shoppingCartSize"),
    });
  }

  // aumenta a quantidade de um produto no carrinho e atualiza o state
  increaseItemQuantity = (product) => {
    if (product.quantity >= product.available_quantity) {
      Swal.fire({
        confirmButtonColor: '#068dc3',
        text: "Sem estoque!",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    addProductToCart(product);
    const newData = readShoppingCart();
    this.setState({
      cartProducts: newData,
      shoppingCartSize: localStorage.getItem("shoppingCartSize"),
    });
  };

  // diminui a quantidade de um produto no carrinho e atualiza o state
  decreaseItemQuantity = (product) => {
    if (product.quantity === 1) {
      return;
    }
    removeProductFromCart(product);
    const newData = readShoppingCart();
    this.setState({
      cartProducts: newData,
      shoppingCartSize: localStorage.getItem("shoppingCartSize"),
    });
  };

  // remove completamente um produto do carrinho e atualiza o state
  removeItemFromCart = (product) => {
    deleteProductFromCart(product);
    const newData = readShoppingCart();
    this.setState({
      cartProducts: newData,
      shoppingCartSize: localStorage.getItem("shoppingCartSize"),
    });
  };

  render() {
    const { cartProducts, shoppingCartSize } = this.state;

    return (
      <>
        <header className="header">
          <div className="header__container">
            <Link to="/">
              <img src={logo} alt="Logo" className="logo-img" />
            </Link>
          </div>
        </header>
        {cartProducts.length === 0 ? (
          <div className="empty-cart">
            <span>Seu carrinho está vazio</span>
            <img src={emptyCart} alt="Empty Cart" />
          </div>
        ) : (
          <div className="container">
            <div className="shopping-cart">
              <h2>Carrinho de compras</h2>
              {cartProducts.map((product) => (
                <div className="shopping-cart__product-card" key={product.id}>
                  <div className="shopping-cart__product-card__image">
                    <img src={product.thumbnail} alt={product.title} />
                  </div>
                  <div className="shopping-cart__product-card__info">
                    <h3>{product.title}</h3>
                    <button
                      onClick={() => this.removeItemFromCart(product)}
                      type="button"
                    >
                      Excluir
                    </button>
                  </div>
                  <div className="shopping-cart__product-card__quantity">
                    <div className="add-rmv-buttons">
                      <button
                        onClick={() => this.decreaseItemQuantity(product)}
                        type="button"
                        className={
                          product.quantity === 1
                            ? "rmv-button-disabled "
                            : undefined
                        }
                      >
                        <FaMinus size={8} />
                      </button>
                      <span>{product.quantity}</span>
                      <button
                        onClick={() => this.increaseItemQuantity(product)}
                        type="button"
                      >
                        <FaPlus size={8} />
                      </button>
                    </div>
                    <div className="available-quantity">
                      <span>
                        {product.available_quantity}{" "}
                        {product.available_quantity === 1
                          ? "disponível"
                          : "disponíveis"}
                      </span>
                    </div>
                  </div>
                  <div className="shopping-cart__product-card__price">
                    <span>
                      {(product.price * product.quantity).toLocaleString(
                        "pt-br",
                        {
                          style: "currency",
                          currency: "BRL",
                        }
                      )}
                    </span>
                  </div>
                </div>
              ))}
              <div className="shopping-cart__subtotal">
                <span>
                  Subtotal &#40;{shoppingCartSize}{" "}
                  {shoppingCartSize === 1 ? "item" : "itens"}
                  &#41;:{" "}
                  <span>
                    {cartProducts
                      .reduce(
                        (accumulator, product) =>
                          accumulator + product.price * product.quantity,
                        0
                      )
                      .toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}
                  </span>
                </span>
              </div>
              <div className="shopping-cart__checkout-button">
                <Link to="/checkout">
                  <button type="button">Finalizar compra</button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
