import { Navigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

function AdminAuth({ children }) {
  const toast = useToast();
  var flag = false;
  const storedData = localStorage.getItem("current_user");
  const storedToken = JSON.parse(storedData)?.token;
  const admin = localStorage.getItem("admin");
  if (storedToken !== null && storedToken !== undefined && admin) {
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
    return <Navigate to="/admin/login" />;
  } else return children;
}

export default AdminAuth;
