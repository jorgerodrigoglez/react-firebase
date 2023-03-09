import { useState, useEffect } from "react";

// NO HA SIDO NECESARIO UTILIZARLO, CONVIERTE EL FORMATO DE FECHA DE FIREBASE 1º EN UN FORMATO VALIDO PARA EL DATEPICKER Y 2º EN UN FORMATO PARA MODIFICARLO A UN STRING
// la modificación se ha realizado en la función losdingnotes() en store/notes/thunks, antes de enviar los datos al reducer que modifica el state de notas
// despues en Note.jsx se realiza la conversión del formato a string, para poderlo mostrar en la vista que se renderiza mediante un array.map()

export const formatDates = (start,end) => {
  // formato de fechas
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // start
  useEffect(() => {
    const fireBaseTimeStart = new Date(
      start.seconds * 1000 + start.nanoseconds / 1000000
    );
    const atTimeStartDB = fireBaseTimeStart.toUTCString();
    setStartDate(atTimeStartDB);
  }, [start]);

  // end
  useEffect(() => {
    const fireBaseTimeEnd = new Date(
      end.seconds * 1000 + end.nanoseconds / 1000000
    );
    const atTimeEndDB = fireBaseTimeEnd.toUTCString();
    setEndDate(atTimeEndDB);
  }, [end]);

  return {
    startDate,
    endDate
  };
};
