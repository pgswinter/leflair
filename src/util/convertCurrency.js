import currency from 'currency.js';

export const USD = value => currency(value, { symbol: "$", precision: 2 });
export const JPY = value => currency(value, { symbol: "¥", precision: 0 });
export const GAS = value => currency(value, { precision: 3 });