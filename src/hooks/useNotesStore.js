import { useSelector, useDispatch } from "react-redux";
import { onSetActiveNote, newNoteDDBB, editNoteDDBB } from "../store/notes";

export const useNotesStore = () => {
  // redux
  const dispatch = useDispatch();
  const { notes, activeNote } = useSelector(state => state.notes);

  // activar nota -- este evento es para el calendario
  const setActiveNote = note => {
    dispatch(onSetActiveNote(note));
  };

  // Guardar nota
  const startSavingNote = async note => {
    // activa la edición
    if(activeNote !== null ){
      dispatch(editNoteDDBB({ ...note }));
    }else{
      // activa el guardado de nueva nota
      dispatch(newNoteDDBB({ ...note }));
    }
  };

  return {
    // state
    notes,
    activeNote,
    // methods
    setActiveNote,
    startSavingNote,
  };
};
