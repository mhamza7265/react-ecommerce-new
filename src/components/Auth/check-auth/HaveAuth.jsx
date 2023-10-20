import { Navigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

function HaveAuth({ children }) {
  const toast = useToast();
  var flag = false;
  const storedData = localStorage.getItem("current_user");
  const storedToken = JSON.parse(storedData)?.token;
  if (storedToken !== null && storedToken !== undefined) {
    flag = true;
  } else {
    flag = false;
  }

  if (!flag) {
    toast({
      title: "Login First!",
      position: "top-right",
      isClosable: true,
      duration: 3000,
      status: "warning",
    });
    return <Navigate to="/login" />;
  } else return children;
}

export default HaveAuth;
