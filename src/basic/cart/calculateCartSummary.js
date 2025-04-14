import {
  applyLoyaltyPoints,
  updateLowStockNotice,
} from '../components/index.js';
import { createElement } from '../utils/index.js';

export const calculateCartSummary = (
  total,
  cartItemsContainer,
  products,
  stockInfo
) => {
  let itemCount = 0,
    totalAmount = 0,
    cartItems = cartItemsContainer.children,
    subTotal = 0;

  for (let i = 0; i < cartItems.length; i++) {
    (() => {
      let currentItem;

      for (let j = 0; j < products.length; j++) {
        if (products[j].id === cartItems[i].id) {
          currentItem = products[j];
          break;
        }
      }

      const q = parseInt(
        cartItems[i].querySelector('span').textContent.split('x ')[1]
      );

      let itemTotal = currentItem.price * q;
      let discount = 0;

      itemCount += q;
      subTotal += itemTotal;

      if (q >= 10) {
        switch (currentItem.id) {
          case 'p1':
            discount = 0.1;
            break;
          case 'p2':
            discount = 0.15;
            break;
          case 'p3':
            discount = 0.2;
            break;
          case 'p4':
            discount = 0.05;
            break;
          case 'p5':
            discount = 0.25;
            break;
          default:
            discount = 0;
        }
      }

      totalAmount += itemTotal * (1 - discount);
    })();
  }

  let discountRate = 0;

  if (itemCount >= 30) {
    const bulkDisc = totalAmount * 0.25;
    const itemDisc = subTotal - totalAmount;

    if (bulkDisc > itemDisc) {
      totalAmount = subTotal * (1 - 0.25);
      discountRate = 0.25;
    } else {
      discountRate = (subTotal - totalAmount) / subTotal;
    }
  } else {
    discountRate = (subTotal - totalAmount) / subTotal;
  }

  if (new Date().getDay() === 2) {
    totalAmount *= 1 - 0.1;
    discountRate = Math.max(discountRate, 0.1);
  }

  total.textContent = '총액: ' + Math.round(totalAmount) + '원';

  if (discountRate > 0) {
    const span = createElement('span', {
      className: 'text-green-500 ml-2',
      text: '(' + (discountRate * 100).toFixed(1) + '% 할인 적용)',
    });

    total.appendChild(span);
  }

  updateLowStockNotice(products, stockInfo);
  applyLoyaltyPoints(total, totalAmount);
};
