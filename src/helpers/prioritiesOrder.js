import { colorsPriority } from "../ui";

export const prioritiesOrder = (formValuesPriorityColor = "") => {
  let order = 0;

  switch (formValuesPriorityColor) {
    case colorsPriority[4].color:
      return (order = 1);
      break;
    case colorsPriority[3].color:
      return (order = 2);
      break;
    case colorsPriority[2].color:
      return (order = 3);
      break;
    case colorsPriority[1].color:
      return (order = 4);
      break;
    default:
      return (order = 0);
  }
  return order;
};
