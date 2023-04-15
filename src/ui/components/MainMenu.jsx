import { NavLink } from "react-router-dom";

export const MainMenu = () => {
  // componente en MainRoutes.jsx

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
        <li>
          <NavLink className="main__menu__link" to="/counts">
            Cuentas
          </NavLink> 
        </li>
      </ul>
    </nav>
  );
};
