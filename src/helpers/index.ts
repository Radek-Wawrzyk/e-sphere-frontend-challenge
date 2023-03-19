const generateUuid = () => Math.random().toString().slice(2);
const getFormattedPrice = (price = 0, radix = 2, currency = '$') =>
  `${currency}${price.toFixed(radix)}`;

const getPriceAfterDiscount = (price = 0, discountPercentage = 0) =>
  price - price * (discountPercentage / 100);

export { generateUuid, getFormattedPrice, getPriceAfterDiscount };
