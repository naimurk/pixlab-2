import { Link, Outlet } from "react-router-dom";
import ScrollToTop from "@/Components/ChildrenComponents/ScrollToTop";
import BottomNavbar from "../Components/shared/header/BottomNavbar";
import FeatureSidebar from "../Components/shared/header/FeatureSidebar";
import Navbar from "../Components/shared/header/Navbar";

const FeatureLayout = () => {
  return (
    <>
      <ScrollToTop />
      <div className="bg-black flex">
        <FeatureSidebar />

        <div className="ml-64 flex-1 overflow-y-auto">
          <nav className="flex justify-center items-center py-5">
            <Link to="/" className="flex items-center pl-3">
              <img src="/favicon.png" className="h-10 mr-3 " alt="pixlab" />
              <img
                src="/landing/logo-dark.png"
                className="h-8 mr-3"
                alt="pixlab"
              />
            </Link>
          </nav>
          <Outlet />
        </div>
      </div>
      <BottomNavbar />
    </>
  );
};

export default FeatureLayout;
