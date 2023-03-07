import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { uiSlice } from "./ui";
import { notesSlice } from "./notes";

export const store = configureStore({
  reducer: {
      auth: authSlice.reducer,
      ui: uiSlice.reducer,
      notes: notesSlice.reducer,
  },
  // elimina el error de las fechas en la consola
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
});
