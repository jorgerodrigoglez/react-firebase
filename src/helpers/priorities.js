import { colorsPriority } from "../ui";

export const priorities = formValuesPriorityColor => {
  // devuelve el texto que corresponde con el color asignado a la prioridad
  let textPriority = "";

  colorsPriority.map(obj => {
    if ( formValuesPriorityColor === obj.color) {
      textPriority = obj.text;
      return textPriority;
    }
  });
  return textPriority;
};
