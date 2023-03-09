import { useEffect } from 'react';
import { useSelector } from "react-redux";

import Swall from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import { ModalNotes } from "../components/";
import { NothingSelected } from "./";
import { Note } from "../components";

export const NotesPage = () => {
  // store de notes
  const { notes, messageSaved } = useSelector(state => state.notes);
  //console.log(notes);

  // dispara el mensaje de exito al actualizar una nota concreta al cambiar el store
  // ver store/notes/notesSlice
  useEffect(() => {
    if (messageSaved.length > 0) {
      Swall.fire("La nota ha sido actualizada", messageSaved, "success");
    }
  }, [messageSaved]);

  return (
    <>
      <ModalNotes />

      {notes.length === 0 ? (
        <NothingSelected />
      ) : (
        notes.length > 0 && (
          <ul className="note">
            {notes.map(note => (
              <Note {...note} key={note.id} note={note}/>
            ))}
          </ul>
        )
      )}
    </>
  );
};
