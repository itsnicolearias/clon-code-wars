import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


import { register } from '../services/authService';


const Register = () => {

    const initialValues = {
        name: '',
        username: '',
        email: '',
        password: '',
        confirm: ''
        
    }


    // Yup Validation Schema
    const registerSchema = Yup.object().shape(
        {
            name: Yup.string()
                
                .required(' is required'),
            username: Yup.string()
                .min(6, 'Username must have 6 letters minimum')
                .max(12, 'Username must have maximum 12 letters')
                .required('Username is required'),
            email: Yup.string()
                .email('Invalid email format')
                .required('Email is required'),
            password: Yup.string()
                .min(8, 'Password too short')
                .required('Password is required'),
            confirm: Yup.string().when("password", {
                is: (value) => (value && value.length > 0 ? true : false),
                then: Yup.string().oneOf(
                    [Yup.ref("password")], 'Passwords must match'
                )
                })
                .required('You mus confirm your password'),
           
        }
    );


    return (
        <div>
            <h4>Register as a new user</h4>
            {/* Formik wrapper */}
            <Formik
                initialValues={ initialValues }
                validationSchema = { registerSchema }
                onSubmit={ async(values) => {
                    register(values.name, values.email, values.password, values.username).then((response) => {
                        if(response.status === 200){
                            console.log('User registered correctly')
                            console.log(response.data);
                            alert('User registered correctly');
                        }else{
                            throw new Error('Error in registry')
                        }
                    }).catch((error) => console.error(`[Register ERROR]: Something went wrong: ${error}`))
                }}
            >

                {
                    ({ values, touched, errors, isSubmitting, handleChange, handleBlur }) => (
                        <Form>
                          <div className='from-group'>
                            {/* Name Field */}
                            <label htmlFor='name' >Name</label>
                            <Field id='name' type='text' className='form-group' name='name' placeholder='Your Name' />

                            {/* Name Errors */}
                            {
                                errors.name && touched.name && (
                                    <ErrorMessage name='name' component='div'></ErrorMessage>
                                )
                            }
                          </div>
                          <div className='form-group'>
                             <label htmlFor='username' >Username</label>
                            <Field id='username' type='text' className='form-control' name='username' placeholder='Your Userame' />

                            {/* Name Errors */}
                            {
                                errors.username && touched.username && (
                                    <ErrorMessage name='username' component='div'></ErrorMessage>
                                )
                            }
                          </div>

                          <div className='form-group'>

                            {/* Email Field */}
                            <label htmlFor='email' >Email</label>
                            <Field id='email' type='email' className='form-control' name='email' placeholder='example@email.com' />

                            {/* Email Errors */}
                            {
                                errors.email && touched.email && (
                                    <ErrorMessage name='email' component='div'></ErrorMessage>
                                )
                            }
                          </div>
                          <div className='form-group'>
                            {/* Password Field */}
                            <label htmlFor='password' >Password</label>
                            <Field id='password' className='form-control' type='password' name='password' placeholder='Password' />

                            {/* Password Errors */}
                            {
                                errors.password && touched.password && (
                                    <ErrorMessage name='password' component='div'></ErrorMessage>
                                )
                            }
                          </div>
                          <div className='form-group'>
                            {/* Confirm Password Field */}
                            <label htmlFor='confirm' >Confirm Password</label>
                            <Field id='confirm' className='form-control' type='password' name='confirm' placeholder='Confirm your password' />

                            {/* Confim Password Errors */}
                            {
                                errors.confirm && touched.confirm && (
                                    <ErrorMessage name='confirm' component='div'></ErrorMessage>
                                )
                            }
|                         </div>

                            
                            {/* SUBMIT FORM */}
                            <button type='submit' className='btn btn-primary' >Register</button>

                            {/* Message if the form is submitting */}
                            {
                                isSubmitting ? 
                                    (<p>Sending data to registry...</p>) 
                                    : null
                            }

                        </Form>
                    )
                }
            </Formik>
        </div>
    )

}


export default Register;
