import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  cartTotalItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0 && state.cartItems[itemIndex].cartQuantity <= 4) {
        state.cartItems[itemIndex].cartQuantity += 1;
        state.cartTotalItems.push(state.cartItems[itemIndex]);
        toast.info(`Amount of ${state.cartItems[itemIndex].name} increased`, {
          position: "bottom-left",
        });
      } else if (!state.cartItems[itemIndex]) {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        state.cartTotalItems.push(tempProduct);
        toast.success(`${action.payload.name} added to cart`, {
          position: "bottom-left",
        });
      }

      //localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action) => {
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );

      state.cartItems = nextCartItems;
      //localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      // toast.error(`${action.payload.name} eliminado del carrito`, {
      //   position: "bottom-left",
      // });
    },

    decreaseCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;

        toast.info(`Amount of ${state.cartItems[itemIndex].name} decreased`, {
          position: "bottom-left",
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );

        state.cartItems = nextCartItems;

        toast.error(`${action.payload.name} removed from the cart`, {
          position: "bottom-left",
        });
      }

      //localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    clearCart: (state) => {
      state.cartItems = [];
      toast.error(`Cart is currently empty`, {
        position: "bottom-left",
      });
      //localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    clearCart(state, action) {
      state.cartItems = [];
      //localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      // toast.error("Cart cleared", { position: "bottom-left" });
    },
    getUserCart: (state, action) => {
      //console.log("soy el payload",action.payload)
      if (!action.payload) {
        state.cartItems = [];
        state.cartTotalAmount = 0;
        state.cartTotalAmount = 0;
      } else {
        state.cartItems = action.payload.cartItems;
        state.cartTotalQuantity = action.payload.cartTotalQuantity;
        state.cartTotalAmount = action.payload.cartTotalAmount;
        state.cartTotalItems = action.payload.cartTotalItems;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseCart,
  clearCart,
  getTotals,
  getUserCart,
} = cartSlice.actions;
export default cartSlice.reducer;
