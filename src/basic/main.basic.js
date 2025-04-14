import { createElement } from './utils/index.js';
import { updateProductOptions } from './components/index.js';
import { calculateCartSummary } from './cart/index.js';
import { randomSale, suggestProduct } from './promotion/index.js';

const products = [
  { id: 'p1', name: '상품1', price: 10000, quantity: 50 },
  { id: 'p2', name: '상품2', price: 20000, quantity: 30 },
  { id: 'p3', name: '상품3', price: 30000, quantity: 20 },
  { id: 'p4', name: '상품4', price: 15000, quantity: 0 },
  { id: 'p5', name: '상품5', price: 25000, quantity: 10 },
];

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

  calculateCartSummary(total, cartItemsContainer, products, stockInfo);

  // 번개세일
  randomSale(products);

  // 재고 업데이트
  suggestProduct(lastSelectedItem, products);
};

main();

addButton.addEventListener('click', () => {
  const selectItem = select.value;

  const itemToAdd = products.find(product => {
    return product.id === selectItem;
  });

  if (itemToAdd && itemToAdd.quantity > 0) {
    const item = document.querySelector(`#${itemToAdd.id}`);

    if (item) {
      const newQty =
        parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;

      if (newQty <= itemToAdd.quantity) {
        item.querySelector('span').textContent =
          `${itemToAdd.name} - ${itemToAdd.price}원 x ${newQty}`;

        itemToAdd.quantity--;
      } else {
        alert('재고가 부족합니다.');
      }
    } else {
      const newItem = createElement('div', {
        id: itemToAdd.id,
        className: 'flex justify-between items-center mb-2',
      });

      newItem.innerHTML =
        '<span>' +
        itemToAdd.name +
        ' - ' +
        itemToAdd.price +
        '원 x 1</span><div>' +
        '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
        itemToAdd.id +
        '" data-change="-1">-</button>' +
        '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
        itemToAdd.id +
        '" data-change="1">+</button>' +
        '<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="' +
        itemToAdd.id +
        '">삭제</button></div>';

      cartItemsContainer.appendChild(newItem);

      itemToAdd.quantity--;
    }

    calculateCartSummary(total, cartItemsContainer, products, stockInfo);

    lastSelectedItem = selectItem;
  }
});

cartItemsContainer.addEventListener('click', event => {
  const tgt = event.target;

  if (
    tgt.classList.contains('quantity-change') ||
    tgt.classList.contains('remove-item')
  ) {
    const productId = tgt.dataset.productId;
    const itemElem = document.querySelector(`#${productId}`);

    const prod = products.find(product => {
      return product.id === productId;
    });

    if (tgt.classList.contains('quantity-change')) {
      const qtyChange = parseInt(tgt.dataset.change);
      const newQty =
        parseInt(itemElem.querySelector('span').textContent.split('x ')[1]) +
        qtyChange;

      if (
        newQty > 0 &&
        newQty <=
          prod.quantity +
            parseInt(itemElem.querySelector('span').textContent.split('x ')[1])
      ) {
        itemElem.querySelector('span').textContent =
          itemElem.querySelector('span').textContent.split('x ')[0] +
          'x ' +
          newQty;
        prod.quantity -= qtyChange;
      } else if (newQty <= 0) {
        itemElem.remove();
        prod.quantity -= qtyChange;
      } else {
        alert('재고가 부족합니다.');
      }
    } else if (tgt.classList.contains('remove-item')) {
      const remQty = parseInt(
        itemElem.querySelector('span').textContent.split('x ')[1]
      );

      prod.quantity += remQty;
      itemElem.remove();
    }

    calculateCartSummary(total, cartItemsContainer, products, stockInfo);
  }
});
