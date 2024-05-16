import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/main.scss"
import Footer from "../components/Footer";
import { Suspense, useEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


function DetailLayout() {
  return (
    <>
      <div className="container">
        <Navbar />
        <Suspense>
          <Outlet />
        </Suspense>
        <ScrollToTop />
      </div>
    </>
  );
}

export default DetailLayout;
