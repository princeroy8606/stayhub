importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyDM_TiYybQphKpeSgZUkuVHyIucYtsT3t4",
  authDomain: "stayhub-ac21f.firebaseapp.com",
  projectId: "stayhub-ac21f",
  storageBucket: "stayhub-ac21f.appspot.com",
  messagingSenderId: "419932766313",
  appId: "1:419932766313:web:594c98d991b9629b1c62f8",
  measurementId: "G-0WZSX8YN3S",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
