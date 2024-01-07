// auth.ts

import { auth } from '../firebase/firebaseConfig';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  UserCredential 
} from 'firebase/auth';

/**
 * Registra un nuevo usuario con email y contraseña.
 * @param {string} email - Email del usuario.
 * @param {string} password - Contraseña del usuario.
 * @returns {Promise<UserCredential>}
 */
const register = (email: string, password: string): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(auth, email, password);
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
