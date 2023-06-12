import React from 'react'
import Axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import AdminHome from './AdminHome';

function AdminLogin() {
    const [ADMIN_NAME, setAdminName] = useState('');
    const [ADMIN_KEY, setAdminKey] = useState('');
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();

    
const {
    register,
    // handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

    const goToUser = () =>{
        navigate('/');
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        const res =  await Axios.post('http://localhost:1337/admin', {ADMIN_NAME: ADMIN_NAME, ADMIN_KEY: ADMIN_KEY})
        .then(()=>{
            navigate('/AdminHome')
        }).catch((err)=>{
            alert(err);
        })
      };
      

    return (
        <>
            <div className="navbar">
                <div className="navbar-container my-new-class2">
                    <div className="navbar-logo">
                            MetroRailway <i className="fab fa-typo3" />
                            <button className="btn-primary btn--outline btn--medium my-new-class" buttonStyle='btn--outline' onClick={goToUser}>User</button>
                        </div>
                    </div>
            </div>

            <div className='ContactForm'>
    <h1>Welcome Admin</h1>
      <div className='container'>
        <div className='row'>
          <div className='col-12 text-center'>
            <div className='contactForm'>
                <div className='row formRow'>
                <div className='col-6'>
                    <input
                      type='name'
                      name='name'
                      required
                      onChange={(e)=>{
                        setAdminName(e.target.value)
                      }}
                      className='form-control formInput'
                      placeholder=''
                    />
                    {errors.email && (
                      <span className='errorMessage'>Please enter a valid name</span>
                    )}
                  </div>
                  <div className='col-6'>
                    <input
                      type='password'
                      name='password'
                      required
                      onChange={(e)=>{
                        setAdminKey(e.target.value)
                      }}
                      className='form-control formInput'
                      placeholder=''
                    />
                    {errors.name && <span className='errorMessage'>{errors.name.message}</span>}
                  </div>
            </div>
          </div>
        </div>
      </div>
                </div>
                <button className='submit-btn' disabled={disabled} type='submit' onClick={handleSubmit}>
                  Login
                </button>
    </div>
        </>
    )
}

export default AdminLogin
