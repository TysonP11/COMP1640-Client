import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });

    const { email, password } = formData;

    const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <Fragment>
          <section className='container'>
            <h1 className='large text-primary'>Sign In</h1>
            <p className='lead'>
              <i className='fas fa-user'></i> Sign in with your Account
            </p>
            <form className='form'>
              <div className='form-group'>
                <input
                  type='email'
                  placeholder='Email Address'
                  name='email'
                  value={email}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  placeholder='Password'
                  name='password'
                  value={password}
                  onChange={(e) => onChange(e)}
                  minLength='8'
                />
              </div>
              <input type='submit' className='btn btn-primary' value='Login' />
            </form>
            <p className='my-1'>
              Don't have an Account? <Link to='/register'>Sign Up</Link>
            </p>
          </section>
        </Fragment>
      );
}

export default Login
