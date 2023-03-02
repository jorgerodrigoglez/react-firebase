import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: "not-authenticated", // 'checking', 'not-authenticated' or 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    errorMessage: null
  },
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    checkingCredentials: ( state ) => {
      state.status = 'checking';
    },

    login: (state, { payload } ) => {
      //console.log(payload);
      state.status = "authenticated";
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.errorMessage = null;
    },

    logout: (state, {payload} ) => {
      state.status = "not-authenticated";
      state.uid = null;
      state.email = null;
      state.displayName = null;
      // ? comprueba si viene  el errorMessage en el payload
      state.errorMessage = payload?.errorMessage;
    },
  }
});

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;
