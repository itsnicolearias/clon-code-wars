import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { login } from '../services/authService';



// Define Schema of validation with Yup
const loginSchema = Yup.object().shape(
    {
        email: Yup.string().email('Invalid Email Format').required('Email is required'),
        password: Yup.string().required('Password is required')
    }
);


// Login Component
const Login = () => {

    // We define the initial credentials
    const initialCredentials = {
        email: '',
        password: ''
    }

    let navigate = useNavigate();

    return (
        <div className='mb-3'>
            <h4>Login Form</h4>
            {/* Formik to encapsulate a Form */}
            <Formik
                initialValues={ initialCredentials }
                validationSchema = { loginSchema }
                onSubmit={ async(values) => {
                    login(values.email, values.password).then(async (response) => {
                        if(response.status === 200){
                            if(response.data.token){
                                await sessionStorage.setItem('sessionJWTToken', response.data.token);
                                navigate('/');
                            }else{
                                throw new Error('Error generating Login Token')
                            }
                        }else{
                            throw new Error('Invalid Credentials')
                        }
                    }).catch((error) => console.error(`[LOGIN ERROR]: Something went wrong: ${error}`))
                }}
            >
                {
                    ({ values, touched, errors, isSubmitting, handleChange, handleBlur }) => (
                  
                        <Form>
                            {/* Email Field */}
                            <div className='form-group mb-3'>
                            <label htmlFor='email' >Email</label>
                            <Field id='email' type='email' className='form-control' name='email' placeholder='example@email.com' />

                            {/* Email Errors */}
                            {
                                errors.email && touched.email && (
                                    <ErrorMessage name='email' component='div'></ErrorMessage>
                                )
                            } 
                            </div>
                            {/* Password Field */}
                            <div className='form-group'>
                            <label htmlFor='password' >Password</label>
                            <Field id='password' type='password' className='form-control' name='password' placeholder='example' />

                            {/* Password Errors */}
                            {
                                errors.password && touched.password && (
                                    <ErrorMessage name='password' component='div'></ErrorMessage>
                                )
                            }
                          </div>
                            {/* SUBMIT FORM */}
                            <button type='submit'className='btn btn-primary' >Login</button>

                            {/* Message if the form is submitting */}
                            {
                                isSubmitting ? 
                                    (<p>Checking credentials...</p>) 
                                    : null
                            }

                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}

export default Login;
