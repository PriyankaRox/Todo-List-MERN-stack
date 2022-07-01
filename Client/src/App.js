import React , {useState,useEffect}from 'react';
import { navigate, Link } from "@reach/router";
import logo from './logo.svg';
import './App.css';
import { Router  } from '@reach/router';
import PrivateRoute from './components/PrivateRoute';
import Main from './views/Main';
import Details from './views/Details';
import Update from './views/Update';
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import HighP from './components/HighP'
import MediumP from './components/MediumP'
import LowP from './components/LowP'
import LoginForm from './components/LoginForm';
import Register from './components/Register'
import TodoForm from './components/TodoForm';
import DueToday from './components/DueToday'
import DoneTasks from './components/DoneTasks';

function App() {

  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <div className="page">
        <Router>
          <LoginForm path="/login"/>
          <Register path="/register"/>
          {/* <Main path="/" element={<PrivateRoute/>} /> */}
          
           <Main path="/" />
          <HighP path="/task/high" />
          <MediumP path="/task/medium" />
          <LowP path="/task/low" />

          <DueToday path="/task/today"/>
          <DoneTasks path="/task/done"/>
          
          <TodoForm path="/tasks/new" />
          <Details path="/tasks/:id" />
          <Update path="/tasks/:id/edit" />
          
        </Router>
      </div>
    </div>
  );
}

export default App;
