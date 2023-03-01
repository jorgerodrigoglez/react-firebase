import{ useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { useForm } from "../../hooks";
import { checkingAuthentication } from "../../store/auth";

export const LoginPage = () => {

  // redux
  const { status } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  // hook valores del formulario
  const { email, password , handleInputChange } = useForm({
    email: 'jrg@gmail.com',
    password: '123456',
  });

  // memorizar y evaluar el status para desabilitar los botones cuando el status sea igual a 'checking'
  // la función devuelve un tru o un false
  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log({email,password});
    // llamada a funcion asincrona del thunks
    dispatch(checkingAuthentication());
  }

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={onSubmit}>
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

        <button
          type="submit"
          className="auth__btn"
          disabled={ isAuthenticating }
        >
          Login
        </button>

        <Link to="/auth/register" className="auth__link">
          Create new account
        </Link>
      </form>
    </div>
  );
};
