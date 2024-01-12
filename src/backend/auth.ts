// auth.ts

import { doc, setDoc } from "@firebase/firestore";
import { auth, firestore } from "../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";

export interface UserData {
  email: string;
  firstName: string;
  password: string;
  lastName?: string;
}

/**
 * Registra un nuevo usuario y crea un registro en Firestore.
 * @param {UserData} userData - Datos del usuario.
 * @returns {Promise<UserCredential>}
 */
const register = async (userData: UserData): Promise<UserCredential> => {
  const { email, firstName, lastName, password } = userData;
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  // Crear un registro en Firestore
  const userDocRef = doc(firestore, "users", user.uid);
  await setDoc(userDocRef, {
    email,
    firstName,
    lastName,
    // Puedes añadir más campos si es necesario
  });

  return userCredential;
};

/**
 * Inicia sesión un usuario con email y contraseña.
 * @param {string} email - Email del usuario.
 * @param {string} password - Contraseña del usuario.
 * @returns {Promise<UserCredential>}
 */
const login = (email: string, password: string): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};

/**
 * Cierra la sesión del usuario actual.
 * @returns {Promise<void>}
 */
const logout = (): Promise<void> => {
  return signOut(auth);
};

export { register, login, logout };
