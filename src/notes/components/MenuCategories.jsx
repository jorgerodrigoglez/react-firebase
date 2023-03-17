import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadingNotesDDBB,
  changeStateNote,
  setToggleCompleteNotes,
  setToggleCompleteNotesByCategory,
  notesByOrderPriority,
} from "../../store/notes";
import { filterNotesMenuCategories } from "../../helpers";

export const MenuCategories = () => {
  // componente en NotesPage.jsx
  // useStates
  // canbia el color de los botones
  const [selectColor, setSelectColor] = useState("");
  // cambiar el boton de completadas
  const [toggleBtn, setToggleBtn] = useState(false);
  // redux
  const dispatch = useDispatch();
  const { notes } = useSelector(state => state.notes);

  // helper - extrae el color y la categoria
  const menuItemsFilter = filterNotesMenuCategories(notes);
  //console.log({menuItemsFilter});
  // elimina las notas repetidas
  let itemsMenuNoRep = menuItemsFilter.filter((value1, index, array) => {
    //Podríamos omitir el return y hacerlo en una línea, pero se vería menos legible
    return (
      array.findIndex(
        value2 => JSON.stringify(value2) === JSON.stringify(value1)
      ) === index
    );
  });
  //console.log({itemsMenuNoRep});

  // filtro de notas desde el frontend
  const filterByCategory = event => {
    event.preventDefault();
    const { target } = event;
    //console.log(target.value);
    const currentCategory = target.value;
    // captura el color de la categoria de la nota
    notes.map(note => {
      if (note.category === currentCategory) {
        setSelectColor(note.color);
      }
    });
    //console.log(currentCategory);
    // store/notes/thunks
    dispatch(changeStateNote(currentCategory));
  };

  // listar notas completadas totales y por categorias
  const stateToggleBtn = event => {
    event.preventDefault();
    setToggleBtn(!toggleBtn);

    // selecciona completadas y no de todas las categorias
    if (toggleBtn) {
      dispatch(setToggleCompleteNotes(toggleBtn));
    } else {
      dispatch(setToggleCompleteNotes(toggleBtn));
    }
    // selecciona las notas completadas y no completadas de una categoria
    notes.map(({ color }) => {
      //console.log(color,colorCat);
      if (color === selectColor) {
        let objectByFilter = {
          color,
          toggleBtn
        };
        //console.log(objectFilter);
        dispatch(setToggleCompleteNotesByCategory(objectByFilter));
      }
    });
  };

  // accion de ordenar por orden de prioridad
  const prioritiesBtn = event => {
    // idem que filterByCatigory();
    event.preventDefault();
    const { target } = event;
    //console.log(target.value);
    const currentCategory = target.value;
    // captura el color de la categoria de la nota
    notes.map(note => {
      if (note.category === currentCategory) {
        setSelectColor(note.color);
      }
      //console.log(selectColor);
      dispatch(notesByOrderPriority(selectColor));
    });
  };

  // llama a loadingNotesDDBB - store/notes/thunks
  const loadingAllNotes = () => {
    dispatch(loadingNotesDDBB());
    setSelectColor("");
  };

  return (
    <>
      <div className="menu__categories">
        <div className="menu__categories__items">
          <ul className="menu__categories__items__categories">
            {/* Items de otras funciones */}
            {itemsMenuNoRep.length > 1 && (
              <div
                style={{ backgroundColor: selectColor }}
                className="menu__categories__items__categories--item"
                onClick={loadingAllNotes}
              >
                Todas
              </div>
            )}
            {itemsMenuNoRep.length > 0 ? (
              // array de categorias con su respectivo color no repetidas
              itemsMenuNoRep.map(obj => (
                <li
                  key={obj.cat}
                  className="menu__categories__items__categories--item"
                  onClick={filterByCategory}
                  style={{ backgroundColor: obj.col }}
                >
                  <input type="button" value={obj.cat} />
                </li>
              ))
            ) : (
              <p className="not-categories">
                No hay categorías, empieza añadiendo una nota...
              </p>
            )}
          </ul>
        </div>
      </div>
      {/* Items de otras funciones */}
      {itemsMenuNoRep.length > 1 && (
        <div className="items__menu">
          <input
            type="button"
            style={{ backgroundColor: selectColor }}
            className="items__menu--item"
            onClick={stateToggleBtn}
            value={toggleBtn ? "No Completadas" : "Completadas"}
          ></input>
          <input
            type="button"
            style={{ backgroundColor: selectColor }}
            className="items__menu--item"
            onClick={prioritiesBtn}
            value="Prioridad"
          ></input>
        </div>
      )}
    </>
  );
};
