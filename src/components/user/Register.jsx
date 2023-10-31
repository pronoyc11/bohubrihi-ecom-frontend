import { useState } from 'react';
import Layout from '../Layout';
import { register } from '../../api/apiAuth';
import { showErrors, showLoading } from '../../utils/messages';
import { Link, Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth';

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
        </Layout>
    );
}

export default Register;