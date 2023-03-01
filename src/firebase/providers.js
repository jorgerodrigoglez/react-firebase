import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import { FirebaseAuth } from "./config";


// registro con usuario y password
export const registerUserWidthEmailPassword = async({ email, password, displayName }) => {

    try {
        //console.log({email,password,displayName});
        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid } = resp.user;
        //console.log(resp);
        // Actualizar displayName en firebase
        await updateProfile( FirebaseAuth.currentUser, { displayName });

        return {
            ok: true,
            uid,
            email,
            displayName
        }

    } catch (error) {
        //console.log(error);
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

