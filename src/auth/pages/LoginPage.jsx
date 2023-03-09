import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks";
import { startLoginWithEmailPassword } from "../../store/auth";

const formData = {
  email: "jrg@gmail.com",
  password: "123456"
}

export const LoginPage = () => {
  // redux
  const { status, errorMessage } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  // hook valores del formulario
  const { email, password, handleInputChange } = useForm(formData);

  // memorizar y evaluar el status para desabilitar los botones cuando el status sea igual a 'checking'
  // la función devuelve un true o un false
  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const onSubmit = event => {
    event.preventDefault();
    //console.log({ email, password });
    // llamada a funcion asincrona del thunks
    // llamada a funcion para crear el login de usuario en firebase, ver store/auth/thunks
    dispatch(startLoginWithEmailPassword({ email, password }));
  };

  return (
    <div className="auth">
      <form className="auth__form animate__animated animate__fadeIn animate__faster" onSubmit={onSubmit}>
        <h3 className="auth__title">Login:</h3>
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          value={password}
          onChange={handleInputChange}
        />

        {/* Muestra el error de firebase */}
        <p className="error__message__firebase">
          {!!errorMessage && errorMessage}
        </p>

        <button type="submit" className="auth__btn" disabled={isAuthenticating}>
          Login
        </button>

        <Link to="/auth/register" className="auth__link">
          Create new account
        </Link>
      </form>
    </div>
  );
};
