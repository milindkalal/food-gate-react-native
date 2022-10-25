import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //initially empty array
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  //actions allows us to modify the global store
  reducers: {
    addToBasket: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      state.value -= 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions;

//allows to access the global store
export const selectBasketItems = (state) => state.basket.items;

export default basketSlice.reducer;
