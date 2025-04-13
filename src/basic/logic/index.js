export const updateSelOpts = (select, products) => {
  select.innerHTML = '';

  products.forEach(item => {
    const opt = document.createElement('option');
    opt.value = item.id;

    opt.textContent = item.name + ' - ' + item.price + '원';

    if (item.quantity === 0) {
      opt.disabled = true;
    }
    select.appendChild(opt);
  });
};

export const calcCart = (total, cartItemsContainer, products, stockInfo) => {
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
    const span = document.createElement('span');
    span.className = 'text-green-500 ml-2';
    span.textContent = '(' + (discountRate * 100).toFixed(1) + '% 할인 적용)';
    total.appendChild(span);
  }

  updateStockInfo(products, stockInfo);
  renderbonusPoints(total, totalAmount);
};

const renderbonusPoints = (total, totalAmount) => {
  const bonusPoints = Math.floor(totalAmount / 1000);

  let ptsTag = document.getElementById('loyalty-points');

  if (!ptsTag) {
    ptsTag = document.createElement('span');
    ptsTag.id = 'loyalty-points';
    ptsTag.className = 'text-blue-500 ml-2';
    total.appendChild(ptsTag);
  }

  ptsTag.textContent = '(포인트: ' + bonusPoints + ')';
};

const updateStockInfo = (products, stockInfo) => {
  let infoMsg = '';

  products.forEach(item => {
    if (item.quantity < 5) {
      infoMsg +=
        item.name +
        ': ' +
        (item.quantity > 0
          ? '재고 부족 (' + item.quantity + '개 남음)'
          : '품절') +
        '\n';
    }
  });

  stockInfo.textContent = infoMsg;
};
