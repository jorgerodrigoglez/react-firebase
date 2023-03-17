import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadNotesByCategory = async (uid = "") => {
  // si no viene el uid captamos el error
  // if (!uid) throw new Error("El uid del usuario no existe");

  // hace referencia a la colecion de la DDBB
  const collectionRef = collection(FirebaseDB, `${uid}/dashboard/notes`);
  // selecciona los documentos
  const docs = await getDocs(collectionRef);
  //console.log(docs);
  // crea un nuevo array de notas y añade el id
  const notesDBbyCategory = [];
  docs.forEach(doc => {
    //console.log( doc.data() );
    notesDBbyCategory.push({ ...doc.data() });
  });
  //console.log(notes);
  return notesDBbyCategory;
};
