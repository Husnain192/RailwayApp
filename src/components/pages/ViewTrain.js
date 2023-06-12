import React from 'react'
import AdminNav from './AdminNav'
import Axios from 'axios';
import { useEffect, useState } from 'react';

function ViewTrain() {
    const [trainList, setTrainList] = useState([]);
    Axios.defaults.withCredentials = true;

    setTimeout(() => {
        searchTrain();
      }, 100);

    const searchTrain = () =>{
        Axios.get('http://localhost:1337/viewtrains').then((response)=>{  
            setTrainList(response.data)
        })
    }

    return (
        <div>
            <AdminNav />
            <h1>All Trains</h1>
            {/* searchTicket() */}
            {/* <button onClick={searchTicket}>Show</button> */}
            <div className='table-alignment'>
            <table className='content-table'>
                <thead>
                    <tr>
                        <th>TRAIN_NAME</th>
                        <th>TRAIN_NUMBER</th>
                        <th>STATION</th>
                    </tr>
                </thead>
                <tbody>
                {trainList.map((val)=>( 
                <tr>
                               <td>{val.TRAIN_NAME}</td>
                               <td>{val.TRAIN_NUMBER}</td>
                               <td>{val.STATION_NAME}</td>
                </tr>
                  )
                 )}    
                </tbody>
            </table>
            </div>
            {/* {trainList.map((val)=>{
                    return <h1>TRAIN_NAME: {val.TRAIN_NAME} | TRAIN_NUMBER: {val.TRAIN_NUMBER} | STATION: {val.STATION_NAME}</h1>
                })} */}
        </div>
    )
}

export default ViewTrain