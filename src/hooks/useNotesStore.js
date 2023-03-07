import { useSelector, useDispatch } from "react-redux";
import { onSetActiveNote, newNoteDDBB } from "../store/notes";

export const useNotesStore = () => {
  // redux
  const dispatch = useDispatch();
  const { notes, activeNote } = useSelector(state => state.notes);

  // activar nota -- este evento es para el calendario
  const setActiveNote = event => {
    dispatch(onSetActiveNote(event));
  };

  // Guardar nota
  const startSavingNote = async note => {
    dispatch(newNoteDDBB({ ...note }));
  };

  return {
    // state
    notes,
    activeNote,
    // methods
    //setActiveNote,
    startSavingNote,
  };
};
