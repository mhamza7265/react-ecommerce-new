import { GoogleLogin } from "react-google-login";
import { GOOGLE_CLIENT_ID } from "../../../utility-functions/config";

const GoogleLoginButton = ({ onSuccess, onFailure }) => {
  return (
    <GoogleLogin
      clientId={GOOGLE_CLIENT_ID}
      buttonText="Login with Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleLoginButton;
