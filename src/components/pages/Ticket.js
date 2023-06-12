import React from 'react'
import Navbar from '../Navbar'
import Axios from 'axios';
import { useEffect, useState } from 'react';

function Ticket() {
    const [ticketList, setTicketList] = useState([]);
    const [TICKET_NUMBER, setTicketNumber] = useState('');
    const [TRAIN_NUMBER, setTrainNumber] = useState('');
    const [user, setUser] = useState();
    Axios.defaults.withCredentials = true;


    // const userAuth = () =>{
    //     // Axios.get('http://localhost:1337/login').then((response)=>{
    //     //     // if (response.data.loggedIn === true){
    //     //       console.log(response.data.user[0].EMAIL);
    //     //     // }
    //     //   })
    //     const userData = localStorage.getItem('user');
    //     // const obj = JSON.parse(userData);

    //     const user = JSON.parse(JSON.stringify(userData))
    //     // console.log(userData)
    //     console.log(user)
    //   };
      
    // const myFun=()=>{
    //     Axios.get('http://localhost:1337/login').then((response)=>{
    //     //   if (response.data.loggedIn === true){
    //         console.log(response.data.user[0].EMAIL);
    //     //   }
    //     })
    //   }
      

    // const myFunction=()=>{
    //     Axios.get('http://localhost:1337/login').then((response)=>{
    //     //   if (response.data.loggedIn === true){
    //         console.log(response.data.user[0].EMAIL);
    //     //   }
    //     })
    //   }

    // const myFunction = () =>{
    //     var a = localStorage.getItem("token");
    //     console.log(a)
    // }

    setTimeout(() => {
        searchTicket();
      }, 100);

    const searchTicket = () =>{
        const userData = localStorage.getItem('user');
        // const obj = JSON.parse(userData);

        const user = JSON.parse(JSON.stringify(userData))
        // console.log(user)
        Axios.get('http://localhost:1337/viewbooked',{params:{user: user}}).then((response)=>{  
            setTicketList(response.data)
            // console.log(response.data)
        })
    }
    const deleteTicket=(event)=>{
        var i = event.currentTarget.dataset.index;
        const userData = localStorage.getItem('user');
        // const obj = JSON.parse(userData);

        const user = JSON.parse(JSON.stringify(userData))
        console.log(user);console.log(ticketList[i].TRAIN_NUMBER);console.log(ticketList[i].TICKET_NUMBER);
        Axios.delete('http://localhost:1337/deleteticket',  {params: {TRAIN_NUMBER: ticketList[i].TRAIN_NUMBER, TICKET_NUMBER: ticketList[i].TICKET_NUMBER ,user: user}})
        .then((response)=>{
            console.log("success");
        })
    }
    return (
        <div>
            <Navbar />
            <h1>Your tickets</h1>
            {/* searchTicket() */}
            {/* <button onClick={searchTicket}>Show</button> */}
            <div className='table-alignment'>
            <table className='content-table'>
                <thead>
                    <tr>
                        <th>TRAIN_NAME</th>
                        <th>SEAT_NUMBER</th>
                        <th>STATION</th>
                        <th>FARE</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {ticketList.map((val, index)=>( 
                <tr data-index={index} key={index}>
                               <td>{val.TRAIN_NAME}</td>
                               <td>{val.TICKET_NUMBER}</td>
                               <td>{val.STATION_NAME}</td>
                               <td>{val.FARE}</td>
                               <td><button data-index={index} key={index} className='delete-btn' onClick={deleteTicket}>Delete</button></td>
                </tr>
                  )
                 )}    
                </tbody>
            </table>
            </div>
            {/* {ticketList.map((val)=>{
                    return<div>
                    <div> 
                        <h1>TRAIN_NAME: {val.TRAIN_NAME} | SEAT_NUMBER: {val.TICKET_NUMBER} | STATION: {val.STATION_NAME} | FARE: {val.FARE}</h1>
                        <button className='submit-btn' onClick={()=>{
                            deleteTicket(val.TICKET_NUMBER,val.TRAIN_NUMBER);
                        }}>Delete</button>
                    </div>
                    </div>
                })} */}
        </div>
    )
}

export default Ticket