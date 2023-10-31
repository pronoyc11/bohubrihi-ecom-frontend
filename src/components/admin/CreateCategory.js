import React, { useState } from 'react';
import Layout from '../Layout';
import { showError, showErrors, showLoading, showSuccess } from '../../utils/messages';
import { Link } from 'react-router-dom';
import { createCategory } from '../../api/apiAdmin';
import { userInfo } from '../../utils/auth';

const CreateCategory = () => {
    const [values, setValues] = useState({
        name: '',
        error: false,
        success: false,
        loading:false
    });

    const { name, error, success,loading } = values;

    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({
            ...values,
            loading:true,
        })
        createCategory(userInfo().token,{name:name})
        .then(response=>{
            setValues({
                ...values,
                success:true,
                error:false,
                loading:false
            })
        })
        .catch(err=>{
            if(err.response){
          setValues({
            ...values,
            loading:false,
            error:"Something went wrong!",
            success:false
          })
            }else{
                setValues({
                ...values,
                loading:false,
                error:"Something went wrong!",
                success:false
              })
            }
        })
    }

    const handleChange = (e) => {
        setValues({
            ...values, [e.target.name]: e.target.value,
            error:false
        })
    }

    const categoryForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input
                        name="name"
                        type="text"
                        onChange={handleChange}
                        value={name}
                        autoFocus
                        required
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-outline-primary">Create Category</button>
            </form>
        )
    }

    const goBack = () => (<div className="mt-5">
        <Link to="/admin/dashboard" className="text-warning">Go to Dashboard</Link>
    </div>)


    return (
        <Layout title="Add a new category" description="Ready to add a new category?">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading(loading)}
                    {showErrors(error, error)}
                    {showSuccess(success, 'Category Created!')}
                    {categoryForm()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    );

}

export default CreateCategory;