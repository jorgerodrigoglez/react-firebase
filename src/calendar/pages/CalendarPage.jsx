import { useState } from "react";
import { useSelector } from "react-redux";

import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { localizer, getMessagesES } from "../../helpers";
import { CalendarEvent } from "../components";

export const CalendarPage = () => {
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );
  // redux
  const { notes: events } = useSelector(state => state.notes);
  //console.log(events);

  // const eventStyleGetter = (event, start, end, isSelected) => {
  //console.log({event, start, end, isSelected});
  const eventStyleGetter = event => {
    //console.log(event);

    const style = {
      backgroundColor: event.color,
      borderRadius: "0px",
      opacity: 0.8,
      color: "black"
    };

    return {
      style
    };
  };

  /*const onDoubleClick = event => {
    //console.log({ onDoubleClick: event });
  };*/

  /*const onSelect = event => {
    //console.log({ select: event });
  };*/

  const onViewChanged = event => {
    console.log({ onViewChanged: event });
    localStorage.setItem("lastView", event);
  };

  return (
    <div className="calendar">
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc( 100vh - 80px )" }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        //onDoubleClickEvent={onDoubleClick}
        //onSelectEvent={onSelect}
        onView={onViewChanged}
      />
    </div>
  );
};

