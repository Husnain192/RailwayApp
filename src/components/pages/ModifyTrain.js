import React from 'react'
import AdminNav from './AdminNav'
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

function ModifyTrain() {
    const [TRAIN_NUMBER, setTrainNumber] = useState("");
    const [TRAIN_NAME, setTrainName] = useState("");
    const [ARRIVAL_TIME, setArrivalTime] = useState("");
    const [DEPARTURE_TIME, setDepartureTime] = useState("");
    const [SOURCE_LOCATION, setSouceLocation] = useState("");
    const [DESTINATION_LOCATION, setDestinationLocation] = useState("");
    const [AVAILABLE_SEATS, setAvailableSeats] = useState("");
    const [BOOKED_SEATS, setBookedSeats] = useState("");
    const [ADMIN_KEY, setAdminKey] = useState("");
    const [TYPE, setType] = useState("");
    const [STATION_NAME, setStationName] = useState("");

    const [disabled, setDisabled] = useState(false);
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors }
    } = useForm();
  

    const changeTrainInfo = () =>{
        try{
          setDisabled(true);
          if(TRAIN_NUMBER.length == 0 || TRAIN_NAME.length == 0 || SOURCE_LOCATION.length == 0 || DESTINATION_LOCATION.length == 0){
            alert("Please fill out form completely")
         }else{
          Axios.post('http://localhost:1337/modifytrain', {TRAIN_NUMBER: TRAIN_NUMBER, TRAIN_NAME: TRAIN_NAME, ARRIVAL_TIME: ARRIVAL_TIME, DEPARTURE_TIME: DEPARTURE_TIME, SOURCE_LOCATION: SOURCE_LOCATION, DESTINATION_LOCATION: DESTINATION_LOCATION, AVAILABLE_SEATS: AVAILABLE_SEATS, BOOKED_SEATS: BOOKED_SEATS, ADMIN_KEY: ADMIN_KEY, TYPE: TYPE, STATION_NAME: STATION_NAME,})
          .then(()=>{
            alert("success");
          });
          reset();
            // Display success toast
          toastifySuccess();
          setTimeout(() => { setDisabled(false)}, 5000);
          // navigate("/");
        }}catch(e){
          alert("please enter valid data");
          console.log(e);
        }
      };
    
    const toastifySuccess = () => {
        toast('Train info changed successfully!', {
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
    return (
        <>
            <div>
                <AdminNav />
                <h1>Please Enter a new info for an existing train you want to change</h1>
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
                      name='trainNumber'
                      required="required"
                      onChange={(e)=>{
                        setTrainNumber(e.target.value)
                      }}
                      className='form-control formInput'
                      placeholder='Train Number'
                    />
                    <input
                      type='text'
                      name='name'
                      required="required"
                      onChange={(e)=>{
                        setTrainName(e.target.value)
                      }}
 
                      className='form-control formInput'
                      placeholder='Train Name'
                    />
                    <input
                      type='datetime-local'
                      name='arrival'
                      required="required"
                      onChange={(e)=>{
                        setArrivalTime(e.target.value)
                      }}
 
                      className='form-control formInput'
                      placeholder='Arrival Time'
                    />
                    <input
                      type='datetime-local'
                      name='departure'
                      required="required"
                      onChange={(e)=>{
                        setDepartureTime(e.target.value)
                      }}
 
                      className='form-control formInput'
                      placeholder='Departure Time'
                    />
                    <input
                      type='location'
                      name='source'
                      required="required"
                      onChange={(e)=>{
                        setSouceLocation(e.target.value)
                      }}
   
                      className='form-control formInput'
                      placeholder='Source Location'
                    />
                    <input
                      type='location'
                      name='destination'
                      required="required"
                      onChange={(e)=>{
                        setDestinationLocation(e.target.value)
                      }}

                      className='form-control formInput'
                      placeholder='Destination Location'
                    />
                  </div>
                  <div className='col-6'>
                    <input
                      type='number'
                      name='available'
                      required="required"
                      onChange={(e)=>{
                        setAvailableSeats(e.target.value)
                      }}
                      className='form-control formInput'
                      placeholder='Available Seats'
                    />
                  </div>
                </div>
                {/* Row 2 of form */}
                <div className='row formRow'>
                  <div className='col'>
                    <input
                      type='number'
                      name='booked'
                      required="required"
                      onChange={(e)=>{
                        setBookedSeats(e.target.value)
                      }}

                      className='form-control formInput'
                      placeholder='Booked Seats'
                    />
                  </div>
                </div>
                <div className='row formRow'>
                  <div className='col'>
                    <input
                      type='password'
                      name='adminkey'
                      required="required"
                      onChange={(e)=>{
                        setAdminKey(e.target.value)
                      }}

                      className='form-control formInput'
                      placeholder='Admin Key'
                    />
                  </div>
                </div>
                <div className='row formRow'>
                  <div className='col'>
                    <input
                      type='name'
                      name='type'
                      required="required"
                      onChange={(e)=>{
                        setType(e.target.value)
                      }}

                      className='form-control formInput'
                      placeholder='Type'
                    />
                  </div>
                </div>
                <div className='row formRow'>
                  <div className='col'>
                    <input
                      type='location'
                      name='station'
                      required="required"
                      onChange={(e)=>{
                        setStationName(e.target.value)
                      }}

                      className='form-control formInput'
                      placeholder='Station Name'
                    />
                  </div>
                </div>

                <button type="submit" className='submit-btn' onClick={changeTrainInfo} disabled={disabled} type='submit'>
                  Submit
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

export default ModifyTrain
