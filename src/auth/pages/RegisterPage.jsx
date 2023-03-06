import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks";
import { startCreatingUserWithEmailPassword } from "../../store/auth";

const formData = {
  email: "",
  password: "",
  displayName: ""
};

// realizar las validaciones
const formValidations = {
  email: [value => value.includes("@"), "El Correo debe tener una @"],
  password: [
    value => value.length >= 6,
    "El password debe de tener más de 6 letras"
  ],
  displayName: [value => value.length >= 5, "El nombre es obligatorio"]
};

export const RegisterPage = () => {
  // redux
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector(state => state.auth);
  // state para controlar el submit del formulario
  const [formSubmitted, setFormSubmitted] = useState(false);

  // memorizar y evaluar el status para desabilitar los botones cuando el status sea igual a 'checking'
  // la función devuelve un true o un false
  const isAuthenticating = useMemo(() => status === "checking", [status]);

  // hook valores del formulario
  const {
    formValues,
    displayName,
    email,
    password,
    handleInputChange,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid
  } = useForm(formData, formValidations);

  //console.log({displayNameValid,passwordValid,emailValid});

  const onSubmit = event => {
    event.preventDefault();
    //console.log(formValues);
    setFormSubmitted(true);
    // si el formulario no es valido no continua la ejecución
    if (!isFormValid) return;
    // llamada a funcion para crear registro de usuario en firebase, ver store/auth/thunks
    dispatch(startCreatingUserWithEmailPassword(formValues));
  };

  return (
    <div className="auth">
      <form className="auth__form animate__animated animate__fadeIn animate__faster" onSubmit={onSubmit}>
        <h3 className="auth__title">Register:</h3>

        <input
          type="text"
          placeholder="Nombre"
          name="displayName"
          className="auth__input"
          value={displayName}
          onChange={handleInputChange}
        />
        {!!displayNameValid && formSubmitted && <p className="error__message">{displayNameValid}</p>}

        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        {!!emailValid && formSubmitted && <p className="error__message">{emailValid}</p>}

        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          value={password}
          onChange={handleInputChange}
        />
        {!!passwordValid && formSubmitted && <p className="error__message">{passwordValid}</p>}

        {/* Muestra el error de firebase */}
        <p className="error__message__firebase">{!!errorMessage && errorMessage}</p>

        <button type="submit" className="auth__btn" disabled={isAuthenticating}>
          Register
        </button>

        <Link to="/auth/login" className="auth__link">
          Already register?
        </Link>
      </form>
    </div>
  );
};
