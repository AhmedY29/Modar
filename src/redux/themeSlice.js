import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: "",
  },
  reducers: {
    changeTheme: (state) => {
      if (state.theme == "") {
        state.theme = "dark";
      } else {
        state.theme = "";
      }
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
