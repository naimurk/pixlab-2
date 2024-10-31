import { Link, useLocation, useParams } from "react-router-dom";
import { GiQueenCrown } from "react-icons/gi";

import {
  CreditCard,
  FileText,
  Home,
  Info,
  LayoutGrid,
  Mail,
  ShieldCheck,
  User,
  UserPlus,
} from "lucide-react";
import { useAppContext } from "../../../context";
import ConfettiButton from "../../Confetti";
import ModeToggle from "./ModeToggle";
import { BsArrowRight } from "react-icons/bs";
import { CiGrid31 } from "react-icons/ci";
import { FiTool } from "react-icons/fi";
import { IoHelpCircleOutline } from "react-icons/io5";

const FeatureSidebar = () => {
  const context = useAppContext();
  const { username, _id } = context.sharedState;
  const location = useLocation();
  const { device } = useParams();

  // Define the paths where the sidebar should be hidden
  const hideSidebarPaths = [
    "/about",
    "/pricing",
    "/privacy",
    "/terms",
    "/signup",
    "/login",
    "/design",
    "/screenshot-mockup",
    "/code",
    `/device-mockups/${device}`,
    "/videos/typewriter",
    "/tweet-to-screenshot",
    "/reddit-screenshot",
    "/testimonial",
    "/youtube-screenshot",
    "/twitter",
    "/qr-code",
    "/short-blog",
    "/instagram",
    "/bar-code",
  ];

  // Check if the current location path is in the list of paths where sidebar should be hidden
  const shouldHideSidebar = hideSidebarPaths.includes(location.pathname);
  return (
    <>
      {!shouldHideSidebar && (
        <aside className="w-64 p-3 bg-black dark:bg-black shadow-md  fixed top-0 left-0 md:block select-none h-screen flex flex-col text-white">
          {/* Header section */}
          <section className="h-16">
            <div className="flex items-center justify-between bg-[#191919] py-2 rounded-xl w-full">
              <Link to="/sign-up">
                <div
                  className="font-inter z-30 text-center bg-gradient-to-t from-[#C92698] to-[#FA5D3A]"
                  style={{
                    position: "relative",
                    borderRadius: "12px",
                    padding: "1px",
                  }}
                >
                  <div
                    className="flex items-center text-white bg-black"
                    style={{
                      borderRadius: "inherit",
                      padding: "4px 16px",
                    }}
                  >
                    Sign Up
                    <BsArrowRight className="text-xl ml-3" />
                  </div>
                </div>
              </Link>
              <GiQueenCrown className="text-white w-5 h-5 mr-3" />
            </div>
          </section>

          {/* Sidebar content */}
          <section className="h-full rounded-2xl flex-grow justify-between bg-[#191919]">
            <nav className="space-y-4 text-gray-200 w-full px-2 pt-1">
              <Link to="/" className="block w-full">
                <span className="inline-flex items-center w-full px-4 py-3 rounded-lg hover:bg-[#090909] transition-colors duration-200">
                  <CiGrid31 className="w-5 h-5 mr-3" />
                  Templates
                </span>
              </Link>
              <Link to="/more" className="block w-full">
                <span className="inline-flex items-center w-full px-4 py-3 rounded-lg hover:bg-[#090909] transition-colors duration-200">
                  <FiTool className="w-5 h-5 mr-3" />
                  Handy Tools
                </span>
              </Link>
              <Link to="/pricing" className="block w-full">
                <span className="inline-flex items-center w-full px-4 py-3 rounded-lg hover:bg-[#090909] transition-colors duration-200">
                  <CreditCard className="w-5 h-5 mr-3" />
                  Boilerplate
                </span>
              </Link>
            </nav>

            {/* Footer section */}
            <div className="flex flex-col items-center space-y-2 text-white w-full absolute bottom-10 left-0 px-5">
              <Link to="/pricing" className="block w-full">
                <span className="inline-flex items-center w-full px-4 py-3 rounded-lg hover:bg-[#090909] transition-colors duration-200">
                  <IoHelpCircleOutline className="text-white w-5 h-5 mr-3" />
                  Help
                </span>
              </Link>
              <Link to="/pricing" className="block w-full">
                <span className="inline-flex items-center w-full px-4 py-3 rounded-lg hover:bg-[#090909] transition-colors duration-200">
                  <GiQueenCrown className="w-5 h-5 mr-3" />
                  Upgrade
                </span>
              </Link>
            </div>
          </section>
        </aside>
      )}
    </>
  );
};

export default FeatureSidebar;
