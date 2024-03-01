import { Navigate } from "react-router-dom";
import sendRequest, { errorToast } from "../../utility-functions/apiManager";
import { useSelector } from "react-redux";

function AdminAuth({ children }) {
  const currentUser = useSelector((state) => state.currentUser.user);
  var flag = false;
  if (currentUser?.role == "admin") {
    flag = true;
  } else {
    flag = false;
  }

  if (!flag) {
    errorToast("No admin privilege, login with correct details");
    return <Navigate to="/admin/login" />;
  } else return children;
}

export default AdminAuth;
