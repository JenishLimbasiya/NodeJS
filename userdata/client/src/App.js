import "./App.css";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./componenets/Home";
import About from "./componenets/About";
import Contact from "./componenets/Contact";
import Login from "./componenets/Login";
import Signup from "./componenets/Signup";
import Navbar from "./componenets/Navbar";
import Logout from "./componenets/Logout";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
}

export default App;
