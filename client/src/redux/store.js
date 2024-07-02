import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/slices/authSlice";
import guestReducer from "./features/slices/guestSlice";
import ownerReducer from "./features/slices/ownerSlice";

export const store = configureStore({
  reducer: {
    authReducer,
    guestReducer,
    ownerReducer,
  },
});
