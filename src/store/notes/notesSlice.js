import { createSlice } from "@reduxjs/toolkit";

export const notesSlice = createSlice({
  name: "notes",
  initialState: {
    isSaving: false, // para el disabled del botón de guardar - en este caso no es muy útil
    //messageSaved: "",
    notes: [],
    activeNote: null,
    categories: []
  },
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes

    // controla los disabled de los botones
    isSavingNewNote: state => {
      state.isSaving = true;
    },
    // activa una nota seleccionada
    onSetActiveNote: (state, { payload }) => {
      state.activeNote = payload;
      //state.messageSaved = "";
    },
    // añade una nueva nota - thunk
    onAddNewNote: (state, { payload }) => {
      state.notes.push(payload);
      state.isSaving = false;
      state.activeNote = null;
    },

    // loadingNotes(); - etablece las notas - useCheckAuth.js - thunks
    setNotes: (state, { payload }) => {
      state.notes = payload;
    },
    // indica que la nota ha sido editada y elimina el mensaje
    setSaving: state => {
      state.isSaving = true;
      // mensaje de error
      //state.messageSaved = "";
    },
    // actualiza la nota - thunk
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
      //state.messageSaved = `LA TAREA: ${payload.task} DE LA CATEGORÍA: ${payload.category} ha sido actualizada`;
    },
    // accion se dispara al hacer logout - store/auth/thunks startLogout()
    clearNotesLogout: state => {
      state.isSaving = false;
      state.messageSaved = "";
      state.notes = [];
      state.activeNote = null;
    },
    // elimina la nota seleccionada - thunk
    deleteNoteById: (state, { payload }) => {
      // si ids son diferentes devuelve la nota - si ids son iguales elimina la nota de state de notas
      state.notes = state.notes.filter(note => note.id !== payload);
    },
    // cambia el estado de la nota : completada/no completada
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
    // guarda las categorias una vez que han sido eliminadas - ModalNotes.jsx
    onStablishCategories: (state, { payload }) => {
      state.categories = payload;
    },
    onFilterCategories: (state, { payload }) => {
      //console.log(payload);
      state.notes = state.notes.map(note => {
        if (note.category === payload) {
          note.stateNote = false;
          return note;
        } else {
          note.stateNote = true;
          return note;
        }
      });
    },
    // cambia las notas completadas y las no completadas - MenuCategories.jsx - thunks
    setToggleCompleteNotes: (state, { payload }) => {
      //console.log(payload);
      state.notes = state.notes.map(note => {
        if (note.complete === payload) {
          note.stateNote = true;
          return note;
        } else {
          note.stateNote = false;
          return note;
        }
      });
    },
     // cambia las notas completadas y las no completadas por categorías - MenuCategories.jsx
    setToggleCompleteNotesByCategory: (state, { payload }) => {
      //console.log({payload});
      // se requiere el noteState, note.complete y el note.color
      state.notes = state.notes.filter(note => {
        if (
          note.color === payload.color &&
          note.complete === !payload.toggleBtn
        ) {
          note.stateNote = false;
          return note;
        } else {
          note.stateNote = true;
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
  setMenuItems,
  setNotes,
  setSaving,
  updateNote,
  clearNotesLogout,
  deleteNoteById,
  onChangeStateTask,
  onStablishCategories,
  onFilterCategories,
  setToggleCompleteNotes,
  setToggleCompleteNotesByCategory
} = notesSlice.actions;
