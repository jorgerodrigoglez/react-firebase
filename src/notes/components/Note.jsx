import { useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  onSetActiveNote,
  startDeletingNoteDDBB,
  changeCompleteTask
} from "../../store/notes";
import { useUiStore } from "../../hooks";
//import { formatDates } from "../../helpers";
import { onEditFormatTextModal } from "../../store/ui";

export const Note = ({
  note,
  id,
  category,
  task,
  description,
  priority,
  priorityColor,
  start,
  end,
  complete,
  color,
  entry,
  spent
}) => {
  //console.log({ category, task, description, start, end, color, entry, spent });
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

  // aqui iba el helper para el formato de fechas

  // hook useUiStore - accion para abrir el modal
  const { openModal } = useUiStore();

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
    dispatch(onEditFormatTextModal());
  };

  // elimina la nota seleccionada
  const onDeleteNote = () => {
    // acciona la funciones siguiente en store/notes/thunks
    dispatch(startDeletingNoteDDBB(id));
  };

  // cambia el icono de la nota completada o no segun el valor de DDBB
  const onChangeCompleteTask = event => {
    event.preventDefault();

    const changeStateTask = {
      ...note,
      complete: !complete
    };

    dispatch(changeCompleteTask(id, changeStateTask));
  };

  return (
    <li className="note__item">
      <div className="note__item__check" onClick={onChangeCompleteTask}>
        {complete ? (
          <div className="note__item__check--complete">
            <i className="fa-sharp fa-solid fa-check"></i>
            <span>Completada</span>
          </div>
        ) : (
          <div className="note__item__check--complete">
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

        <div
          className="note__item__priority"
          style={{ backgroundColor: priorityColor }}
        >
          <p>
            Prioridad:<span>{priority}</span>
          </p>
        </div>

        <div className="note__item__date">
          <div className="note__item__date--start">
            <span>From:</span> {dateStart}
          </div>
          <div className="note__item__date--end border-bottom">
            <span>To:</span> {dateEnd}
          </div>
        </div>

        <div className="note__item__count">
          <div className="note__item__count--spent">
            <span>Gasto:</span>
            <b>{spent}</b>€
          </div>
          <div className="note__item__count--entry">
            <span>Ingreso:</span>
            <b>{entry}</b>€
          </div>
          <div className="note__item__count--total">
            <span>Total:</span>
            <b>{entry - spent}</b>€
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
    </li>
  );
};
