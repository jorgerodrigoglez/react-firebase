import { Routes, Route, Navigate } from "react-router-dom";
import { MenuUser, MainMenu } from "../ui";
import { NotesPage } from "../notes/pages";
import { CalendarPage } from "../calendar/pages";
import { CountPage } from "../accounts/pages";

export const MainRoutes = () => {
  return (
    <div className="dashboard">
      {/* ui/componets/ */}
      <MenuUser />
      <MainMenu />

      <Routes>
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/counts" element={<CountPage />} />

        <Route path="/*" element={<Navigate to="/notes" />} />
      </Routes>
    </div>
  );
};
