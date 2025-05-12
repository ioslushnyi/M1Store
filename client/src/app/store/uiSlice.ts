import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

const getInitialDarkMode = () => {
  const useDarkMode = localStorage.getItem("useDarkMode");
  return useDarkMode ? JSON.parse(useDarkMode) : false;
};

// Define a type for the slice state
interface UIState {
  isDarkMode: boolean;
  isLoading: boolean;
}

// Define the initial state using that type
const initialState: UIState = {
  isDarkMode: getInitialDarkMode(),
  isLoading: false,
};

export const uiSlice = createSlice({
  name: "ui",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      localStorage.setItem("useDarkMode", JSON.stringify(!state.isDarkMode));
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { toggleDarkMode } = uiSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectDarkMode = (state: RootState) => state.ui.isDarkMode;

export default uiSlice.reducer;
