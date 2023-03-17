import {
  doc,
  collection,
  setDoc,
  deleteDoc,
  updateDoc
} from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { onAddNewNote } from "./";
import {
  isSavingNewNote,
  setNotes,
  setSaving,
  updateNote,
  deleteNoteById,
  onChangeStateTask,
  onFilterCategories,
  setOrderByCategory
} from "./notesSlice";
import {
  loadNotes,
  formatDates,
  loadNotesByCategory,
  loadNotesByPriority
} from "../../helpers";

// graba las notas de DDBB y las añade al store.notes
// useNotesStore.js
export const newNoteDDBB = newNote => {
  return async (dispatch, getState) => {
    // envia datos del formulario a la BBDD y modifica el store(initialState) mediante el reducer onAddNewNote
    // console.log('Creando nueva nota');
    // console.log({ newNote });

    // uid del usuario logeado
    const { uid } = getState().auth;
    // console.log(getState());
    // controla el disable del btn del submit del formulario en ModalNotes.jsx
    dispatch(isSavingNewNote());

    // guarda la nota completa
    const newDoc = doc(collection(FirebaseDB, `${uid}/dashboard/notes`));
    await setDoc(newDoc, newNote);
    //console.log({newDoc});
    // crea el id de la nota
    newNote.id = newDoc.id;
    // añade la nueva nota al store
    dispatch(onAddNewNote(newNote));
  };
};

// trae las notas grabadas en DDBB
// useCheckAuth.js
export const loadingNotesDDBB = () => {
  return async (dispatch, getState) => {
    // uid del usuario logeado
    const { uid } = getState().auth;
    // uid del usuario
    if (!uid) throw new Error("El uid del usuario no existe");

    // ----------------------- Trae las categorias de las notas DDBB ---------------------

    const notesCategoriesDB = await loadNotesByCategory(uid);
    // guarda las notas guardadas en DDBB en el store de notas
    // helper para el formato de fechas
    const formatDatesCatDB = formatDates(notesCategoriesDB);
    dispatch(setNotes(formatDatesCatDB));

    // ----------------------- Trae todas las notas DDBB ---------------------
    const notesDB = await loadNotes(uid);
    //console.log(notesDB);
    // hay que cambiar el formato de fechas devuelto a firebase por el formato de fechas compatible con el datepicker, para que no de error al realizar la edición de las fechas y el datepicker las pueda leer
    // helper para el formato de fechas
    const formatDatesDB = formatDates(notesDB);
    // guarda las notas guardadas en DDBB en el store de notas
    dispatch(setNotes(formatDatesDB));
  };
};

// edita la nota en BBDD
// useNotesStore.js
export const editNoteDDBB = editNote => {
  return async (dispatch, getState) => {
    // controla la edicion de la nota,mientras se guarda
    dispatch(setSaving());
    // uid del usuario logeado
    const { uid } = getState().auth;
    // --------------------------------------------------------------------------------------------------------------------
    // IDENTIFICA TODAS LAS CATEGORIAS QUE HAY QUE MODIFICAR Y QUE SON IGUALES A LA QUE SE HA REALIZADO LA EDICIÓN
    const { notes } = getState().notes;

    // categoria editada
    const newCategory = editNote.category;
    // color de la nota a editar que no cambia nunca ya que no se puede editar
    const newColor = editNote.color;
    // consigue la categoria antes de su edicion
    // comparamos 2 propiedades que siempre son iguales
    let preCategory = "";
    notes.map(note => {
      if (note.color === newColor) {
        preCategory = note.category;
      }
    });
    //console.log(preCategory);
    // consigue un array con el numero de objetos de la categoria a editar antes de edicion
    let newPreNotes = [];
    notes.filter(note => {
      if (preCategory === note.category) {
        const preNotes = note;
        newPreNotes.push(preNotes);
      }
    });
    //console.log({ newPreNotes });
    // edita la categoria de las notas que van a ser enviadas a DDBB
    newPreNotes.map(async note => {
      let noteEdit = { ...note, category: newCategory };
      // inserción de datos en firebase
      const noteToFireStore = { ...noteEdit };
      delete noteToFireStore.id;
      // identifica y modifica
      const docRef = doc(FirebaseDB, `${uid}/dashboard/notes/${noteEdit.id}`);
      await updateDoc(docRef, { category: noteEdit.category }, { merge: true });
      // modifica el store de notas
      dispatch(updateNote(noteEdit));
    });

    // --------------------------------------------------------------------------------------------------------------------
    // EDICIÓN NORMAL POR ID

    // elimina el id de activeNote
    const noteToFireStore = { ...editNote };
    delete noteToFireStore.id;
    //console.log(noteToFireStore);
    const docRef = doc(FirebaseDB, `${uid}/dashboard/notes/${editNote.id}`);
    await setDoc(docRef, noteToFireStore, { merge: true });
    // modifica el store de notas y muestra los datos modificados
    dispatch(updateNote(editNote));
  };
};

// elimina la nota en DDBB
export const deletingNoteDDBB = id => {
  return async (dispatch, getState) => {
    // uid del usuario logeado
    const { uid } = getState().auth;
    //console.log({uid,id});
    // Borra documento de la DDBB
    const docRef = doc(FirebaseDB, `${uid}/dashboard/notes/${id}`);
    await deleteDoc(docRef);
    // elimina del store de notas la nota
    dispatch(deleteNoteById(id));
  };
};

// cambia el estado de la nota de completada a no completada
export const changeCompleteTask = (id, stateTask = {}) => {
  return async (dispatch, getState) => {
    // uid del usuario logeado
    const { uid } = getState().auth;
    // elimina el id de activeNote
    const noteToFireStore = { ...stateTask };
    delete noteToFireStore.id;
    //console.log({ uid, id, stateTask });
    const docRef = doc(FirebaseDB, `${uid}/dashboard/notes/${id}`);
    await setDoc(docRef, noteToFireStore, { merge: true });
    // cambia el estado de la nota en el store
    dispatch(onChangeStateTask(stateTask));
  };
};

// cambia el state de la nota de visible a no visible
// no se modifica DDBB, solo en el frontend
export const changeStateNote = (categoryName = "") => {
  return async (dispatch, getState) => {
    // uid del usuario logeado
    //const { uid } = getState().auth;
    const { notes } = getState().notes;

    // recorremos la notas, para cambiar su estado
    notes.map(async note => {
      if (categoryName === note.category) {
        let stateNote = note.stateNote;
        //console.log(stateNote);
        stateNote = true;
        // por si quiere cambiarse esta propiedad en DDBB - en este caso no es necesario
        //const docRef = doc(FirebaseDB, `${uid}/dashboard/notes/${note.id}`);
        //await updateDoc(docRef, { stateNote: stateNote }, { merge: true });
        // cambia el estado de la nota en el store
        dispatch(onFilterCategories(categoryName));
      }
    });
  };
};

// trae todas la notas de DDBB en orden de priorida
export const notesByOrderPriority = (selectColor = '') => {
  return async (dispatch, getState) => {
    //console.log(selectColor);
    // uid del usuario logeado
    const { uid } = getState().auth;
    // uid del usuario
    if (!uid) throw new Error("El uid del usuario no existe");
    // respuesta de DDBB - trae las notas ordenadas por orden de prioridad
    const loadNotesByOrderPriority = await loadNotesByPriority(uid);
    // console.log(loadNotesByOrderPriority);
    // hay que cambiar el formato de fechas devuelto a firebase por el formato de fechas compatible con el datepicker, para que no de error al realizar la edición de las fechas y el datepicker las pueda leer
    // helper para el formato de fechas
    const formatDatesOrderDB = formatDates(loadNotesByOrderPriority);
    // si hay color seleccionado no listamos todas las notas por orden de prioridad
    // si hay color seleccionado listamos las notas de ese color y las ordenamos
    if(selectColor === ''){
      //console.log('NO se selecciono color');
      // guarda las notas guardadas en DDBB en el store de notas
      dispatch(setNotes(formatDatesOrderDB));
    }else{
      //console.log('SI se selecciono color');
      dispatch(setOrderByCategory());
    }
  };
};
