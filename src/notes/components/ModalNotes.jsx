import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import Modal from "react-modal";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { differenceInSeconds, addHours } from "date-fns";
import es from "date-fns/locale/es";
registerLocale("es", es);

import Swall from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import { useForm, useUiStore, useNotesStore } from "../../hooks";
import { colors, colorsPriority } from "../../ui";

// Estilos del modal
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};
// ubicacion del modal
Modal.setAppElement("#root");

// valores iniciales del formulario
const initialForm = {
  category: "",
  task: "",
  description: "",
  start: new Date(),
  end: addHours(new Date(), 2),
  color: "#FF8000",
  //priority: 0,
  priorityColor: "#FFF",
  //stateNote: true,
  complete: false,
  spent: 0,
  entry: 0,
};

export const ModalNotes = () => {
  // componente de NotesPage
  // redux
  // controla el disable del btn del submit del formulario en ModalNotes.jsx
  const { isSaving } = useSelector(state => state.notes);
  // hook useForm
  // hook valores del formulario
  const { formValues, setFormValues, handleInputChange } = useForm(initialForm);
  // hook useUiStore
  // para acciones del UI - abrir o cerrar modal
  const { isOpenModal, closeModal } = useUiStore();
  // hook useNotesStore
  // para acciones de store de notas - guardar nueva nota - notesSlice.js
  const { startSavingNote } = useNotesStore();
  // comprueba si el submit del formulario se ha realizad
  const [formSubmitted, setFormSubmitted] = useState(false);

  // función para cerrar modal - proviene del hook
  const uiCloseModal = () => {
    closeModal();
  };

  // funcion del datepicker para cambiar valores del end y start
  const onDateChange = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event
    });
  };

  // cambio de clase CSS en caso de que la validación de la categoria no sea correct
  // crear estilos css en archivo scss correspondiente
  const errorClass = useMemo(() => {
    if (!formSubmitted) return "";
    return formValues.category.length > 0 ? "" : "is-invalid";
  }, [formValues.category, formSubmitted]);

  // submit del formulario
  const onSubmit = async event => {
    event.preventDefault();
    setFormSubmitted(true);
    // validacion de fechas
    const difference = differenceInSeconds(formValues.end, formValues.start);
    //
    if (isNaN(difference) || difference <= 0) {
      //console.log("Las fechas no son correctas");
      Swall.fire(
        "Las fechas no son correctas",
        "Revisa las fechas ingresadas",
        "error"
      );
      return;
    }
    // validacion obligatoria del campo de la categoria
    if (formValues.category.length <= 0) return;

    // impresión valores del formulario
    //console.log({ formValues });
    // guardado del datos de formulario
    await startSavingNote(formValues);

    // cierra el modal
    closeModal();
    // vuelve el submit del formulario a su estado original
    setFormSubmitted(false);
    // limpia los campos del formulario
    setFormValues(initialForm);
  };

  return (
    <Modal
      isOpen={isOpenModal}
      onRequestClose={uiCloseModal}
      style={customStyles}
      className="modal"
      closeTimeoutMS={200}
    >
      <form className="modal--form" onSubmit={onSubmit}>
        <h1>Añadir nota</h1>
        <div className="modal--color">
          <label>Color de nota:</label>
          <select
            name="color"
            className="modal--color--select"
            onChange={handleInputChange}
            value={formValues.color}
            style={{ backgroundColor: formValues.color }}
            //disabled={checkInputColor ? "disabled" : null}
          >
            <option>Selecciona color</option>
            {colors.map(col => (
              <option key={col.id} value={col.color}>
                {col.name}
              </option>
            ))}
          </select>
        </div>

        <div className="row">
          <div className="modal--category">
            {/* <label>Proyecto:{formValues.category}</label> */}
            <label>Categoría:</label>
            <input
              type="text"
              className={`modal--category-input ${errorClass}`}
              placeholder="Categoría"
              name="category"
              autoComplete="off"
              value={formValues.category}
              onChange={handleInputChange}
              //disabled={checkInputColor ? "disabled" : null}
            />
            <div>
              <button
                id="idCheck"
                className="modal--category-checkbox"
                //onClick={changeChecking}
                //style={{ display: checkInputColor ? "" : "none" }}
              >
                {/* {!format ? (
                  <span> Nuevo Proyecto</span>
                ) : (
                  <span> Desbloquear</span>
                )} */}
              </button>
            </div>
          </div>
          <div
            className="modal--category"
            //onChange={changeInputOpt}
          >
            <label>Select project</label>
            <select
              name="category"
              className="modal--category-select"
              onChange={handleInputChange}
              value={formValues.category}
            >
              <option>Select project</option>
              {/* {categories &&
                categories.map(cat => (
                  <option key={uuidv4()} value={cat}>
                    {cat}
                  </option>
                ))} */}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="modal--title">
            <label>Tarea:</label>
            <input
              type="text"
              className="modal--title-input"
              placeholder="Tarea"
              name="task"
              autoComplete="off"
              value={formValues.task}
              onChange={handleInputChange}
            />
          </div>
          <div className="modal--priority">
            <label>Prioridad:</label>
            <select
              name="priorityColor"
              className="modal--priority-input"
              onChange={handleInputChange}
              value={formValues.priorityColor}
              style={{ backgroundColor: formValues.priorityColor }}
            >
              <option>--Selecciona--</option>
              {colorsPriority.map(opt => (
                <option key={opt.id} value={opt.color}>
                  {opt.text}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="modal__window--notes">
          <label>Descripcion:</label>
          <textarea
            type="text"
            className="modal--description"
            placeholder="Descripción"
            rows="2"
            name="description"
            value={formValues.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="row">
          <div className="modal--date-picker">
            <label>Inicio:</label>
            <DatePicker
              selected={formValues.start}
              className="modal--date-picker-input"
              onChange={event => onDateChange(event, "start")}
              dateFormat="Pp"
              showTimeSelect
              locale="es"
              timeCaption="Hora"
            />
          </div>

          <div className="modal--date-picker">
            <label>Fin:</label>
            <DatePicker
              minDate={formValues.start}
              selected={formValues.end}
              className="modal--date-picker-input"
              onChange={event => onDateChange(event, "end")}
              dateFormat="Pp"
              showTimeSelect
              locale="es"
              timeCaption="Hora"
            />
          </div>
        </div>

        <div className="row">
          <div className="modal--count">
            <span className="modal--count--label">Gasto:</span>
            <input
              type="number"
              className="modal--count-input-spent"
              placeholder="Gasto"
              name="spent"
              autoComplete="off"
              value={formValues.spent}
              onChange={handleInputChange}
              min="0"
            />
          </div>
          <div className="modal--count">
            <span className="modal--count--label">Ingreso:</span>
            <input
              type="number"
              className="modal--count-input-spent"
              placeholder="Ingreso"
              name="entry"
              autoComplete="off"
              value={formValues.entry}
              onChange={handleInputChange}
              min="0"
            />
          </div>
        </div>

        <div className="align-center">
          <button type="submit" className="modal--btn" disabled={isSaving}>
            <i className="far fa-save"></i>
            <span>Guardar</span>
            {/* {format ? <span> Editar...</span> : <span> Guardar...</span>} */}
          </button>
        </div>
      </form>
    </Modal>
  );
};
