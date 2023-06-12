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
import ImageFilter9 from 'material-ui/svg-icons/image/filter-9';

const SignUp = () => {
  const [FIRST_NAME, setFirstName] = useState("");
  const [LAST_NAME, setLastName] = useState("");
  const [CNIC, setCNIC] = useState("");
  const [SEX, setSex] = useState("");
  const [AGE, setAge] = useState("");
  const [EMAIL, setEmail] = useState("");
  const [PHONE_NUMBER, setPhoneNumber] = useState("");
  const [PASSWORD, setPassword] = useState("");
  
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();



  const submitData = () =>{
    try{
      setDisabled(true);
      if(CNIC.length==0){
        toastifyError();
        reset();
        setDisabled(false);
      }else{
      Axios.post('http://localhost:1337/signup', {FIRST_NAME: FIRST_NAME, LAST_NAME: LAST_NAME, CNIC: CNIC, SEX: SEX, AGE: AGE, EMAIL: EMAIL, PHONE_NUMBER: PHONE_NUMBER, PASSWORD: PASSWORD,})
      .then(()=>{
        alert("success");
      });
      reset();
        // Display success toast
      toastifySuccess();
      setDisabled(false);
      setTimeout(() => {  navigate("/"); }, 2000);
      // navigate("/");
    }
    }catch(e){
      alert("please enter valid data");
      console.log(e);
      toastifyError();
    }
  };


  // Function that displays a success toast on bottom right of the page when form submission is successful
  const toastifySuccess = () => {
    toast('Signed Up successfully!', {
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
  toast('Please enter valid data!', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
  };

  // Function called on submit that uses emailjs to send email of valid contact form
  const onSubmit = async (data) => {
    // Destrcture data object
    // const { name, email, subject, message } = data;
    try {
      // Disable form while processing submission
      setDisabled(true);

      // Define template params
      // const templateParams = {
      //   name,
      //   email,
      //   subject,
      //   message
      // };

      // const REACT_APP_SERVICE_ID = "service_9eto36i";
      // const REACT_APP_USER_ID = "Syed";
      // Use emailjs to email contact form data
      // await emailjs.send(
      //   process.env.REACT_APP_SERVICE_ID,
      //   process.env.REACT_APP_TEMPLATE_ID,
      //   templateParams,
      //   process.env.REACT_APP_USER_ID
      // );

      // Reset contact form fields after submission
      reset();
      // Display success toast
      toastifySuccess();
      // Re-enable form submission
      setDisabled(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
    <div className="navbar">
      <div className="navbar-container">
       <div className="navbar-logo">
                    MetroRailway <i className="fab fa-typo3" />
                </div>
                </div>
      </div>
    <div className='ContactForm'>
              <form id='contact-form' action="/Login.js" onSubmit={handleSubmit(submitData)} method="post">
      <h1>Sign up to continue</h1>
      <div className='container'>
        <div className='row'>
          <div className='col-12 text-center'>
            <div className='contactForm'>
                {/* Row 1 of form */}
                <div className='row formRow'>
                  <div className='col-6'>
                    <input
                      type='text'
                      name='name'
                      required="required"
                      onChange={(e)=>{
                        setFirstName(e.target.value)
                      }}
                      className='form-control formInput'
                      placeholder='First Name'
                    />
                    <input
                      type='text'
                      name='name'
                      required="required"
                      onChange={(e)=>{
                        setLastName(e.target.value)
                      }}
 
                      className='form-control formInput'
                      placeholder='Last Name'
                    />
                    <input
                      type='number'
                      name='cnic'
                      required="required"
                      onChange={(e)=>{
                        setCNIC(e.target.value)
                      }}
 
                      className='form-control formInput'
                      placeholder='CNIC number'
                    />
                    <input
                      type='text'
                      name='sex'
                      required="required"
                      onChange={(e)=>{
                        setSex(e.target.value)
                      }}
 
                      className='form-control formInput'
                      placeholder='sex'
                    />
                    <input
                      type='number'
                      name='age'
                      required="required"
                      onChange={(e)=>{
                        setAge(e.target.value)
                      }}
   
                      className='form-control formInput'
                      placeholder='Age'
                    />
                    <input
                      type='number'
                      name='phone'
                      required="required"
                      onChange={(e)=>{
                        setPhoneNumber(e.target.value)
                      }}

                      className='form-control formInput'
                      placeholder='Phone Number'
                    />
                    {errors.name && <span className='errorMessage'>{errors.name.message}</span>}
                  </div>
                  <div className='col-6'>
                    <input
                      type='email'
                      name='email'
                      required="required"
                      onChange={(e)=>{
                        setEmail(e.target.value)
                      }}
                      className='form-control formInput'
                      placeholder='Email address'
                    />
                    {errors.email && (
                      <span className='errorMessage'>Please enter a valid email address</span>
                    )}
                  </div>
                </div>
                {/* Row 2 of form */}
                <div className='row formRow'>
                  <div className='col'>
                    <input
                      type='password'
                      name='password'
                      required="required"
                      onChange={(e)=>{
                        setPassword(e.target.value)
                      }}

                      className='form-control formInput'
                      placeholder='Password'
                    />
                    {errors.password && (
                      <span className='errorMessage'>{errors.password.message}</span>
                    )}
                  </div>
                </div>

                <button type="submit" className='submit-btn' onClick={submitData} disabled={disabled} type='submit'>
                  Sign Up
                </button>
             
            </div>
          </div>
        </div>
      </div>
                </form>
            <ToastContainer />
    </div>
    </>
  );
};

export default SignUp;