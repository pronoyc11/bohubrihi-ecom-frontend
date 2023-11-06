import { useGoogleLogin } from "@react-oauth/google";

export const MyGoogleLogi = () => {
 
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      
      console.log(codeResponse)
    },
    onError: (error) => console.log("Login Failed:", error)
  });
};

