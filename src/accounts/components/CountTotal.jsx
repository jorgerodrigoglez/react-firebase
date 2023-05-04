import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { formatCurrency, totalCountProject } from "../../helpers";
import { CountTotalProject } from ".";

export const CountTotal = ({ catcol }) => {
  //console.log(catcol);

  const [myTotalProject, setMyTotalProject] = useState(0);
  //console.log(myTotalProject);

  // helpers
  let myTotalCountCard = totalCountProject(catcol.cat);
  //console.log({ myTotalCountCard });

  // Calcular los totales de cada proyecto
  // useEffect para sumar los diferentes presupuestos de un proyecto
  useEffect(() => {
    let myTotal = 0;

    myTotalCountCard.forEach(my => {
      myTotal += my.total;
    });
    // cambia el estado del acomulador
    setMyTotalProject(myTotal);
  }, [myTotalCountCard]);

  return (
    <div className="total__card">
      <li style={{ backgroundColor: catcol.col }} key={uuidv4()}>
        <h1 className="total__card--project">{catcol.cat}</h1>
        {myTotalCountCard.map(card => (
          <div key={uuidv4()}>
            <h2 className="total__card--task">{card.task}</h2>

            <div className="total__card--total" >
              <p>Ingreso:<span>{formatCurrency(card.entry)}</span></p>
              <p>Gasto:<span>{formatCurrency(card.spent)}</span></p>
              <p>Diferencia:<span>{formatCurrency(card.total)}</span></p>
            </div>
          </div>
        ))}

        <div>
          <CountTotalProject myTotalProject={myTotalProject} />
        </div>
      </li>
    </div>
  );
};