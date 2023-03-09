import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "@firebase/auth";

import { FirebaseAuth } from "../firebase/config";
import { logout, login } from "../store/auth";
import { loadingNotesDDBB } from "../store/notes";

export const useCheckAuth = () => {
  // redux
  const { status } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  // mantiene el estado de autenticación de firebase al recargar
  useEffect(() => {
    // observable
    onAuthStateChanged(FirebaseAuth, async user => {
      // si no hay usuario
      if (!user) return dispatch(logout());
      // si hay usuario
      const { uid, email, displayName } = user;
      dispatch(login({ uid, email, displayName }));
      // store/notes/thunks - loadingNotes - trae las notas guardadas en la BBDD
      dispatch( loadingNotesDDBB() );
    });
  }, []);

  return status;
};
