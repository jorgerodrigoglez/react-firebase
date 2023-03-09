import { createSlice } from "@reduxjs/toolkit";

export const notesSlice = createSlice({
  name: "notes",
  initialState: {
    isSaving: false, // para el disabled del botón de guardar - en este caso no es muy útil
    messageSaved: "",
    notes: [],
    activeNote: null
  },
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    isSavingNewNote: state => {
      state.isSaving = true;
    },
    onSetActiveNote: (state, { payload }) => {
      state.activeNote = payload;
      state.messageSaved = "";
    },
    onAddNewNote: (state, { payload }) => {
      state.notes.push(payload);
      state.isSaving = false;
      state.activeNote = null;
    },
    // loadingNotes();
    setNotes: (state, { payload }) => {
      state.notes = payload;
    },
    setSaving: state => {
      state.isSaving = true;
      // mensaje de error
      state.messageSaved = "";
    },
    updateNote: (state, { payload }) => {
      state.isSaving = false;
      state.notes = state.notes.map(note => {
        if (note.id === payload.id) {
          return payload;
        } else {
          return note;
        }
      });
      state.activeNote = null;
      state.messageSaved = `LA TAREA: ${payload.task} DE LA CATEGORÍA: ${payload.category} ha sido actualizada`;
    },
    // accion se dispara al hacer logout - store/auth/thunks startLogout()
    clearNotesLogout: state => {
      state.isSaving = false;
      state.messageSaved = "";
      state.notes = [];
      state.activeNote = null;
    },
    deleteNoteById: (state, { payload }) => {
      // si ids son diferentes devuelve la nota - si ids son iguales elimina la nota de state de notas
      state.notes = state.notes.filter(note => note.id !== payload);
    },
    onChangeStateTask: (state, { payload }) => {
      //console.log(payload);
      state.notes = state.notes.map(note => {
        if (note.id === payload.id) {
          note.complete = payload.complete;
          return note;
        } else {
          return note;
        }
      });
    },

  }
});

// Action creators are generated for each case reducer function
export const {
  isSavingNewNote,
  onSetActiveNote,
  onAddNewNote,
  setNotes,
  setSaving,
  updateNote,
  clearNotesLogout,
  deleteNoteById,
  onChangeStateTask
} = notesSlice.actions;
