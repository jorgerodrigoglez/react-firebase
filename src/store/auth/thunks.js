import { checkingCredentials } from "./";
import { registerUserWidthEmailPassword, loginWithEmailPassword, logoutFirebase } from "../../firebase/providers";
import { logout, login } from "./authSlice";
import { clearNotesLogout } from "../notes";

// cambia la autenticación
export const checkingAuthentication = ( email, password ) => {
    return async( dispatch )  => {
        // llama al reducer de authSlice
        dispatch(checkingCredentials());
    }
}

// registro de usuario con email y password en firebase
export const startCreatingUserWithEmailPassword = ({ email, password, displayName}) => {
    return async( dispatch )  => {
        // llama al reducer de authSlice
        dispatch(checkingCredentials());
        // llamada a la funcion de firebase/providers
        const { ok, uid, errorMessage } = await registerUserWidthEmailPassword({ email, password, displayName });
        //console.log(resp);
        //console.log(ok,uid,errorMessage,email,displayName);
        // realizamos el logout - en caso de que la respuesta no sea ok
        if(!ok) return dispatch(logout({errorMessage}));
        // realizamos el login en caso de que la respuesta sea ok
        dispatch(login({ uid, displayName, email }));

    }
}

// login de usuario con email y password
export const startLoginWithEmailPassword = ({ email, password }) => {
    return async( dispatch )  => {
        // llama al reducer de authSlice
        dispatch(checkingCredentials());
        // llamada a la funcion de firebase/providers
        const { ok, uid, displayName, errorMessage } = await loginWithEmailPassword({ email, password });
        //console.log(resp);
        //console.log(ok,uid,displayName,errorMessage);
        // realizamos el logout - en caso de que la respuesta no sea ok
        if(!ok) return dispatch(logout({ errorMessage }));
        // realizamos el login en caso de que la respuesta sea ok
        dispatch(login({ uid, displayName, email }));

    }
}

// logout asociado al boton de onLogout
export const startLogout = () => {
    return async( dispatch ) => {
        await logoutFirebase();
        // de store/notes/notesSlice
        dispatch(clearNotesLogout());
        dispatch( logout() );
    }
}
