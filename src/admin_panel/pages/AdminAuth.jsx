import { Navigate } from "react-router-dom";
import { errorToast } from "../../utility-functions/apiManager";
import { jwtDecode } from "jwt-decode";

function AdminAuth({ children }) {
  var flag = false;
  const storedData = localStorage.getItem("admin_user");
  const storedToken = JSON.parse(storedData)?.token;
  if (storedToken) {
    const userRole = jwtDecode(storedToken);
    if (userRole.role == "admin" || userRole.role == "superAdmin") {
      flag = true;
    } else {
      flag = false;
    }
  } else {
    flag = false;
  }

  if (!flag) {
    errorToast("No admin privilege, login with correct details");
    return <Navigate to="/admin/login" />;
  } else return children;
}

export default AdminAuth;
