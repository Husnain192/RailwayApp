import React from 'react';
// import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Services from './components/pages/Services';
import SignUp from './components/pages/SignUp';
import Contact from './components/pages/Contact';
import About from './components/pages/About';
import Login from './components/pages/Login';
import Ticket from './components/pages/Ticket';
import AdminLogin from './components/pages/AdminLogin';
import AdminHome from './components/pages/AdminHome';
import AddTrain from './components/pages/AddTrain';
import ModifyTrain from './components/pages/ModifyTrain';
import ViewBook from './components/pages/ViewBook';
import ViewFeedback from './components/pages/ViewFeedback';
import ViewTrain from './components/pages/ViewTrain';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' exact element={<Login/>}/>
        <Route path='/home' exact element={<Home/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='/ticket' element={<Ticket/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route path='/AdminLogin' element={<AdminLogin/>}/>
        <Route path='/AdminHome' element={<AdminHome/>}/>
        <Route path='/AddTrain' element={<AddTrain/>}/>
        <Route path='/ModifyTrain' element={<ModifyTrain/>}/>
        <Route path='/ViewBook' element={<ViewBook/>}/>
        <Route path='/ViewFeedback' element={<ViewFeedback/>}/>
        <Route path='/ViewTrain' element={<ViewTrain/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
