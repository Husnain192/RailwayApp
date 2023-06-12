import React from 'react'
import AdminNav from './AdminNav'
import Axios from 'axios';
import { useEffect, useState } from 'react';

function ViewFeedback() {
    const [feedbackList, setFeedbackList] = useState([]);
    Axios.defaults.withCredentials = true;

    setTimeout(() => {
        searchTrain();
      }, 100);

    const searchTrain = () =>{
        Axios.get('http://localhost:1337/viewfeedback').then((response)=>{  
            setFeedbackList(response.data)
        })
    }

    return (
        <div>
            <AdminNav />
            <h1>Customer Feedbacks</h1>
            <div className='table-alignment'>
            <table className='content-table'>
                <thead>
                    <tr>
                        <th>CNIC</th>
                        <th>NAME</th>
                        <th>SUBJECT</th>
                        <th>MESSAGE</th>
                    </tr>
                </thead>
                <tbody>
                {feedbackList.map((val)=>( 
                <tr>
                               <td>{val.CNIC}</td>
                               <td>{val.FIRST_NAME} {val.LAST_NAME}</td>
                               <td>{val.SUBJECT}</td>
                               <td>{val.MESSAGE}</td>
                </tr>
                  )
                 )}    
                </tbody>
            </table>
            </div>
            {/* searchTicket() */}
            {/* <button onClick={searchTicket}>Show</button> */}
            {/* {feedbackList.map((val)=>{
                    return <h1>CNIC: {val.CNIC} | NAME: {val.FIRST_NAME} {val.LAST_NAME} | SUBJECT: {val.SUBJECT} | MESSAGE: {val.MESSAGE}</h1>
                })} */}
        </div>
    )
}

export default ViewFeedback