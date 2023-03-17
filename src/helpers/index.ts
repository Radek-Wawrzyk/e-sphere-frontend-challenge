const generateUuid = () => Math.random().toString().slice(2);
const getFormattedPrice = (price: number = 0, radix: number = 2, currency = '$') => `$${price.toFixed(radix)}`;

export { generateUuid, getFormattedPrice };
