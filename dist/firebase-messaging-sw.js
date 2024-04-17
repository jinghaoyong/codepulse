importScripts("https://www.gstatic.com/firebasejs/10.10.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.10.0/firebase-messaging-compat.js");

// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyBMkSBbjx7EY4UdMstd0lxFP_bFiSYZR1o",
    authDomain: "zenapp-1d503.firebaseapp.com",
    projectId: "zenapp-1d503",
    storageBucket: "zenapp-1d503.appspot.com",
    messagingSenderId: "973155285777",
    appId: "1:973155285777:web:888c281a07ee953d4eaab0",
    measurementId: "G-9Q9VJ8236D",
    vpaidKey: "BCAEGB7NNML5W34aydTjHOqdCyQc2gB-DsvnOf8Edm8M9cN9-hiVww-iH4A61RfbCpFScFNorv2BTimikjqG7ZI"
});

// Retrieve Firebase Messaging object
const messaging = firebase.messaging();
