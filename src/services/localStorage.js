const SHOPPING_CART_KEY = 'products';

// Verifica se a chave 'products' existe no localStorage, caso contrário, cria a chave 'products' vazia
if (!JSON.parse(localStorage.getItem(SHOPPING_CART_KEY))) {
  localStorage.setItem(SHOPPING_CART_KEY, JSON.stringify([]));
}

if (!JSON.parse(localStorage.getItem('shoppingCartSize'))) {
  localStorage.setItem('shoppingCartSize', JSON.stringify(0));
}

// Lê os itens no carrinho
export const readShoppingCart = () => JSON.parse(localStorage.getItem(SHOPPING_CART_KEY));

// Salva os itens no carrinho
const saveShoppingCart = (products) => localStorage
  .setItem(SHOPPING_CART_KEY, JSON.stringify(products));

// Salva quantos produtos tem no carrinho
export const saveShoppingCartSize = () => {
  const products = readShoppingCart();
  const totalProducts = products
    .reduce((accumulator, product) => accumulator + product.quantity, 0);
  localStorage.setItem('shoppingCartSize', JSON.stringify(totalProducts));
};

// ============================================
// FUNÇÕES QUE MANIPULAM O CARRINHO DE COMPRAS:
// ============================================

// Adiciona um produto no carrinho
export const addProductToCart = (product) => {
  const products = readShoppingCart();
  // Se o produto já existe no localStorage, a função aumenta sua quantidade
  if (products.some((prdct) => (prdct.id === product.id))) {
    const updatedProduct = products.find((prdct) => prdct.id === product.id);
    updatedProduct.quantity += 1;
    const filterProducts = products.filter((prdct) => (prdct.id !== product.id));
    filterProducts.push(updatedProduct);
    localStorage.setItem(SHOPPING_CART_KEY, JSON.stringify(filterProducts));
    saveShoppingCartSize();
    return;
  }
  // Se o produto não existe no localStorage, a função o adiciona
  product.quantity = 1;
  saveShoppingCart([ ...products, product ]);
  saveShoppingCartSize();
};

// Função que remove um produto do carrinho
export const removeProductFromCart = (product) => {
  const products = readShoppingCart();
  // Se o produto já existe no localStorage, a função diminui sua quantidade
  if (products.find((prdct) => prdct.id === product.id)) {
    const filterProducts = products.filter((prdct) => prdct.id !== product.id);
    product.quantity -= 1;
    filterProducts.push(product);
    localStorage.setItem(SHOPPING_CART_KEY, JSON.stringify(filterProducts));
    saveShoppingCartSize();
  }
};

// Remove COMPLETAMENTE um produto do carrinho
export const deleteProductFromCart = (product) => {
  const products = readShoppingCart();
  saveShoppingCart(products.filter((prod) => prod.id !== product.id));
  saveShoppingCartSize();
};

// Limpa o carrinho (esvazia o localStorage)
export const clearShoppingCart = () => {
  localStorage.setItem(SHOPPING_CART_KEY, JSON.stringify([]));
  saveShoppingCartSize();
};

// ======================================================
// FUNÇÕES QUE SALVAM E RECUPERAM OS REVIEWS DOS PRODUTOS:
// ======================================================

// Salva os reviews do produto
export const saveProductReviews = (productId, { email, text, rating }) => {
  if (!JSON.parse(localStorage.getItem(productId))) {
    localStorage.setItem(productId, JSON.stringify([]));
  }
  const productReviews = JSON.parse(localStorage.getItem(productId));
  productReviews.push({ email, text, rating });
  return localStorage.setItem(productId, JSON.stringify(productReviews));
};

// Lê os reviews do produto
export const readProductReviews = (product) => JSON.parse(localStorage.getItem(product));
