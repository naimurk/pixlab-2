// import { Link } from "react-router-dom";
// import ModeToggle from "./ModeToggle";

// const Navbar = ({ show }) => {
//   return (
//     <nav
//       style={{
//         zIndex: 100,
//       }}
//       className={`bg-white dark:bg-gray-950 w-full sticky top-0 select-none ${
//         show ? "sm:block" : "sm:hidden"
//       }`}
//     >
//       <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2 md:h-[56px]">
//         <Link to={"/"} className="flex items-center">
//           <img
//             src="/logo_white.png"
//             className="h-8 mr-3 rounded-lg shadow-md transform transition-transform hover:rotate-0 -rotate-6"
//             alt="pixlab logo"
//           />
//           <span className="self-center text-lg font-semibold whitespace-nowrap text-gray-800 dark:text-gray-200">
//             pixlab
//           </span>
//         </Link>
//         <div className="flex items-center md:order-2">
//           <ModeToggle />
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { Link, useLocation, useParams } from "react-router-dom";

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
import ConfettiButton from "../../Confetti";

import { CiDark } from "react-icons/ci";
import { BsArrowRight } from "react-icons/bs";
import { MdOutlineAccountTree } from "react-icons/md";
import { useAppContext } from "../../../context";
import ModeToggle from "./ModeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faqs", label: "FAQs" },
  { href: "/dashboard", label: "Dashboard" },
];

const Navbar = () => {
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
    `/device-mockups`,
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

  const context = useAppContext();
  const { username, _id } = context.sharedState;
  const location = useLocation();
  const shouldHideSidebar = hideSidebarPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideSidebar && (
        <nav className="font-inter mx-auto h-auto w-full xl:px-20 z-30 fixed top-0 xl:top-10 bg-transparent">
          <div className="flex px-6  shadow-sm bg-black lg:rounded-xl items-center justify-between py-1 lg:px-10 xl:px-20">
            {/* Logo */}
            <Link to="/" className="flex items-center pl-3">
              <img src="/favicon.png" className="h-10 mr-3 " alt="pixlab" />
              <img
                src="/landing/logo-dark.png"
                className="h-8 mr-3"
                alt="pixlab"
              />
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex gap-5 xl:gap-10 ">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="font-inter text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Sign Up Button */}
            <div className="flex justify-center gap-5 items-center">
              <div
                className={`flex flex-col space-y-8 py-2 lg:flex lg:flex-row lg:space-x-3 lg:space-y-0`}
              >
                {_id && _id.length > 0 ? (
                  <Link to={`/${username}`} className="block w-full group">
                    <span className="inline-flex items-center px-4 py-2 rounded-lg group-hover:bg-gray-100 dark:group-hover:bg-gray-900 transition-colors duration-200">
                      <User className="w-5 h-5 mr-3" />
                      Profile
                    </span>
                  </Link>
                ) : (
                  // <Link to="/signup" className="block w-full group">
                  //   <span className="inline-flex items-center px-4 py-2 rounded-lg group-hover:bg-gray-100 dark:group-hover:bg-gray-900 transition-colors duration-200">
                  //     <UserPlus className="w-5 h-5 mr-3" />
                  //     Sign Up
                  //   </span>
                  // </Link>
                  <Link to="/sign-up">
                    <div
                      className="font-inter z-30  dark:text-white text-center bg-gradient-to-t from-[#C92698] to-[#FA5D3A]"
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
                )}
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
