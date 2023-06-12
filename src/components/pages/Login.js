import Axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
// import emailjs from 'emailjs-com';
import 'react-toastify/dist/ReactToastify.min.css';
import '../../App';
import './Contact.css';
import '../pages/Logins.css'
import './AdminLogin'

const Login = () => {
const [EMAIL, setEmail] = useState('');
const [PASSWORD, setPassword] = useState('');
const [user, setUser] = useState();
const [loginStatus, setLoginStatus] = useState(false);
const [disabled, setDisabled] = useState(false);

Axios.defaults.withCredentials = true;
const navigate = useNavigate();

const {
  register,
  // handleSubmit,
  reset,
  formState: { errors }
} = useForm();

const signup = () =>{
  navigate("/sign-up");
}

const handleSubmit = async e =>{
  e.preventDefault()
  const user = {EMAIL, PASSWORD};
  const rest =  await Axios.post('http://localhost:1337/login', 
   user
  )
  // .then((response)=>{
    // console.log(response);
    try{
    if(!rest.data.auth){
      setLoginStatus(rest.data.message);
    }
    else{
      // console.log(response.data);
      setUser(rest.data);
      localStorage.setItem('user',  rest.data.result[0].EMAIL);
      setLoginStatus(true);
      // const json = JSON.parserest.data)
      console.log(rest.data.result[0].EMAIL)
      // console.log(rest.data.result[0].length)
      navigate("/home");
    }
  }catch(err){
    console.log(err)
  }
  // });
};

useEffect(() => {
  const loggedInUser = localStorage.getItem("user");
  if (loggedInUser) {
    let foundUser = null;
    try{
      foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }catch(e){
      console.warn(e);
    }
    if (!foundUser) return;
  }
}, []);

const userAuth = () =>{
  Axios.get('http://localhost:1337/isUserAuth', {
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
  }).then((response)=>{
    console.log(response);
  });
};

const goToAdmin = () =>{
  navigate('/AdminLogin')
}

  return (
    <>
    <div className="navbar">
      <div className="navbar-container my-new-class2">
       <div className="navbar-logo">
                    MetroRailway <i className="fab fa-typo3" />
                    
                </div>
                </div>
                <button className="btn-primary btn--outline btn--medium my-new-class" buttonStyle='btn--outline' onClick={goToAdmin}>Admin</button>
      </div>
    <div className='ContactForm'>
    <h1>Login to continue to MetroRailway</h1>
      <div className='container'>
        <div className='row'>
          <div className='col-12 text-center'>
            <div className='contactForm'>
                <div className='row formRow'>
                <div className='col-6'>
                    <input
                      type='email'
                      name='email'
                      required
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
                  <div className='col-6'>
                    <input
                      type='password'
                      name='password'
                      required
                      onChange={(e)=>{
                        setPassword(e.target.value)
                      }}
                      className='form-control formInput'
                      placeholder='Password'
                    />
                    {errors.name && <span className='errorMessage'>{errors.name.message}</span>}
                  </div>
            </div>
          </div>
        </div>
      </div>
                </div>
                <button className='submit-btn' onClick={handleSubmit} disabled={disabled} type='submit'>
                  Login
                </button>
                  <h2 className='myHTag'>Don't have an account?</h2>
                <button className='submit-btn' onClick={signup} disabled={disabled} type='submit'>
                  Signup
                </button>
                {loginStatus && <button onClick={userAuth} className='submit-btn'>Check Authentication</button>}
                <h1>{loginStatus}</h1>
    </div></>
  );
};

export default Login;
