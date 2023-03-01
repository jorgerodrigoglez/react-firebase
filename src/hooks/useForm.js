import { useState, useEffect, useMemo } from "react";

export const useForm = (initialState = {}, formValidations = {}) => {
  const [formValues, setFormValues] = useState(initialState);
  const [formValuesValidation, setFormValuesValidation] = useState({});

  // cada vez que los valores del formulario cambian llamo a la función que realiza las validaciones
  useEffect(() => {
    createValidations();
  }, [formValues]);

  // retorna true o false si el formulario es valido, memorizamos el resultado
  // cogemos los valores de formValuesValidation
  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValuesValidation)) {
      if(formValuesValidation[formValue] !== null ) return false;
    }
    return true;
  },[formValues]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    });
  };

  const resetForm = () => {
    setValues(initialState);
  };

  // validaciones del formulario
  const createValidations = () => {
    const formCheckedValues = {};

    for (const formField of Object.keys(formValidations)) {
      // obtiene las keys del objeto
      // console.log(formField);
      // desestructura el array segun el formField para obtener los valores (función y mensajes)
      const [fn, errorMessge = "Errores de validación"] = formValidations[
        formField
      ];
      // 1ª parte: crea propiedades del objeto , 2ª parte, se envia el valor del formulario en ese formField, si regresa true, se cumple la condición, sino devuelve el mensaje de error
      formCheckedValues[`${formField}Valid`] = fn(formValues[formField])
        ? null
        : errorMessge;
    }

    setFormValuesValidation(formCheckedValues);
    //console.log(formCheckedValues);
  };

  return {
    ...formValues,
    formValues,
    handleInputChange,
    ...formValuesValidation,
    isFormValid
  };
};
