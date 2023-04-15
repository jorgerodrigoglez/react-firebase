//import { useEffect } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { useUiStore } from "../../hooks";
import { ModalNotes, MenuCategories } from "../components/";
import { NothingSelected } from "./";
import { Note } from "../components";

export const NotesPage = () => {
  // store de notes
  const { notes } = useSelector(state => state.notes);
  //console.log(notes);

  // dispara el mensaje de exito al actualizar una nota concreta al cambiar el store
  // ver store/notes/notesSlice
  /*useEffect(() => {
    if (messageSaved.length > 0) {
      Swall.fire("La nota ha sido actualizada", messageSaved, "success");
    }
  }, [messageSaved]);*/

  // hook useUiStore - accion para abrir el modal
  const { openModal } = useUiStore();

  // accion de boton para abrir el modal - proviene del hook
  const onOpenModal = () => {
    openModal();
  };

  return (
    <>
      <ModalNotes />
      <MenuCategories />

      <div>
        {notes.length === 0 ? (
          <NothingSelected />
        ) : (
          notes.length > 0 && (
            <div className="note">
              {notes.map((note) => (
                <Note {...note} note={note} key={uuidv4()} />
              ))}
            </div>
          )
        )}
      </div>

      <button className="btn-plus" onClick={onOpenModal}>
          <i className="far fa-plus"></i>
        </button>
    </>
  );
};
