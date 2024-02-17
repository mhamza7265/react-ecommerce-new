import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "./redux/store/store.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { GoogleOAuthProvider } from "@react-oauth/google";

const stripe = await loadStripe(
  "pk_test_51OgnngCZAiYypOnUtpzuyqpnUAilEOQyEk9M8aXZ1zl2sfQV7iWNsbdfvEDhlHbe1iF3lkGosYA6TYFExeYElaM3005kpwWTxc"
);

const options = {
  clientSecret: "hgcxtryufgtkjfcxgrxdtfy",
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="813599049172-c41a2al6qbidi189fnj2i528bt8i93d1.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </ChakraProvider>
);
