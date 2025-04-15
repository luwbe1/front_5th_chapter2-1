import { createElement } from './utils/index.js';
import { updateProductOptions } from './components/index.js';
import { calculateCartSummary } from './cart/index.js';
import { randomSale, suggestProduct } from './promotion/index.js';
import { products } from './data/products.js';
import { handleAddToCart, handleCartItemClick } from './cart/index.js';
import { TITLE_TEXT, ADD_BUTTON_TEXT } from './constants/index.js';

let select, addButton, cartItemsContainer, total, stockInfo, lastSelectedItem;

const bindEvents = () => {
  // 장바구니 추가 버튼 클릭 이벤트 처리
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

  // 장바구니 상품 클릭 이벤트 처리
  cartItemsContainer.addEventListener('click', event => {
    handleCartItemClick(event, cartItemsContainer, total, stockInfo, products);
  });
};

const initializeLayout = () => {
  const root = document.querySelector('#app');

  if (!root) {
    console.error('루트가 엘리먼트가 없습니다.');
    return;
  }

  const cont = createElement('div', {
    className: 'bg-gray-100 p-8',
  });
  const wrap = createElement('div', {
    className:
      'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8',
  });
  const hyperText = createElement('h1', {
    className: 'text-2xl font-bold mb-4',
    text: TITLE_TEXT,
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
    text: ADD_BUTTON_TEXT,
  });
  stockInfo = createElement('div', {
    id: 'stock-status',
    className: 'text-sm text-gray-500 mt-2',
  });

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
};

const main = () => {
  // DOM 초기화
  initializeLayout();

  // 장바구니 상품 목록 초기화
  updateProductOptions(select, products);

  calculateCartSummary(total, cartItemsContainer.children, products, stockInfo);

  // 번개세일
  randomSale(lastSelectedItem, products);

  // 재고 업데이트
  suggestProduct(lastSelectedItem, products);

  // 이벤트 바인딩
  bindEvents();
};

main();
