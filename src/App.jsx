import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Pages/login.jsx";
import Home from "./Pages/home.jsx";
import Cars from "./Pages/cars.jsx";
import About from "./Pages/about.jsx";
import SignUp from "./Pages/signup.jsx";
import NavBar from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Cart from "./Pages/cart.jsx";
import Profile from "./Pages/profile.jsx";




function App() {
  return (
    <>

      <NavBar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>

      
    <Footer/>

    </>
  )
}

export default App;
