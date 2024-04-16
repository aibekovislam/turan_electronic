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


function MainLayout() {
  return (
    <>
      <div className="container">
        <Navbar />
        <Suspense>
          <Outlet />
        </Suspense>
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}

export default MainLayout;
