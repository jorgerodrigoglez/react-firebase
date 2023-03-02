import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "@firebase/auth";
import { FirebaseAuth } from "./config";

// registro con usuario y password en firebase
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

// login con usuario y password en firebase
export const loginWithEmailPassword = async({ email, password }) => {

    try {
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, displayName } = resp.user;
    
        return {
            ok: true,
            uid,
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

// logout 
export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}