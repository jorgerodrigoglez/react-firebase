import { doc, collection, setDoc, deleteDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { onAddNewNote } from "./";
import {
  isSavingNewNote,
  setNotes,
  setSaving,
  updateNote,
  deleteNoteById,
  onChangeStateTask
} from "./notesSlice";
import { loadNotes } from "../../helpers";

// graba las notas de DDBB y las añade al store.notes
// useNotesStore.js
export const newNoteDDBB = newNote => {
  return async (dispatch, getState) => {
    // envia datos del formulario a la BBDD y modifica el store(initialState) mediante el reducer onAddNewNote
    // console.log('Creando nueva nota');
    //console.log({newNote});
    //console.log(getState());
    // controla el disable del btn del submit del formulario en ModalNotes.jsx
    dispatch(isSavingNewNote());
    // uid del usuario logeado
    const { uid } = getState().auth;
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
    //console.log({uid});
    if (!uid) throw new Error("El uid del usuario no existe");
    // funcion en helpers/loadNotes.js - trae los documentos de la DDBB
    const notesDB = await loadNotes(uid);
    //console.log(notesDB);
    // hay que cambiar el formato de fechas devuelto a firebase por el formato de fechas compatible con el datepicker, para que no de error al realizar la edición de las fechas y el datepicker las pueda leer
    notesDB.map(noteDB => {
      // modificacion del formato de fecha del start y end
      const fireBaseTimeStart = new Date(
        noteDB.start.seconds * 1000 + noteDB.start.nanoseconds / 1000000
      );
      const fireBaseTimeEnd = new Date(
        noteDB.end.seconds * 1000 + noteDB.end.nanoseconds / 1000000
      );
      //console.log(fireBaseTimeStart,fireBaseEnd);
      noteDB.start = fireBaseTimeStart;
      noteDB.end = fireBaseTimeEnd;
    });
    //console.log(notesDB);
    // guarda las notas guardadas en DDBB en el store
    dispatch(setNotes(notesDB));
  };
};

// edita la nota en BBDD
// useNotesStore.js
export const editNoteDDBB = editNote => {
  return async (dispatch, getState) => {
    //console.log(editNote);
    // controla la edicion de la nota,mientras se guarda
    dispatch(setSaving());
    // uid del usuario logeado
    const { uid } = getState().auth;
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
export const startDeletingNoteDDBB = id => {
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
    //console.log({ uid, id, stateTask });
    const docRef = doc(FirebaseDB, `${uid}/dashboard/notes/${id}`);
    await setDoc(docRef, stateTask, { merge: true });
    // cambia el estado de la nota en el store
    dispatch(onChangeStateTask(stateTask));
  };
};
