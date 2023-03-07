import { doc, collection, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { onAddNewNote } from "./";
import { isSavingNewNote, setNotes } from "./notesSlice";
import { loadNotes } from "../../helpers";

// graba las notas de DDBB y las añade al store.notes
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
export const loadingNotes = () => {
  return async (dispatch, getState) => {
    // uid del usuario logeado
    const { uid } = getState().auth;
    //console.log({uid});
    if(!uid) throw new Error('El uid del usuario no existe');
    // funcion en helpers/loadNotes.js - trae los documentos de la DDBB
    const notesDB = await loadNotes( uid );
    //console.log(notesDB);
    // guarda las notas guardadas en DDBB en el store 
    dispatch(setNotes( notesDB ));
  };
};
