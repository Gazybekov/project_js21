// функция для получения данных из хранилища под ключом cart
export const getLocalStorage = () => {
  const cart = localStorage.getItem("cart");
  return cart;
};
