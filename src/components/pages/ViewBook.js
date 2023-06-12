import React from 'react'
import AdminNav from './AdminNav'
import Axios from 'axios';
import { useEffect, useState } from 'react';

function ViewBook() {
    const [ticketList, setTicketList] = useState([]);
    Axios.defaults.withCredentials = true;

    setTimeout(() => {
        searchTrain();
      }, 100);

    const searchTrain = () =>{
        Axios.get('http://localhost:1337/viewtickets').then((response)=>{  
            setTicketList(response.data)
        })
    }

    return (
        <div>
            <AdminNav />
            <h1>All Booked Tickets</h1>
            <div className='table-alignment'>
            <table className='content-table'>
                <thead>
                    <tr>
                        <th>TRAIN_NAME</th>
                        <th>TICKET_NUMBER</th>
                        <th>CNIC</th>
                        <th>NAME</th>
                    </tr>
                </thead>
                <tbody>
                {ticketList.map((val)=>( 
                <tr>
                               <td>{val.TRAIN_NUMBER}</td>
                               <td>{val.TICKET_NUMBER}</td>
                               <td>{val.CNIC}</td>
                               <td>{val.FIRST_NAME} {val.LAST_NAME}</td>
                </tr>
                  )
                 )}    
                </tbody>
            </table>
            </div>
            {/* searchTicket() */}
            {/* <button onClick={searchTicket}>Show</button> */}
            {/* {ticketList.map((val)=>{
                    return <h1>TRAIN_NUMBER: {val.TRAIN_NUMBER} | TICKET_NUMBER: {val.TICKET_NUMBER} | CNIC: {val.CNIC} | NAME: {val.FIRST_NAME} {val.LAST_NAME}</h1>
                })} */}
        </div>
    )
}

export default ViewBook