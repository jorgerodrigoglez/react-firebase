import { Routes, Route, Navigate } from "react-router-dom";

import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { CheckingAuth } from "../ui";
import { useCheckAuth } from "../hooks";
import { MainRoutes } from "./MainRoutes";

export const AppRoutes = () => {

  // hook 
  const status = useCheckAuth();

  // muestra mensage de carga
  if (status === "checking") {
    return <CheckingAuth />;
  }

  return (
    <Routes>
      {(status === "authenticated") 
        ? <Route path="/*" element={<MainRoutes />} />
        : <Route path="/auth/*" element={<AuthRoutes />} />
      }

      <Route path="/*" element={ <Navigate to="/auth/login"/> } />

    </Routes>
  );
};
