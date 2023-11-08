import { useState } from 'react';
import Layout from '../Layout';
import { loginWithGoogle, register } from '../../api/apiAuth';
import { showErrors, showLoading } from '../../utils/messages';
import { Link, Navigate } from 'react-router-dom';
import { authenticate, isAuthenticated } from '../../utils/auth';
import { API } from '../../utils/config';
import classes from "./social.module.css";
import fbclasses from "./Facebook.module.css";
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { FacebookProvider, LoginButton } from 'react-facebook';
import axios from 'axios';

const Register = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: false,
        loading: false,
        disabled: false,
        success: false
    });

    const { name, email, password, success, error, loading, disabled } = values;

    const handleChange = (e) =>{
        setValues({
            ...values,
            error:false,
            [e.target.name]:e.target.value
        })
    }

const handleSubmit = (e)=>{
     e.preventDefault();

     setValues({
        ...values,
        error: false,
        loading: true,
        disabled: true
     })
     register({name,email,password})
      .then(response=>{
        setValues({
            name: '',
            email: '',
            password: '',
            error: false,
            loading: false,
            disabled: false,
            success: true
        })
      }).catch(err=>{
        let errorMsg = "Something went wrong!"
        if(err.response){
            errorMsg = err.response.data ;
        }
        setValues({
            ...values,
            error:errorMsg,
            loading:false,
            disabled:false
        })
      })
}

    const signUpForm = () => (
        <form onSubmit={e=>handleSubmit(e)}>
            <div className="form-group">
                <label className="text-muted">Name:</label>
                <input type="text" name="name" className="form-control"
                    value={name} required onChange={e=>handleChange(e)} />
            </div>
            <div className="form-group">
                <label className="text-muted">Email:</label>
                <input type="email" name="email" className="form-control"
                    value={email} required onChange={e=>handleChange(e)} />
            </div>
            <div className="form-group">
                <label className="text-muted">Password:</label>
                <input type="password" name="password" className="form-control"
                    value={password} required onChange={e=>handleChange(e)} />
            </div>
            <button type="submit" className="btn btn-primary" disabled={disabled}>Create Account</button>
        </form>
    );
const showSuccess = () =>{
    if(success) return <div className="alert alert-primary">
        New account created.Please <Link to="/login" >Log in</Link>.
    </div>
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
        // redirect: true,
      });
    }); 
  } catch (error) {
    let errorMsg = "Something went wrong!"
    if(error.response){
        errorMsg = error.response.data ;
    }    }
}

function handleError(error) {
  console.log(error);
}






    return (
        <Layout title="Register" className="container col-md-8 offset-md-2">
        {isAuthenticated() && <Navigate to="/" />}
        {showSuccess()}
        {showLoading(loading)}
        {showErrors(error,error)}
            <h3>Register Here</h3>
            <hr />
            {signUpForm()}
            <hr />
            <p className={classes.or}>Or,</p>
            <div class={classes.container}>
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
                        // redirect: true,
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
       {/* <FacebookLogin
  appId="371739821857690"
  loginOptions={{
    return_scopes: false,
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
}

export default Register;