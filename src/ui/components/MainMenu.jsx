import { NavLink } from "react-router-dom";
import { useUiStore } from "../../hooks";

export const MainMenu = () => {
  // componente en MainRoutes.jsx
  // hook useUiStore - accion para abrir el modal
  const { openModal } = useUiStore();

  // accion de boton para abrir el modal - proviene del hook
  const onOpenModal = () => {
    openModal();
  };

  return (
    <nav className="main__menu">
      <ul>
        <li>
          <NavLink className="main__menu__link" to="/notes">
            Notas
          </NavLink>
        </li>
        <li>
           <NavLink className="main__menu__link" to="/calendar">
            Calendario
          </NavLink> 
        </li>
        {/* <li>
          <NavLink className="main__menu__link" to="/count">
            Contabilidad
          </NavLink> 
        </li>*/}

        <button className="btn-plus" onClick={onOpenModal}>
          <i className="far fa-plus"></i>
        </button>
      </ul>
    </nav>
  );
};
