import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { startLogout } from "../../store/auth";

export const MenuUser = () => {
  // componente en MainRoutes,jsx
  //redux
  const dispatch = useDispatch();
  // store de auth
  const { displayName } = useSelector(state => state.auth);
  // hora actual
  const dateNow = format(new Date().getTime(), "eee - dd/MM/yy - hh:mm aaa");

  // llama a la funcion de store/auth/thunks
  const onLogout = () => {
    dispatch(startLogout());
  };

  return (
    <div className="user__menu">
      <h1 className="user__menu__name">{displayName}</h1>
      <p className="user__menu__date">{dateNow}</p>
      <button onClick={onLogout} className="user__menu__btn">
        <i className="fa-solid fa-right-from-bracket"></i>
      </button>
    </div>
  );
};
