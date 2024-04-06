importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);
import sendRequest from "../src/utility-functions/apiManager";

// "Default" Firebase configuration (prevents errors)
const defaultConfig = {
  apiKey: true,
  projectId: true,
  messagingSenderId: true,
  appId: true,
};

// Initialize Firebase app
firebase.initializeApp(defaultConfig);
const messaging = firebase.messaging();

//Listens for background notifications
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message: ", payload);

  //customise notification
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: payload.data.icon || "/icon.png",
  };

  sendRequest("post", "saveNotification", {
    title: payload.data.title,
    description: payload.data.body,
    read: false,
  });

  self.registration.showNotification(notificationTitle, notificationOptions);
});
