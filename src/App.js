import './App.css';
import { Routes, Route } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';
import List from './components/List/List';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import NewTask from './components/NewTask/NewTask';
import EditTask from './components/EditTask/EditTask';
import NotLoggedIn from './components/Error/NotLoggedInError';

import { UserContext } from './contexts/userContext';
import { useContext, useState, useEffect } from 'react';

function App() {
  const { currentUser } = useContext(UserContext);

   // Only run the effect when userData changes

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route
          path="tasks/*"
          element={currentUser !== null ? <List /> : <NotLoggedIn />}
        />
        <Route
          path="new-task"
          element={currentUser !== null ? <NewTask /> : <NotLoggedIn />}
        />
        <Route
          path="edit-task"
          element={currentUser !== null ? <EditTask /> : <NotLoggedIn />}
        />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
