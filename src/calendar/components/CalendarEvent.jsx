
import {colorsPriority} from '../../ui';

export const CalendarEvent = ({ event }) => {
  //console.log({ event });
  const { category, task, description, complete, priorityColor } = event;

  // imprimir el texto de la prioridad la targeta
  let itemText = colorsPriority.filter(item => priorityColor === item.color);

  return (
    <div>
      <strong>{category}</strong>
      <p><span>Título:</span>{task}</p>
      <p><span>Descripción:</span>{description}</p>
      <p>{complete ? "Completada" : "No completada"}</p>
      <div style={{ backgroundColor: priorityColor }}>
        <p><span>Prioridad:</span>{itemText[0].text}</p>
      </div>
    </div>
  );
};