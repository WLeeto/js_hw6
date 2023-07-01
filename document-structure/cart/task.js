// Получаем все элементы с классом "product"
const products = document.querySelectorAll('.product');

// Восстанавливаем состояние корзины из локального хранилища при загрузке страницы
window.addEventListener('load', () => {
  const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];

  cartProducts.forEach((cartProduct) => {
    const productId = cartProduct.id;
    const productImage = cartProduct.image;
    const productCount = cartProduct.count;

    const cartProductsContainer = document.querySelector('.cart__products');
    const cartProductElement = document.createElement('div');
    cartProductElement.setAttribute('class', 'cart__product');
    cartProductElement.setAttribute('data-id', productId);
    cartProductElement.innerHTML = `
      <img class="cart__product-image" src="${productImage}">
      <div class="cart__product-count">${productCount}</div>
    `;
    cartProductsContainer.appendChild(cartProductElement);
  });
});

// Для каждого товара добавляем обработчик события на кнопки увеличения/уменьшения количества
products.forEach((product) => {
  const quantityControls = product.querySelector('.product__quantity-controls');
  const quantityValue = product.querySelector('.product__quantity-value');
  const addToCartBtn = product.querySelector('.product__add');

  // Обработчик для увеличения количества товара
  const increaseQuantity = () => {
    let quantity = parseInt(quantityValue.textContent);
    quantityValue.textContent = quantity + 1;
  };

  // Обработчик для уменьшения количества товара
  const decreaseQuantity = () => {
    let quantity = parseInt(quantityValue.textContent);
    if (quantity > 1) {
      quantityValue.textContent = quantity - 1;
    }
  };

  // Обработчик для добавления товара в корзину
  const addToCart = () => {
    const productId = product.getAttribute('data-id');
    const productImage = product.querySelector('.product__image').src;
    const productCount = parseInt(quantityValue.textContent);

    // Проверяем, есть ли уже такой товар в корзине
    const cartProduct = document.querySelector(`.cart__product[data-id="${productId}"]`);
    if (cartProduct) {
      // Если товар уже есть в корзине, увеличиваем его количество
      const cartProductCount = cartProduct.querySelector('.cart__product-count');
      let count = parseInt(cartProductCount.textContent);
      count += productCount;
      cartProductCount.textContent = count;
    } else {
      // Если товара еще нет в корзине, создаем новый элемент
      const cartProductsContainer = document.querySelector('.cart__products');
      const cartProductElement = document.createElement('div');
      cartProductElement.setAttribute('class', 'cart__product');
      cartProductElement.setAttribute('data-id', productId);
      cartProductElement.innerHTML = `
        <img class="cart__product-image" src="${productImage}">
        <div class="cart__product-count">${productCount}</div>
      `;
      cartProductsContainer.appendChild(cartProductElement);
    }

    // Сохраняем состояние корзины в локальное хранилище
    const cartProducts = Array.from(document.querySelectorAll('.cart__product')).map((cartProduct) => ({
      id: cartProduct.getAttribute('data-id'),
      image: cartProduct.querySelector('.cart__product-image').src,
      count: parseInt(cartProduct.querySelector('.cart__product-count').textContent),
    }));
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  };

  // Назначаем обработчики событий на кнопки и добавление в корзину
  quantityControls.addEventListener('click', (event) => {
    if (event.target.classList.contains('product__quantity-control_dec')) {
      decreaseQuantity();
    } else if (event.target.classList.contains('product__quantity-control_inc')) {
      increaseQuantity();
    }
  });

  addToCartBtn.addEventListener('click', addToCart);
});
