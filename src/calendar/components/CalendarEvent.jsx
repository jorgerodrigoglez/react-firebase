
import {colorsPriority} from '../../ui';

export const CalendarEvent = ({ event }) => {
  //console.log({ event });
  const { category, task, description, complete, priorityColor } = event;

  // imprimir el texto de la prioridad la targeta
  let itemText = colorsPriority.filter(item => priorityColor === item.color);

  return (
    <div className="event">
      <strong className="event__category">{category}</strong>
      <p className="event__task">{task}</p>
      <p className="event__description">{description}</p>
      <p className={complete ? 'complete' : 'no-complete'}>{complete ? "Completada" : "No completada"}</p>
      <div style={{ backgroundColor: priorityColor }}>
        <p><span>Prioridad:</span>{itemText[0].text}</p>
      </div>
    </div>
  );
};