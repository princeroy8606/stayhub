import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getToken, getMessaging, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDM_TiYybQphKpeSgZUkuVHyIucYtsT3t4",
  authDomain: "stayhub-ac21f.firebaseapp.com",
  projectId: "stayhub-ac21f",
  storageBucket: "stayhub-ac21f.appspot.com",
  messagingSenderId: "419932766313",
  appId: "1:419932766313:web:594c98d991b9629b1c62f8",
  measurementId: "G-0WZSX8YN3S",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const RequestPermission = () => {
  return Notification.requestPermission().then((Permission) => {
    if (Permission == "granted") {
      console.log("permission granted by the user ");
      return getToken(messaging, {
        validKey:
          "BL2PdozEJ-Duzd35qFLnYqH5Fr0BCZLJ5eEmCtipQbGSSlBVTdHu9MG8zX1nGJhudAaPWnen-zz--aQbmkkr2xc",
      })
    } else {
      console.log("user Permission denied");
    }
  });
};
