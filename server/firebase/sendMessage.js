var admin = require("firebase-admin");

var serviceAccount = require(process.env.GOOGLE_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://stayhub-ac21f.firebase.com",
});

exports.SendMessage = async ({ token, messageData }) => {
  const message = {
    notification: {
      title: messageData?.title,
      body: messageData?.body,
    },
    token: token,
  };
  try {
    if (!token) {
      throw new Error("FCM token is required.");
    }
    const result = await admin.messaging().send(message);
    return result;
  } catch (err) {
    throw new Error(err);
  }
};
