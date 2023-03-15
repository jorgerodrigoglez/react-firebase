import { useState, useEffect } from "react";

// despues en Note.jsx se realiza la conversión del formato a string, para poderlo mostrar en la vista que se renderiza mediante un array.map()

export const formatDates = (notesDB) => {

  notesDB.map(noteDB => {
    // modificacion del formato de fecha del start y end
    const fireBaseTimeStart = new Date(
      noteDB.start.seconds * 1000 + noteDB.start.nanoseconds / 1000000
    );
    const fireBaseTimeEnd = new Date(
      noteDB.end.seconds * 1000 + noteDB.end.nanoseconds / 1000000
    );
    //console.log(fireBaseTimeStart,fireBaseEnd);
    noteDB.start = fireBaseTimeStart;
    noteDB.end = fireBaseTimeEnd;
  });

  return notesDB;
};
