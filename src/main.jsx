import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "./redux/store/store.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripe = await loadStripe(
  "pk_test_51OgnngCZAiYypOnUtpzuyqpnUAilEOQyEk9M8aXZ1zl2sfQV7iWNsbdfvEDhlHbe1iF3lkGosYA6TYFExeYElaM3005kpwWTxc"
);

const options = {
  clientSecret: "hgcxtryufgtkjfcxgrxdtfy",
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ChakraProvider>
);
