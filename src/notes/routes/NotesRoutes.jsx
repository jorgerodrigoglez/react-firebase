import { Routes, Route, Navigate } from "react-router-dom";
import { NotesPage } from "../pages/NotesPage";

export const NotesRoutes = () => {
  return (
    <Routes>
      {/* Notes Page */}
      <Route path="/" element={<NotesPage />} />
      {/* Cualquier otra ruta */}
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
