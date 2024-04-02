import { getToken } from "firebase/messaging";
import { messaging } from "../firebase/firebaseConfig";
import sendRequest from "./apiManager";

const { VITE_APP_VAPID_KEY } = import.meta.env;

async function requestPermission(admin) {
  //requesting permission using Notification API
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey: VITE_APP_VAPID_KEY,
    });

    //We can send token to server
    console.log("Token generated : ", token);
    sendRequest(
      "post",
      "registerDevice",
      { deviceToken: token },
      undefined,
      admin
    )
      .then((res) => {
        if (res.status) {
          console.log("registerDevice", res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (permission === "denied") {
    //notifications are blocked
    alert("You denied for the notification");
  }
}

export default requestPermission;
