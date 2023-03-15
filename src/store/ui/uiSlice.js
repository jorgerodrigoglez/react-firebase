import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isOpenModal: false,
    screenEditModal: false
  },
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    onOpenModal: state => {
      state.isOpenModal = true;
      state.screenEditModal = false;
    },
    onCloseModal: state => {
      state.isOpenModal = false;
    },
    onEditElementsModal: state => {
      state.screenEditModal = true;
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  onOpenModal,
  onCloseModal,
  onEditElementsModal,
  onDisabledInputsEdit
} = uiSlice.actions;
