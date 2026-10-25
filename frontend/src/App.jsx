import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./features/authentication/pages/Register.jsx";
import Login from "./features/authentication/pages/Login.jsx";
import Home from "./features/home/pages/Home.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
