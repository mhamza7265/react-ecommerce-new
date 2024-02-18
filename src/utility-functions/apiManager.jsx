import axios from "axios";
import BASE_URL from "./config";
import { createStandaloneToast } from "@chakra-ui/react";
// const apiKey = import.meta.env.BASE_URL;
const openApis = ["auth/login", "auth/register"];
const { toast } = createStandaloneToast();

const setRequestOptions = (method, url, payload) => {
  // console.log("payload", payload);
  const storedItem = localStorage.getItem("current_user");
  const storedData = JSON.parse(storedItem);
  const filtered = openApis.find((item) => item == url);
  let header = {};
  if (!filtered == undefined) {
    header = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
  } else if (filtered == undefined) {
    header = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: storedData?.token,
      },
    };
  }

  header["method"] = method;
  header["url"] = `${BASE_URL}/${url}`;

  if (method !== "GET") {
    header["data"] = payload;
  } else {
    header["params"] = payload;
  }
  // console.log("headers", header);
  return header;
};

const sendRequest = (method, url, payload) => {
  // console.log(url, payload);
  return new Promise((resolve, reject) => {
    axios
      .request(setRequestOptions(method, url, payload))
      .then((response) => {
        // console.log(url, response);
        resolve(response.data);
      })
      .catch((error) => {
        if (error.response) {
          // console.log("APICatch - ", error.response.data);
        }
        reject(error.response?.data.error);
      });
  });
};

export const successToast = (data) => {
  toast({
    title: data,
    position: "top",
    isClosable: false,
    variant: "top-accent",
    duration: 3000,
    status: "success",
  });
};

export const warningToast = (data) => {
  toast({
    title: data,
    position: "top",
    isClosable: false,
    duration: 3000,
    status: "warning",
  });
};

export const errorToast = (data) => {
  toast({
    title: data,
    position: "top",
    isClosable: false,
    duration: 3000,
    status: "error",
  });
};

export default sendRequest;
