import Main from './components/Main';
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
function App() {
  console.log("")
  return (
  <BrowserRouter>
<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
<Main />
</GoogleOAuthProvider>
  </BrowserRouter>
  );
}

export default App;