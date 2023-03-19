const generateUuid = () => Math.random().toString().slice(2);
const getFormattedPrice = (price = 0, radix = 2, currency = '$') =>
  `${currency}${price.toFixed(radix)}`;

export { generateUuid, getFormattedPrice };
