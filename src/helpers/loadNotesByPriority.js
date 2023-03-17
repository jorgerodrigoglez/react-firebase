import { collection, getDocs, orderBy, query } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadNotesByPriority = async (uid = "") => {
  // si no viene el uid captamos el error
  //if (!uid) throw new Error("El uid del usuario no existe");
  // hace referencia a la colecion de la DDBB
  const queryRef = query(
    collection(FirebaseDB, `${uid}/dashboard/notes`),
    orderBy("priorityOrder", "asc")
  );
  // selecciona los documentos
  const docs = await getDocs(queryRef);

  //console.log(docs);
  // crea un nuevo array de notas y añade el id
  const notesDBbyOrder = [];
  docs.forEach(doc => {
    //console.log( doc.data() );
    notesDBbyOrder.push({ id: doc.id, ...doc.data() });
  });
  //console.log(notes);
  return notesDBbyOrder;
};
