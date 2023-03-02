import { Routes, Route, Navigate } from "react-router-dom";

import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { NotesPage } from "../notes/pages/NotesPage";
import { CheckingAuth } from "../ui";
import { useCheckAuth } from "../hooks";

export const AppRoutes = () => {

  // hook 
  const status = useCheckAuth();

  // muestra mensage de carga
  if (status === "checking") {
    return <CheckingAuth />;
  }

  return (
    <Routes>
      {status === "authenticated" ? (
        <Route path="/*" element={<NotesPage />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}

      <Route path="/*" element={ <Navigate to="/auth/login"/> } />

    </Routes>
  );
};
