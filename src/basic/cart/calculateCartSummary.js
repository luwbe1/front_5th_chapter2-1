import {
  applyLoyaltyPoints,
  updateLowStockNotice,
} from '../components/index.js';
import { createElement } from '../utils/index.js';

const getItemDiscountRate = (itemId, quantity) => {
  if (quantity < 10) return 0;

  switch (itemId) {
    case 'p1':
      return 0.1;
    case 'p2':
      return 0.15;
    case 'p3':
      return 0.2;
    case 'p4':
      return 0.05;
    case 'p5':
      return 0.25;
    default:
      return 0;
  }
};

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

      discount = getItemDiscountRate(currentItem.id, q);

      totalAmount += itemTotal * (1 - discount);
    })();
  }

  let discountRate = 0;
  const bulkDiscount = totalAmount * 0.25;
  const itemDiscount = subTotal - totalAmount;

  if (itemCount >= 30) {
    if (bulkDiscount > itemDiscount) {
      totalAmount = subTotal * (1 - 0.25);
      discountRate = 0.25;
    } else {
      discountRate = itemDiscount / subTotal;
    }
  } else {
    discountRate = itemDiscount / subTotal;
  }

  // 화요일
  const isTuesday = new Date().getDay() === 2;

  if (isTuesday) {
    totalAmount *= 1 - 0.1;
    discountRate = Math.max(discountRate, 0.1);
  }

  total.textContent = `총액: ${Math.round(totalAmount)}원`;

  if (discountRate > 0) {
    const span = createElement('span', {
      className: 'text-green-500 ml-2',
      text: `(${(discountRate * 100).toFixed(1)}% 할인 적용)`,
    });

    total.appendChild(span);
  }

  updateLowStockNotice(products, stockInfo);
  applyLoyaltyPoints(total, totalAmount);
};
