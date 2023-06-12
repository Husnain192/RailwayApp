import React from "react";
// import '../../App'
import Navbar from '../Navbar';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import '../pages/Services.css'

function Services() {
    const [SOURCE_LOCATION, setSourceLocation] = useState('');
    const [DESTINATION_LOCATION, setDestinationLocation] = useState('');
    const [DEPARTURE_TIME, setDepartureTime] = useState('');
    const [EMAIL, setEmail] = useState("");
    const [TRAIN_NUMBER, setTrainNumber] = useState('');
    const [trainList, setTrainList] = useState([]);

    const [disabled, setDisabled] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    Axios.defaults.withCredentials = true;

    // useEffect(() => {
    //     Axios.get('http://localhost:1337/getTrain').then((response)=>{
    //         setTrainList(response.data)
    //     })
    // }, [])

    // const showButton = () =>{
        
    //     var y = document.getElementsByClassName('submit-btn');
    //     if (y.style.display === "none") {
    //         y.style.display = "inline-flex";
    //         console.log("yaha")
    //     } else {
    //         y.style.display = "none";
    //         console.log("yaha2")
    //     }
    // }

    // const x = document.getElementsByClassName('trainClass');
    // var i=0;
    // var y = document.getElementsByClassName('newButton');
    // var len = y.length;

    // function addEvent(x){
    //     x.addEventListener('Click', function(event){
    //         if (y.style.display === "none") {
    //                     y.style.display = "inline-flex";
    //                     console.log("yaha")
    //                 } else {
    //                     y.style.display = "none";
    //                     console.log("yaha2")
    //                 }
    //     })
    // } 

    // for(; i<len; i++){
    //     addEvent(y[i]);
    // }

    // const x = document.getElementsByClassName('trainClass');
    // console.log(x.length)
    // var i=0;
    // var y;

    // function getElementIndex(el) {
    //     return Array.from(el.parentElement.children).indexOf(el)
    //   }

    // var g = document.getElementById('my_div');
    
    
    
    // function index(el) {
        //     return [...el.parentElement.children].indexOf(el);
        //   }

        // const userAuth = () =>{
        //     Axios.get('http://localhost:1337/isUserAuth', {
        //       headers: {
        //         "x-access-token": localStorage.getItem("token"),
        //       },
        //     }).then((response)=>{
        //       console.log(response.data);
        //     });
        //   };
          
        

        // const myFunction=()=>{
        //     Axios.get('http://localhost:1337/login').then((response)=>{
        //       if (response){
        //         //   var mail = response.data.user[0].EMAIL;
        //         //   return response.data.user[0].EMAIL;
        //             console.log(response.data.user[0].EMAIL);
        //             return response.data.user[0].EMAIL;
        //       }
        //     })
        //   }
        
        //   console.log(mail);
        const y = document.getElementsByClassName('newButton');
        const x = document.getElementsByClassName('trainClass');
        
        const handler = (event)=>{
        // console.log(event.currentTarget.dataset.index);
        var i = event.currentTarget.dataset.index;
        // inds = i;
        // console.log(i)
         //will log the index of the clicked item
        //  if (y[i].style.display === "none") {
        //     y[i].style.display = "inline-flex";
        //     // console.log(trainList[i].TRAIN_NUMBER)
        // } else {
        //     y[i].style.display = "none";
        // }
            // console.log(ind)
        // }
    };

    const myHandler = (event)=>{
        // console.log(event.currentTarget.dataset.index);
        var i = event.currentTarget.dataset.index;
        const aNumber = Number(window.prompt("How many tickets do you want to book?", ""));
        // ind = i;
        console.log(trainList[i].TRAIN_NUMBER)
        console.log(aNumber)
        // userAuth()
        // console.log(myFunction())
        // reset();
        // Display success toast
       
        const userData = localStorage.getItem('user');
        // const obj = JSON.parse(userData);

        const user = JSON.parse(JSON.stringify(userData))
        // console.log(userData)
        console.log(user)
        // window.prompt('Tickets not available')
        // window.alert("Tickets not available!")
        // var count = 0;
        // var x;
        var x = {Value: 0};

        Axios.post('http://localhost:1337/ticketbook',  {TRAIN_NUMBER: trainList[i].TRAIN_NUMBER, EMAIL: user, aNumber})
        .then(() => {     
        //    this.Fun();
            }).catch(error=>{
            // console.log(error)
            // x = myFun(count)
        
            alert("Tickets not available!")
        })
        
          if(trainList[i].AVAILABLE_SEATS>=trainList[i].BOOKED_SEATS+aNumber){
              Fun()
          }
          

        //    alert("success");
        //   });
    }

        function Fun(){
                toastifySuccess();
                setDisabled(false);
                setTimeout(() => {console.log("Success")}, 2000);
                reset();
        }
         //will log the index of the clicked item
        //  if (y[i].style.display === "none") {
        //     y[i].style.display = "inline-flex";
        //     // console.log(trainList[i].TRAIN_NUMBER)
        // } else {
        //     y[i].style.display = "none";
        // }
            // console.log(ind)
        // }
    
    // console.log(ind)

    // var textInput = React.createRef(); 

    // var bookTicket = (event) =>{
    //     // alert("Ticket Booked")
    //     // var i = event.currentTarget.dataset.index;
    //     // const i = event.currentTarget.dataset.index;
    //     const aNumber = Number(window.prompt("How many tickets do you want to book?", ""));
    //     // console.log(i);
    //     // Axios.post('http://localhost:1337/ticketbook', {TRAIN_NUMBER: TRAIN_NUMBER,})
    //     // .then(()=>{
    //     //     alert("success");
    //     //   });
        // reset();
        //   // Display success toast
        // toastifySuccess();
        // setDisabled(false);
        // setTimeout(() => {console.log("Success")}, 2000);

    //     // console.log(textInput.current.value); 
    // }

    const toastifySuccess = () => {
        toast('Ticket booked successfully!', {
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
    

    // Array.from(x).forEach(element => {
    //     element.addEventListener('click', () => {
    //         let i = index(element);
    //         // var y = document.getElementById('myBTN');
    //         // showButton();
    //         // for(var i = 0; i<y.length; i++){
    //             // var i = x.indexOf(x)

    //             console.log(i)
                // if (y[i].style.display === "none") {
                //     y[i].style.display = "inline-flex";
                //     // console.log(i)
                // } else {
                //     y[i].style.display = "none";
                //     // console.log(i)
                // // }
    //         }
    //     });
    // });

    const showTrain = () => {
        Axios.get('http://localhost:1337/train').then((response)=>{  
            setTrainList(response.data)
            if(!response){
                alert("No trains available")
                console.log("No")
            }
        })
    }

    const searchTrain = () => {
        try{
            if(parseInt(SOURCE_LOCATION, 10) || SOURCE_LOCATION.length==0 || parseInt(DESTINATION_LOCATION, 10) || DESTINATION_LOCATION.length==0){
                console.log("Err")
                alert("Enter valid source or destination")
            }else{
                Axios.post('http://localhost:1337/train', {
                SOURCE_LOCATION: SOURCE_LOCATION,
                DESTINATION_LOCATION: DESTINATION_LOCATION,
                DEPARTURE_TIME: DEPARTURE_TIME,
                }).then((response)=>{
                    if(response){
                        showTrain();
                        console.log(response);
                    }
                });
            }
        }catch(e){
            console.log(e)
        }
      };

    return(
        <>
        <Navbar />
        <h1 className="services">
            Search For Train
        </h1>
        <div class="index container animated zoomIn">
            <div id="myClass0" className="form contactForm">
                <h1>Book Your Train Ticket</h1>
            </div>

            <div id="myClass" class="index row">
                <div id="tick1" class="field col-sm-6">
                    <label for="from">From: </label>
                    <input id="from" type="text" placeholder="Source Location"  required
                    onChange={(e)=>{
                        setSourceLocation(e.target.value)
                      }}/>
                </div>
                <div id="tick2" class="field col-sm-6">
                    <label for="to">To: </label>
                    <input id="to" type="text"  placeholder="Destination Location" required
                    onChange={(e)=>{
                        setDestinationLocation(e.target.value)
                      }}/>
                </div>
                <div id="tick3" class="field col-sm-6 col-centered">
                    <label for="datepicker">Date: </label>
                    <input id="datepicker" type="date" 
                    onChange={(e)=>{
                        setDepartureTime(e.target.value)
                      }}/>
                </div>
                <button id="tick4" type="submit" className='submit-btn' onClick={searchTrain}>
                  Search
                </button>

                {trainList.map((val, index)=>{
                    return <div data-index={index} key={index} onClick={handler} className="result">
                                <div  className="booktrain"><h3>Train Name: </h3>
                                    <h3> {val.TRAIN_NAME} </h3><h3> Train Number:</h3> 
                                        <h3>{val.TRAIN_NUMBER}</h3>
                                {/* <input ref={textInput} type="number" name="" id="" /> */}
                                <button data-index={index} key={index} id="myBTN"  onClick={myHandler} className="book-btn">Book Now!</button></div>
                            </div>

                })}
            </div>
        </div>
        <ToastContainer />
      </>
    )
}
export default Services;