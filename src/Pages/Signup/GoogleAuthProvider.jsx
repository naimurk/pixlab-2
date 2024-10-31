import { GoogleOAuthProvider } from "@react-oauth/google";
import SignUpPage from "./Signup";

const clientId = "YOUR_GOOGLE_OAUTH_CLIENT_ID";

function GoogleOAuthProvider() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <SignUpPage />
    </GoogleOAuthProvider>
  );
}

export default GoogleOAuthProvider;
