import { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Modal from "react-modal";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { differenceInSeconds, addHours } from "date-fns";
import es from "date-fns/locale/es";
registerLocale("es", es);

import { onStablishCategories } from "../../store/notes";
import { useForm, useUiStore, useNotesStore } from "../../hooks";
import { deleteCategoriesRepeated } from "../../helpers";
import { colors, colorsPriority } from "../../ui"; // data de los select

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
  color: "#FF8000",
  task: "",
  description: "",
  start: new Date(),
  end: addHours(new Date(), 1),
  priority: "",
  priorityColor: "#FFF",
  priorityOrder: 0,
  stateNote: false,
  complete: false,
  spent: 0,
  entry: 0
};

// realizar las validaciones
const formValidations = {
  category: [value => value.length >= 1, "La categoria es obligatoria"]
};

export const ModalNotes = () => {
  // componente de NotesPage.jsx
  // redux
  const dispatch = useDispatch();
  // isSaving:controla el disable del btn del submit del formulario
  // activeNote: devuelve las propiedades de una nota concreta
  const { isSaving, activeNote } = useSelector(state => state.notes);
  //console.log(!!activeNote);
  //console.log(activeNote);
  // controla el texto del modal al editar
  const { screenEditModal } = useSelector(state => state.ui);
  // hook useForm
  // hook valores del formulario
  const {
    formValues,
    setFormValues,
    handleInputChange,
    priorityText,
    priorityOrder,
    categoryValid
  } = useForm(initialForm, formValidations);
  // hook useUiStore
  // para acciones del UI - abrir o cerrar modal
  const { isOpenModal, closeModal } = useUiStore();
  // hook useNotesStore
  // para acciones de store de notas - guardar nueva nota - notesSlice.js
  const { startSavingNote, notes, categories } = useNotesStore();
  // comprueba si el submit del formulario se ha realizad
  const [formSubmitted, setFormSubmitted] = useState(false);
  // bloquea los botones cuando éstos no interesa que sean manipulados por el usuario
  // cuando selecciona una categoria o crea una categoria nueva bloquea o no el input de color
  // cuando edita no interesa que manipule el select de seleccion de categoria
  const [disabledInputColor, setDisabledInputColor] = useState(false);
  // mensaje para el error de fechas
  const [errorDates, setErrorDates] = useState(false);
  const [errorDatesMessage, setErrorDatesMessage] = useState("");
  //console.log({ errorDates, errorDatesMessage });

  // función para cerrar modal - proviene del hook
  const uiCloseModal = () => {
    closeModal();
    // borra datos del formulario al pasar del estado de edición al de nueva nota
    setErrorDates(false);
    setErrorDatesMessage("");
    // desbloque el input de color - si el usuario a seleccionado una categoría mediante el select
    // al cerrar no elimina la categoría seleccionada en el select por ello hay que indicar que la borre
    setFormValues({ ...initialForm });
    // cambio de estado del mensaje de error de las fechas
    setDisabledInputColor(false);
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
  let errorClass = useMemo(() => {
    if (!formSubmitted) return "";
    return formValues.category.length > 0 ? "" : "is-invalid";
  }, [formValues.category, formSubmitted]);

  // helper devuelve las categorias no repetidas de las notas
  const categoriesNoRepeated = deleteCategoriesRepeated(notes);

  // Carga los datos del formulario para su edicion
  useEffect(() => {
    if (activeNote !== null) {
      setFormValues(activeNote);
    }
  }, [activeNote]);

  // introduce las categorias, eliminadas las repetidas, en el store de notes
  useEffect(() => {
    dispatch(onStablishCategories(categoriesNoRepeated));
  }, [notes]);

  // validacion de fechas del datepicker
  useEffect(() => {
    // calcula la direrencia en seg entre fechas
    const difference = differenceInSeconds(formValues.end, formValues.start);
    // condiciones para mostrar el error de fechas
    // console.log(difference);
    if (isNaN(difference) || difference <= 0) {
      setErrorDates(true);
      setErrorDatesMessage("Las fechas NO son correctas");
    } else {
      setErrorDates(false);
      setErrorDatesMessage("");
    }
  }, [formValues.start, formValues.end]);

  // cambia el color del select color al seleccionar las categorias en el select de categorias
  const changeColorSelectingCategory = ({ target }) => {
    //setSelectCategory(target.value);
    let selectText = target.value;
    formValues.category = selectText;
    // bloque el input que selecciona el color de la categoria seleccionada
    setDisabledInputColor(true);

    notes.map(note => {
      if (selectText === note.category) {
        const changeColor = note.color;
        setFormValues({ ...formValues, color: changeColor });
      }
    });
  };

  // limpia el input de categorias, por si se selecciono una categoria
  const resetInput = event => {
    event.preventDefault();
    // para borrar el input de la categoria
    setFormValues({ ...formValues, category: "" });
    // desbloque el input de color - si el usuario a seleccionado una categoría mediante el select
    setDisabledInputColor(false);
  };

  // submit del formulario
  const onSubmit = async event => {
    event.preventDefault();
    setFormSubmitted(true);

    // validacion obligatoria del campo de la categoria
    if (formValues.category.length <= 0) return;
    // calcula la direrencia en seg entre fechas - ver useEffect para la validacion de fechas
    const difference = differenceInSeconds(formValues.end, formValues.start);
    if (difference <= 0) return;

    // impresión valores del formulario
    // asigna el texto de la prioridad al objeto formValues antes de realizar el guardado cuando la nota no esta activa
    formValues.priority = priorityText;
    // asigna el orden de la prioridad al objeto formValues antes de realizar el guardado cuando la nota no esta activa
    formValues.priorityOrder = priorityOrder;
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
        {/* ver Note.jsx - onEditNote() */}
        {screenEditModal ? <h1> Editar nota...</h1> : <h1> Nueva nota...</h1>}

        <div className="modal--color">
          {!screenEditModal && (
            <>
              <label>Color de nota:</label>
              <select
                name="color"
                className="modal--color--select"
                onChange={handleInputChange}
                value={formValues.color}
                style={{ backgroundColor: formValues.color }}
                disabled={disabledInputColor}
              >
                <option>Selecciona color</option>
                {colors.map(color => (
                  <option key={uuidv4()} value={color.color}>
                    {color.name}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>

        <div className="row">
          <div className="modal--category">
            <label>
              {!formValues.category
                ? "Crear categoría:"
                : "Categoría seleccionada:"}
            </label>
            <input
              type="text"
              className={`modal--category-input ${errorClass}`}
              placeholder=""
              name="category"
              autoComplete="off"
              value={formValues.category}
              onChange={handleInputChange}
            />
            {!!categoryValid && formSubmitted && (
              <p className="error__message">{categoryValid}</p>
            )}

            {!screenEditModal && (
              <button
                id="idCheck"
                className="modal--category-checkbox"
                onClick={resetInput}
              >
                Reset
              </button>
            )}
          </div>
          <div
            className="modal--category"
            onChange={changeColorSelectingCategory}
          >
            {!screenEditModal && (
              <>
                <label>Mis categorías:</label>
                <select
                  name="category"
                  className="modal--category-select"
                  onChange={handleInputChange}
                  value={formValues.category}
                >
                  <option>Categorias</option>
                  {categories &&
                    categories.map(category => (
                      <option key={uuidv4()} value={category}>
                        {category}
                      </option>
                    ))}
                </select>
              </>
            )}
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
                <option key={uuidv4()} value={opt.color}>
                  {opt.text}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
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
        <>
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
          {errorDates && (
            <p className="modal--date-picker--error">{errorDatesMessage}</p>
          )}
        </>
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
            {screenEditModal ? (
              <span> Editar...</span>
            ) : (
              <span> Guardar...</span>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};
