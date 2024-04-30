import {
    initializeApp
}
from "firebase/app";

import{
    getFirestore,collection 
}
from "firebase/firestore";
export const firebaseApp = initializeApp({
    apiKey: "AIzaSyAycyUKCeSy1K71XNbVH73bfyGp41XpOnY",
    authDomain: "websiteforclub.firebaseapp.com",
    projectId: "websiteforclub",
    storageBucket: "websiteforclub.appspot.com",
    messagingSenderId: "357291631284",
    appId: "1:357291631284:web:76a37ae95909e567f6ede1"
    
  });
    export const db = getFirestore(firebaseApp);
    export const userRef = collection(db,"Users");
    export const projectRef = collection(db,"Projects");
    export const joinRequestRef = collection(db,"JoinRequests");