import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  // + quantity and totalPrice
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action) {
      //PAYLOAD = ITEM
      const item = state.cart.find((pizza) => pizza.id === action.payload.id);
      if (state.cart.includes(item)) {
        item.quantity += 1;
        item.totalPrice = item.quantity * item.unitPrice;
      } else state.cart.push(action.payload);
    },
    removeProduct(state, action) {
      //PAYLOAD = PRODUCT ID
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    increaseProductQuantity(state, action) {
      //PAYLOAD = PRODUCT ID
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseProductQuantity(state, action) {
      //PAYLOAD = PRODUCT ID
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      if (item.quantity === 0)
        cartSlice.caseReducers.removeProduct(state, action);
    },
    /*eslint-disable no-unused-vars */
    clearCart(state, _) {
      state.cart = [];
    },
  },
});

export const {
  addProduct,
  removeProduct,
  increaseProductQuantity,
  decreaseProductQuantity,
  clearCart,
} = cartSlice.actions; //action creators
export default cartSlice.reducer;

//Selector functions
export const getCart = (state) => state.cart.cart;

export const getTotalPrice = (state) =>
  state.cart.cart.reduce((acc, pizza) => acc + pizza.totalPrice, 0);

export function getCurrentCartItemQuantityById(id) {
  return (state) => {
    const item = state.cart.cart.find((item) => item.id === id);
    if (!item)
      return 0; //Quantity of item if not found in cart
    else return item.quantity;
  };
}
