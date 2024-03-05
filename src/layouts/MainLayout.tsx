import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/main.scss"
import Footer from "../components/Footer";

function MainLayout() {
  return (
    <>
      <div className="container">
        <Navbar />
        <Outlet />
        <Footer/>
      </div>
    </>
  );
}

export default MainLayout;
