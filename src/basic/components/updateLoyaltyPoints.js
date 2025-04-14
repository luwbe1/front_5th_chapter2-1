import { createElement } from '../utils/index.js';

export const applyLoyaltyPoints = (total, totalAmount) => {
  const bonusPoints = Math.floor(totalAmount / 1000);

  let ptsTag = document.querySelector('#loyalty-points');

  if (!ptsTag) {
    ptsTag = createElement('span', {
      id: 'loyalty-points',
      className: 'text-blue-500 ml-2',
    });

    total.appendChild(ptsTag);
  }

  ptsTag.textContent = `(포인트: ${bonusPoints})`;
};
