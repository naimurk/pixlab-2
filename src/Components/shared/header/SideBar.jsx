// import { Link, useLocation, useParams } from "react-router-dom";

// import {
//   CreditCard,
//   FileText,
//   Home,
//   Info,
//   LayoutGrid,
//   Mail,
//   ShieldCheck,
//   User,
//   UserPlus,
// } from "lucide-react";
// import { useAppContext } from "../../../context";
// import ConfettiButton from "../../Confetti";
// import ModeToggle from "./ModeToggle";
// const SideBar = () => {
//   const context = useAppContext();
//   const { username, _id } = context.sharedState;
//   const location = useLocation();
//   const { device } = useParams();

//   // Define the paths where the sidebar should be hidden
//   const hideSidebarPaths = [
//     "/about",
//     "/pricing",
//     "/privacy",
//     "/terms",
//     "/signup",
//     "/login",
//     "/design",
//     "/screenshot-mockup",
//     "/code",
//     `/device-mockups/${device}`,
//     "/videos/typewriter",
//     "/tweet-to-screenshot",
//     "/reddit-screenshot",
//     "/testimonial",
//     "/youtube-screenshot",
//     "/twitter",
//     "/qr-code",
//     "/short-blog",
//     "/instagram",
//     "/bar-code",
//   ];

//   // Check if the current location path is in the list of paths where sidebar should be hidden
//   const shouldHideSidebar = hideSidebarPaths.includes(location.pathname);
//   return (
//     <>
//       {!shouldHideSidebar && (
//         <aside className="w-64 p-8 bg-white dark:bg-black shadow-md hidden md:block select-none min-h-screen overflow-auto">
//           <Link to="/" className="flex items-center pl-3 mb-8">
//             <img
//               src="/logo_white.png"
//               className="h-8 mr-3 rounded-lg shadow-md transform transition-transform hover:rotate-0 -rotate-6"
//               alt="pixlab"
//             />
//             <span className="self-center text-lg font-semibold whitespace-nowrap text-gray-800 dark:text-gray-200">
//               pixlab
//             </span>
//           </Link>

//           <nav className="space-y-4 text-gray-800 dark:text-gray-200">
//             <Link to="/" className="block w-full group">
//               <span className="inline-flex items-center px-4 py-2 rounded-lg group-hover:bg-gray-100 dark:group-hover:bg-gray-900 transition-colors duration-200">
//                 <Home className="w-5 h-5 mr-3" />
//                 Home
//               </span>
//             </Link>
//             <Link to="/more" className="block w-full group">
//               <span className="inline-flex items-center px-4 py-2 rounded-lg group-hover:bg-gray-100 dark:group-hover:bg-gray-900 transition-colors duration-200">
//                 <LayoutGrid className="w-5 h-5 mr-3" />
//                 Free tools
//               </span>
//             </Link>
//             <Link to="/pricing" className="block w-full group">
//               <span className="inline-flex items-center px-4 py-2 rounded-lg group-hover:bg-gray-100 dark:group-hover:bg-gray-900 transition-colors duration-200">
//                 <CreditCard className="w-5 h-5 mr-3" />
//                 Pricing
//               </span>
//             </Link>
//             <Link to="/about" className="block w-full group">
//               <span className="inline-flex items-center px-4 py-2 rounded-lg group-hover:bg-gray-100 dark:group-hover:bg-gray-900 transition-colors duration-200">
//                 <Info className="w-5 h-5 mr-3" />
//                 About
//               </span>
//             </Link>
//             <Link to="/contact" className="block w-full group">
//               <span className="inline-flex items-center px-4 py-2 rounded-lg group-hover:bg-gray-100 dark:group-hover:bg-gray-900 transition-colors duration-200">
//                 <Mail className="w-5 h-5 mr-3" />
//                 Contact
//               </span>
//             </Link>
//             <Link to="/privacy" className="block w-full group">
//               <span className="inline-flex items-center px-4 py-2 rounded-lg group-hover:bg-gray-100 dark:group-hover:bg-gray-900 transition-colors duration-200">
//                 <ShieldCheck className="w-5 h-5 mr-3" />
//                 Privacy
//               </span>
//             </Link>
//             <Link to="/terms" className="block w-full group">
//               <span className="inline-flex items-center px-4 py-2 rounded-lg group-hover:bg-gray-100 dark:group-hover:bg-gray-900 transition-colors duration-200">
//                 <FileText className="w-5 h-5 mr-3" />
//                 Terms
//               </span>
//             </Link>
//             {_id && _id.length > 0 ? (
//               <Link to={`/${username}`} className="block w-full group">
//                 <span className="inline-flex items-center px-4 py-2 rounded-lg group-hover:bg-gray-100 dark:group-hover:bg-gray-900 transition-colors duration-200">
//                   <User className="w-5 h-5 mr-3" />
//                   Profile
//                 </span>
//               </Link>
//             ) : (
//               <Link to="/signup" className="block w-full group">
//                 <span className="inline-flex items-center px-4 py-2 rounded-lg group-hover:bg-gray-100 dark:group-hover:bg-gray-900 transition-colors duration-200">
//                   <UserPlus className="w-5 h-5 mr-3" />
//                   Sign Up
//                 </span>
//               </Link>
//             )}
//           </nav>
//           <div className="absolute bottom-4 left-5 px-4 flex items-center space-x-2">
//             <ModeToggle />
//             <ConfettiButton />
//           </div>
//         </aside>
//       )}
//     </>
//   );
// };

// export default SideBar;

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
const SideBar = () => {
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
        <aside className="w-64  bg-white dark:bg-black shadow-md hidden md:block select-none min-h-screen overflow-auto p-2">
          <div className="flex items-center justify-between bg-black px-5 py-2 rounded-xl">
            <Link to="/sign-up">
              <div
                className="font-inter z-30  dark:text-white text-center bg-gradient-to-t from-[#C92698] to-[#FA5D3A] "
                style={{
                  position: "relative",
                  borderRadius: "15px", // Rounded corners
                  padding: "1px", // Padding for the gradient border
                }}
              >
                <div
                  className="flex items-center text-white bg-black"
                  style={{
                    borderRadius: "inherit", // Inherit border-radius
                    padding: "7px 20px", // Padding for the text inside
                  }}
                >
                  Sign Up
                  <BsArrowRight className="text-xl ml-3" />
                </div>
              </div>
            </Link>

            <div className="">
              <GiQueenCrown className="text-white" />
            </div>
          </div>

          <nav className="space-y-4 text-gray-800 dark:text-gray-200">
            <Link to="/" className="block w-full group">
              <span className="inline-flex items-center px-4 py-2 rounded-lg group-hover:bg-gray-100 dark:group-hover:bg-gray-900 transition-colors duration-200">
                <Home className="w-5 h-5 mr-3" />
                Home
              </span>
            </Link>
            <Link to="/more" className="block w-full group">
              <span className="inline-flex items-center px-4 py-2 rounded-lg group-hover:bg-gray-100 dark:group-hover:bg-gray-900 transition-colors duration-200">
                <LayoutGrid className="w-5 h-5 mr-3" />
                Free tools
              </span>
            </Link>
            <Link to="/pricing" className="block w-full group">
              <span className="inline-flex items-center px-4 py-2 rounded-lg group-hover:bg-gray-100 dark:group-hover:bg-gray-900 transition-colors duration-200">
                <CreditCard className="w-5 h-5 mr-3" />
                Pricing
              </span>
            </Link>
            <Link to="/about" className="block w-full group">
              <span className="inline-flex items-center px-4 py-2 rounded-lg group-hover:bg-gray-100 dark:group-hover:bg-gray-900 transition-colors duration-200">
                <Info className="w-5 h-5 mr-3" />
                About
              </span>
            </Link>
            <Link to="/contact" className="block w-full group">
              <span className="inline-flex items-center px-4 py-2 rounded-lg group-hover:bg-gray-100 dark:group-hover:bg-gray-900 transition-colors duration-200">
                <Mail className="w-5 h-5 mr-3" />
                Contact
              </span>
            </Link>
            <Link to="/privacy" className="block w-full group">
              <span className="inline-flex items-center px-4 py-2 rounded-lg group-hover:bg-gray-100 dark:group-hover:bg-gray-900 transition-colors duration-200">
                <ShieldCheck className="w-5 h-5 mr-3" />
                Privacy
              </span>
            </Link>
            <Link to="/terms" className="block w-full group">
              <span className="inline-flex items-center px-4 py-2 rounded-lg group-hover:bg-gray-100 dark:group-hover:bg-gray-900 transition-colors duration-200">
                <FileText className="w-5 h-5 mr-3" />
                Terms
              </span>
            </Link>
            {_id && _id.length > 0 ? (
              <Link to={`/${username}`} className="block w-full group">
                <span className="inline-flex items-center px-4 py-2 rounded-lg group-hover:bg-gray-100 dark:group-hover:bg-gray-900 transition-colors duration-200">
                  <User className="w-5 h-5 mr-3" />
                  Profile
                </span>
              </Link>
            ) : (
              <Link to="/signup" className="block w-full group">
                <span className="inline-flex items-center px-4 py-2 rounded-lg group-hover:bg-gray-100 dark:group-hover:bg-gray-900 transition-colors duration-200">
                  <UserPlus className="w-5 h-5 mr-3" />
                  Sign Up
                </span>
              </Link>
            )}
          </nav>
          <div className="absolute bottom-4 left-5 px-4 flex items-center space-x-2">
            <ModeToggle />
            <ConfettiButton />
          </div>
        </aside>
      )}
    </>
  );
};

export default SideBar;
