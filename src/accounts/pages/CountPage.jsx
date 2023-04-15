import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { CountTotalProjects, CountTotal } from "../components";
import { filterNotesMenuCategories } from "../../helpers";

export const CountPage = () => {
  // redux
  const { notes, categories } = useSelector(state => state.notes);
  // helper _ devuelve objeto con categoria y color de la nota
  let newNoteCount = filterNotesMenuCategories(notes);
  // elimina los objetos repetidos
  let deleteRepByCount = newNoteCount.filter((value1, index, array) => {
    //Podríamos omitir el return y hacerlo en una línea, pero se vería menos legible
    return (
      array.findIndex(
        value2 => JSON.stringify(value2) === JSON.stringify(value1)
      ) === index
    );
  });

  return (
    <div>
      {categories && (
        <ul className="total">
          {deleteRepByCount.map(catcol => (
            <CountTotal
              catcol={catcol}
              notes={notes}
              key={uuidv4()}
            />
          ))}
        </ul>
      )}
      <div>
        <CountTotalProjects notes={notes} key={uuidv4()} />
      </div>
    </div>
  );
};
