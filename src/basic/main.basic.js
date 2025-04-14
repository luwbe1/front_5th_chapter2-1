import { createElement } from './utils/index.js';
import { updateProductOptions } from './components/index.js';
import { calculateCartSummary } from './cart/index.js';
import { randomSale, suggestProduct } from './promotion/index.js';
import { products } from './data/products.js';
import { handleAddToCart, handleCartItemClick } from './cart/index.js';

let select, addButton, cartItemsContainer, total, stockInfo, lastSelectedItem;

const main = () => {
  const root = document.querySelector('#app');
  const cont = createElement('div', {
    className: 'bg-gray-100 p-8',
  });
  const wrap = createElement('div', {
    className:
      'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8',
  });
  const hyperText = createElement('h1', {
    className: 'text-2xl font-bold mb-4',
    text: '장바구니',
  });

  cartItemsContainer = createElement('div', {
    id: 'cart-items',
  });
  total = createElement('div', {
    id: 'cart-total',
    className: 'text-xl font-bold my-4',
  });
  select = createElement('select', {
    id: 'product-select',
    className: 'border rounded p-2 mr-2',
  });
  addButton = createElement('button', {
    id: 'add-to-cart',
    className: 'bg-blue-500 text-white px-4 py-2 rounded',
    text: '추가',
  });
  stockInfo = createElement('div', {
    id: 'stock-status',
    className: 'text-sm text-gray-500 mt-2',
  });

  updateProductOptions(select, products);

  wrap.append(
    hyperText,
    cartItemsContainer,
    total,
    select,
    addButton,
    stockInfo
  );
  cont.appendChild(wrap);
  root.appendChild(cont);

  calculateCartSummary(total, cartItemsContainer.children, products, stockInfo);

  // 번개세일
  randomSale(products);

  // 재고 업데이트
  suggestProduct(lastSelectedItem, products);
};

main();

// 이벤트 리스너에 넘기려면 익명 함수로 감싸야 함
addButton.addEventListener('click', () => {
  handleAddToCart(
    select,
    cartItemsContainer,
    total,
    stockInfo,
    lastSelectedItem,
    products
  );
});

cartItemsContainer.addEventListener('click', event => {
  handleCartItemClick(event, cartItemsContainer, total, stockInfo, products);
});
