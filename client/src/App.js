import logo from './logo.svg';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet, Link } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar"
// import Login from "./pages/Auth/Login";
// import Register from "./pages/Auth/Register";
function App() {
  return (
    <div className="App">
      <Navbar />

      <Outlet />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        colored
      />
    </div>
  );
}

export default App;
