import { createSlice } from "@reduxjs/toolkit";

export const notesSlice = createSlice({
  name: "notes",
  initialState: {
    isSaving: false,
    messageSaved: "",
    notes: [],
    activeNote: null
  },
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    isSavingNewNote: ( state ) => {
        state.isSaving = true;
    },
    onSetActiveNote: (state, { payload }) => {
      state.activeNote = payload;
      //state.isSaving = false;
    },
    onAddNewNote: (state, { payload }) => {
      state.notes.push(payload);
      state.isSaving = false;
      //state.activeNote = null;
    },
    setNotes: (state, { payload }) => {
        state.notes = payload;
    },
    setSaving: state => {},
    updateNote: (state, { payload }) => {},
    deleteNote: (state, { payload }) => {}
  }
});

// Action creators are generated for each case reducer function
export const { isSavingNewNote, onSetActiveNote, onAddNewNote, setNotes, setSaving, updateNote, deleteNote } = notesSlice.actions;
