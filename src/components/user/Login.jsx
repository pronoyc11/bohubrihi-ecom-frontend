import { useState } from "react";
import Layout from "../Layout";
import { login, loginWithGoogle } from "../../api/apiAuth";
import { showErrors, showLoading } from "../../utils/messages";
import { Navigate, useNavigate } from "react-router";
import { authenticate, isAuthenticated } from "../../utils/auth";
import classes from "./social.module.css";
import { API } from "../../utils/config";
import { FacebookProvider, LoginButton } from 'react-facebook';
import axios from "axios";
import fbclasses from "./Facebook.module.css";

import jwt_decode from "jwt-decode";

import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: false,
    loading: false,
    disabled: false,
    redirect: false,
  });

  const { email, password, loading, error, redirect, disabled } = values;

  const handleChange = (e) => {
    setValues({
      ...values,
      error: false,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setValues({
      ...values,
      error: false,
      loading: true,
      disabled: true,
    });
    login({ email, password })
      .then((response) => {
        authenticate(response.data.token,()=>{
          setValues({
            name: "",
            email: "",
            password: "",
            error: false,
            loading: false,
            disabled: false,
            success: true,
            redirect: true,
          });
        })
      })
      .catch((err) => {
        let errorMsg = "Something went wrong!";
        if (err.response) {
          errorMsg = err.response.data;
        }
        setValues({
          ...values,
          error: errorMsg,
          loading: false,
          disabled: false,
        });
      });
  };

  const signInForm = () => (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="form-group">
        <label className="text-muted">Email:</label>
        <input
          name="email"
          type="email"
          className="form-control"
          value={email}
          required
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password:</label>
        <input
          name="password"
          type="password"
          className="form-control"
          value={password}
          required
          onChange={(e) => handleChange(e)}
        />
      </div>
      <button
        type="submit"
        className="btn btn-outline-primary"
        disabled={disabled}
      >
        Login
      </button>
    </form>
  );
  const navigateUser = () => {
    if (redirect){
      return <Navigate to="/" />
    }
    if(isAuthenticated()){
      return <Navigate to="/" />
    }
  };


  const google = () =>{
   console.log(window.open(`${API}/auth/google`,"_self"));
  //  axios.get(`${API}/auth/google`)
  //  .then(res => console.log(res))
  //  .catch(err=>console.log(err));
   

  }
  const responseGoogle = (response) => {
    console.log(response);
  }



  async function handleSuccess(response) {
    try {
   
      var result = await axios.post(`${API}/auth/facebook`, {
        userId: response.authResponse.userID,
        accessToken: response.authResponse.accessToken
      })
      authenticate(result.data.token,()=>{
        setValues({
          name: "",
          email: "",
          password: "",
          error: false,
          loading: false,
          disabled: false,
          success: true,
         redirect: true,
        });
      }); 
    } catch (error) {
      let errorMsg = "Something went wrong!"
      if(error.response){
          errorMsg = error.response.data ;
      }
      setValues({
        ...values,
        error: errorMsg,
        loading: false,
        disabled: false,
      }) 
    
    
    }
  }
  
  function handleError(error) {
    console.log(error);
    setValues({
      ...values,
      error: "Fb is not initialized!",
      loading: false,
      disabled: false,
    }) 
  }
  
  return (
    <Layout title="Login" className="container col-md-8 offset-md-2">
      {navigateUser()}
      {showLoading(loading)}
      {showErrors(error, error)}
      <h3>Login Here,</h3>
      <hr />
      {signInForm()}
      <hr />
      <p className={classes.or}>Or,</p>
            <div className={classes.container}>

        {/* <a href={`${API}/auth/facebook`} style={{textDecoration:"none"}}>
        <div className={classes.googleBtn}>
                <div className={classes.gooleBtnWrapper}>
                    <img className={classes.googleIconfb}
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Facebook_icon_2013.svg/300px-Facebook_icon_2013.svg.png" />
                </div>
                <p className={classes.btnText}><b>Sign in with facebook</b></p>
            </div>
        </a> */}
        <GoogleLogin
          onSuccess={credentialResponse => {
         const userData = jwt_decode(credentialResponse.credential);
         if(userData.email_verified){
          const sendAbleData = {
            name:userData.name,
            email:userData.email,
            password:"googlePassword"
           }
   loginWithGoogle(sendAbleData)
                  .then(response=>{
                    authenticate(response.data.token,()=>{
                      setValues({
                        name: "",
                        email: "",
                        password: "",
                        error: false,
                        loading: false,
                        disabled: false,
                        success: true,
                        redirect: true,
                      });
                    })
                  })
                  .catch(err=>{
                    let errorMsg = "Something went wrong!";
                    if (err.response) {
                      errorMsg = err.response.data;
                    }
                    setValues({
                      ...values,
                      error: errorMsg,
                      loading: false,
                      disabled: false,
                    });
                  

                  })


         }else{
          let errorMsg = "Something went wrong!";
          setValues({
            ...values,
            error: errorMsg,
            loading: false,
            disabled: false,
          });
         }
 
          }}
          onError={(err) => {
            let errorMsg = "Something went wrong!";
            setValues({
              ...values,
              error: errorMsg,
              loading: false,
              disabled: false,
            });
          
          }}
        />
         {/* <GoogleLogin
    clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  /> */}
{/* <FacebookLogin
  appId="371739821857690"
  loginOptions={{
    return_scopes: true,
  }}
  onSuccess={(response) => {
    console.log('Login Success!', response);
  }}
  onFail={(error) => {
    console.log('Login Failed!', error);
  }}
  onProfileSuccess={(response) => {
    console.log('Get Profile Success!', response);
  }}
/> */}
 <FacebookProvider appId="371739821857690">
        <LoginButton
          className={fbclasses.fbStyle}
          onError={handleError}
          onSuccess={handleSuccess}
        >
          Login via Facebook
        </LoginButton>
      </FacebookProvider>

    </div>
    </Layout>
  );
};

export default Login;
