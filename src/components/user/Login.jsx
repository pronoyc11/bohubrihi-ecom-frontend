import { useState } from "react";
import Layout from "../Layout";
import { login } from "../../api/apiAuth";
import { showErrors, showLoading } from "../../utils/messages";
import { Navigate, useNavigate } from "react-router";
import { authenticate, isAuthenticated } from "../../utils/auth";

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
  return (
    <Layout title="Login" className="container col-md-8 offset-md-2">
      {navigateUser()}
      {showLoading(loading)}
      {showErrors(error, error)}
      <h3>Login Here,</h3>
      <hr />
      {signInForm()}
      <hr />
    </Layout>
  );
};

export default Login;
