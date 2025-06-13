import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import themeReducer from "./themeSlice";
import teamReducer from "./teamSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    team: teamReducer,
  },
});
