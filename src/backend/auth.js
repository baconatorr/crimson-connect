import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, inMemoryPersistence} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCOWkwLtRUGuvq9eeFx8UEVHe2IPVhRaLc",
  authDomain: "crimson-connect-6e130.firebaseapp.com",
  projectId: "crimson-connect-6e130",
  storageBucket: "crimson-connect-6e130.firebasestorage.app",
  messagingSenderId: "1068414032850",
  appId: "1:1068414032850:web:513c73424024dd27db060b",
  measurementId: "G-ZZ3QZ3TP36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, inMemoryPersistence);

export const verifyEmail = async (email) => {
  const apiKey = '6fb0d232f4b12ae9d3f0a455f9690fbd32b63813';
  const url = `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${apiKey}`;
  const response = await fetch(url);
  if (!response.ok) {
      throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.data.status === 'valid';

};

export async function signUp(email, password) {
  try {
    console.log("Signing up with email:", email); // Add logging
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Sign up successful:", userCredential); // Add logging
  } catch (error) {
    console.error("Error during sign up:", error); // Add logging
    if (error.code === 'auth/email-already-in-use') {
      await logIn(email, password);
      return;
    }
    throw error;
  }
}

export async function logIn(email, password) {
  try {
    console.log("Logging in with email:", email); // Add logging
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Log in successful:", userCredential); // Add logging
  } catch (error) {
    console.error("Error during log in:", error); // Add logging
    throw error;
  }
}

export function logError(errorCode) {
  switch (errorCode) {
    case 'auth/invalid-credential':
      return 'The provided credentials are invalid.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/invalid-email':
      return 'Invalid email address.';
    case 'auth/email-already-in-use':
      return 'The email address is already in use by another account.';
    default:
      return 'An unknown error occurred.';
  }
}
