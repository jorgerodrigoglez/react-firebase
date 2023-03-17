import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { onSetActiveNote, changeCompleteTask } from "../../store/notes";
import { useUiStore, useNotesStore } from "../../hooks";
//import { formatDates } from "../../helpers";
import { onEditElementsModal } from "../../store/ui";

export const Note = ({
  note,
  id,
  category,
  task,
  description,
  priority,
  priorityColor,
  priorityOrder,
  start,
  end,
  complete,
  color,
  entry,
  spent,
  stateNote
}) => {
  //console.log({ id, category, task, description, start, end, color, entry, spent });
  //console.log({id});
  //console.log({start,end});

  // redux
  const dispatch = useDispatch();
  // cambia el formato de fecha a un string para poder ser leido
  // se utiliza un useMemo para que se memorice el dato, si este no cambia
  const dateStart = useMemo(() => {
    return start.toUTCString();
  }, [start]);
  const dateEnd = useMemo(() => {
    return end.toUTCString();
  }, [end]);

  // hook useUiStore - accion para abrir el modal
  const { openModal } = useUiStore();
  // hook useNotesStore - acciones de store de notas - eliminar nota - notesSlice.js
  const { startDeletingNote } = useNotesStore();

  // activa la nota para ser editada, una vez activa la nota se recoge el valor en el ModalNotes.jsx y mediante un useEffect se muestran en el formulario, aparte utiliza la funcion del onSubmit del formulario, ubicada en useNotesStore para activar el guardado de la nueva nota o su edición
  const onEditNote = () => {
    dispatch(
      onSetActiveNote({
        id,
        category,
        task,
        description,
        priority,
        priorityColor,
        priorityOrder,
        start,
        end,
        complete,
        color,
        entry,
        spent
      })
    );
    // abre el modal
    openModal();
    // edita los textos del modal - ver ModalNotes.jsx
    dispatch(onEditElementsModal());
  };

  // elimina la nota seleccionada
  const onDeleteNote = async () => {
    // acciona la funciones siguiente en store/notes/thunks
    await startDeletingNote(id);
  };

  // cambia el icono de la nota completada o no segun el valor de DDBB
  const onChangeCompleteTask = event => {
    event.preventDefault();
    // cambia el estado de la nota
    const changeStateTask = {
      ...note,
      complete: !complete
    };
    // thunk para enviar el cambio DDBB
    dispatch(changeCompleteTask(id, changeStateTask));
  };

  return (
    <div
      className="note__item animate__animated animate__fadeIn animate__faster"
      style={{ display: stateNote ? "none" : "" }}
      key={id}
    >
      <div className="note__item__check" onClick={onChangeCompleteTask}>
        {complete ? (
          <div className="note__item__check--complete border-top-large text-bold">
            <i className="fa-sharp fa-solid fa-check"></i>
            <span>Completada</span>
          </div>
        ) : (
          <div className="note__item__check--complete border-top-fine">
            <i className="fa-sharp fa-solid fa-xmark"></i>
            <span>No completada</span>
          </div>
        )}
      </div>

      <div style={{ backgroundColor: color }}>
        <div className="note__item__category">
          <span>{category}</span>
        </div>
        <div className="note__item__body">
          <h1 className="note__item__task">{task}</h1>
          <p className="note__item__description">{description}</p>
        </div>

        <div className="note__item__priority">
          <p style={{ backgroundColor: priorityColor }}>
            Prioridad: <span> {priority}</span>
          </p>
        </div>

        <div className="note__item__date">
          <div className="note__item__date--start">
            <span>From:</span> {dateStart}
          </div>
          <div className="note__item__date--end">
            <span>To:</span> {dateEnd}
          </div>
        </div>

        <div className="note__item__count">
          <div className="note__item__count--spent">
            <span>Gasto:</span>
            <b> {spent}</b>€
          </div>
          <div className="note__item__count--entry">
            <span>Ingreso:</span>
            <b> {entry}</b>€
          </div>
          <div className="note__item__count--total">
            <span>Total:</span>
            <b> {entry - spent}</b>€
          </div>
        </div>
      </div>

      <div className="note__item__delete" style={{ backgroundColor: color }}>
        <button className="btn-edit" onClick={onEditNote}>
          <i className="fa-sharp fa-solid fa-file-pen"></i>
        </button>
        <button className="btn-delete" onClick={onDeleteNote}>
          <i className="fa-sharp fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>
  );
};
