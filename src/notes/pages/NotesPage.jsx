import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../store/auth";
import { ModalNotes } from "../components/";

export const NotesPage = () => {

    //redux
    const dispatch = useDispatch();
    const { displayName } = useSelector(state => state.auth);

    // llama a la funcion de store/auth/thunks
    const onLogout = () => {
        dispatch( startLogout());
    }

    return (
        <div>
            <h1>NotesPage</h1>
            <button
                onClick={onLogout}
            >
                LOGOUT
            </button>
            <h1>{displayName}</h1>

            <ModalNotes/>
        </div>
    )
}


