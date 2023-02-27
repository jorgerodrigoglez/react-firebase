import { Routes, Route, Navigate } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { NotesPage } from "../notes/pages/NotesPage";

export const AppRoutes = () => {
  return (
    <Routes>
        {/* Authentication */}
      <Route path="/auth/*" element={<AuthRoutes />} />
        {/* Project Page*/}
      <Route path="/*" element={<NotesPage/>} />
    </Routes>
  );
};
