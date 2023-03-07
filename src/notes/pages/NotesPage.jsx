import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../store/auth";
import { ModalNotes } from "../components/";
import { useUiStore } from "../../hooks";
import { NothingSelected } from "./";

export const NotesPage = () => {
  //redux
  const dispatch = useDispatch();
  // store de auth
  const { displayName } = useSelector(state => state.auth);
  // store de notes
  const { notes } = useSelector(state => state.notes);
  console.log(notes);
  // hook useUiStore - accion para abrir el modal
  const { openModal } = useUiStore();

  // llama a la funcion de store/auth/thunks
  const onLogout = () => {
    dispatch(startLogout());
  };

  // accion de boton para abrir el modal - proviene del hook
  const onOpenModal = () => {
    openModal();
  };

  return (
    <div>
      <h1>NotesPage</h1>
      <button onClick={onLogout}>LOGOUT</button>
      <h1>{displayName}</h1>

      <ModalNotes />

      {notes.length === 0 ? (
        <NothingSelected/>
      ) : (
        notes.length > 0 && (
          <ul>
            {notes.map(note => (
              <li key={note.id}>{note.category}</li>
            ))}
          </ul>
        )
      )}

      <button className="btn-plus" onClick={onOpenModal}>
        <i className="far fa-plus"></i>
        Open Modal
      </button>
    </div>
  );
};
