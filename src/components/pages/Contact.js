import React from 'react'
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
// import emailjs from 'emailjs-com';
import 'react-toastify/dist/ReactToastify.min.css';
import '../../App';
import './Contact.css';
import '../pages/Login'
import { useNavigate } from 'react-router';
import Axios from 'axios';
import Navbar from '../Navbar';

function Contact() {
    const [SUBJECT, setSubject] = useState("");
    const [MESSAGE, setMessage] = useState("");

    const [disabled, setDisabled] = useState(false);
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors }
    } = useForm();
  

    const sendFeedback = () =>{
        try{
          setDisabled(true);
          if(MESSAGE.length==0 || SUBJECT.length==0){
            toastifyError();
            reset();
            setDisabled(false);
          }else{
            const userData = localStorage.getItem('user');
  
            const user = JSON.parse(JSON.stringify(userData))
            Axios.post('http://localhost:1337/feedback', {SUBJECT: SUBJECT, MESSAGE: MESSAGE, user: user})
            .then(()=>{
              alert("success");
            });
            reset();
              // Display success toast
            toastifySuccess();
            // setDisabled(false);
            setTimeout(() => { setDisabled(false)}, 5000);
          }
          
          // navigate("/");
        }catch(e){
          alert("Blank fields are not allowed");
          console.log(e);
        }
      };
    
    const toastifySuccess = () => {
        toast('Feedback sent successfully!', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          className: 'submit-feedback success',
          toastId: 'notifyToast'
        });
      };

      const toastifyError = () => {
        toast('Blank fields are not allowed!', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        };

    return (
        <>
            <div>
                <Navbar />
                <h1>Leave us a message!</h1>
            </div>

            <div className='ContactForm'>
              <form id='contact-form'>
      <div className='container'>
        <div className='row'>
          <div className='col-12 text-center'>
            <div className='contactForm'>
                {/* Row 1 of form */}
                <div className='row formRow'>
                  <div className='col-6'>
                    <input
                      type='text'
                      name='subject'
                      required="required"
                      onChange={(e)=>{
                        setSubject(e.target.value)
                      }}
                      className='form-control formInput'
                      placeholder='Subject'
                    />
                    <textarea
                      cols="30" rows="10"
                      type='text'
                      name='message'
                      required="required"
                      onChange={(e)=>{
                        setMessage(e.target.value)
                      }}
 
                      className='form-control formInput'
                      placeholder='Message'
                    />
                  </div>
                  </div>
                <button type="submit" className='submit-btn' onClick={sendFeedback} disabled={disabled} type='submit'>
                  submit
                </button>
             
            </div>
          </div>
        </div>
      </div>
                </form>
            <ToastContainer />
    </div>
        </>

    )
}

export default Contact
