import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './components/welcomepage/WelcomePage';
import AdminHomePage from './components/adminhome/AdminHomePage';
import UserHomePage from './components/userhome/UserHomePage';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import BookingPage from './components/bookingpage/BookingPage';
import MyTripPage from './components/mytrippage/MyTripPage';
import Login from './components/loginpage/Login';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<UserHomePage/>} />
        <Route path="/admin" element={<AdminHomePage />} />
        <Route path="/user" element={<UserHomePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/mytrips" element={<MyTripPage />} />
        <Route path="/login" element={<Login/>} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
