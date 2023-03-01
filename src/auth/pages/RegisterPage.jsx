import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { useForm } from "../../hooks";
import { startCreatingUserWithEmailPassword } from '../../store/auth';

const formData = {
  email: "jrg@gmail.com",
  password: "123456",
  displayName: "Jorge RG",
};

// realizar las validaciones
const formValidations = {
  email : [ (value) => value.includes('@') ,'El Correo debe tener una @'],
  password : [ (value) => value.length >= 6 ,'El password debe de tener más de 6 letras'],
  displayName : [ (value) => value.length >= 5 ,'El nombre es obligatorio'],
}

export const RegisterPage = () => {
  // redux
  const dispatch = useDispatch();
  // state para controlar el submit del formulario
  const [formSubmitted, setFormSubmitted] = useState(false);

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
    passwordValid,
  } = useForm( formData, formValidations );

  //console.log({displayNameValid,passwordValid,emailValid});

  const onSubmit = event => {
    event.preventDefault();
    //console.log(formValues);
    setFormSubmitted(true);
    // si el formulario no es valido no continua la ejecución
    if(!isFormValid) return;
    // llamada a funcion para crear registro de usuario en firebase, ver store/auth/thunks
    dispatch(startCreatingUserWithEmailPassword( formValues ));
  };

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={onSubmit}>
        <h3 className="auth__title">Register:</h3>

        <input
          type="text"
          placeholder="Nombre"
          name="displayName"
          className="auth__input"
          value={displayName}
          onChange={handleInputChange}
        />
        {(!!displayNameValid && formSubmitted) && <p>{displayNameValid}</p>}
        
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        {(!!emailValid && formSubmitted) && <p>{emailValid}</p>}

        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          value={password}
          onChange={handleInputChange}
        />
        {(!!passwordValid && formSubmitted) && <p>{passwordValid}</p>}

        <button type="submit" className="auth__btn">
          Register
        </button>

        <Link to="/auth/login" className="auth__link">
          Already register?
        </Link>
      </form>
    </div>
  );
};
