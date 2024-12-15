// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
const analytics = getAnalytics(app);

const verifyEmail = async (email) => {
  const apiKey = '6fb0d232f4b12ae9d3f0a455f9690fbd32b63813';
  const url = `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${apiKey}`;

  try {
    // Make the GET request to the API
    const response = await fetch(url);
    
    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Parse the JSON response
    const data = await response.json();

    // Check if the email is valid
    return data.data.status === 'valid';
  } catch (error) {
    console.error('Error verifying email:', error);
    return false;
  }
};

export async function signUpNewUser(email, password) {

}

