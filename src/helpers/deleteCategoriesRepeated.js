
export const deleteCategoriesRepeated = (notes = []) => {
      
  // creacion de categorias
  const categoriesItems= [];
  // creacion de array categorias
  notes.forEach(note => {
    categoriesItems.push(note.category);
  });

  // Eliminalos las repetidos categorias
  const noRepCat = new Set(categoriesItems);
  const catNoRep = [...noRepCat];

  return catNoRep;
}
