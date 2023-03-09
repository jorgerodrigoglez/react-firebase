import { Routes, Route, Navigate } from "react-router-dom";
import { MenuUser, MainMenu } from "../ui";
import { NotesPage } from "../notes/pages";

export const MainRoutes = () => {
  return (
    <div className="dashboard">
      {/* ui/componets/ */}
      <MenuUser />
      <MainMenu />

      <Routes>
        <Route path="/notes" element={<NotesPage />} />

        <Route path="/*" element={<Navigate to="/notes" />} />
      </Routes>
    </div>
  );
};