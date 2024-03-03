
import { initializeApp } from "firebase/app";
import {getAuth} from'firebase/auth';
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyBcrGiya9pbcdjSQ-kK6-kalvJy1RU0aVk",
    authDomain: "prepeasy-30bb0.firebaseapp.com",
    projectId: "prepeasy-30bb0",
    storageBucket: "prepeasy-30bb0.appspot.com",
    messagingSenderId: "991631109408",
    appId: "1:991631109408:web:3cd33fe47e60c65c773b45",
    measurementId: "G-CBVC5LLMYR"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)

