// import { useEffect } from "react";
// import { FaTwitter } from "react-icons/fa";
// import { Link } from "react-router-dom";
// const Footer = () => {
//   useEffect(() => {
//     // Dynamically load Senja platform script
//     const script = document.createElement("script");
//     script.src = "https://static.senja.io/dist/platform.js";
//     script.async = true;
//     document.body.appendChild(script);

//     return () => {
//       // Cleanup script when component unmounts
//       document.body.removeChild(script);
//     };
//   }, []);
//   return (
//     <>
//       <section className="bg-white dark:bg-black">
//         <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
//           <h2 className="mb-8 text-4xl tracking-tight font-bold text-gray-900 dark:text-gray-100">
//             Frequently asked questions
//           </h2>
//           <div className="grid pt-8 text-left border-t border-gray-200 md:gap-16  md:grid-cols-2">
//             <div>
//               <div className="mb-10">
//                 <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">
//                   <svg
//                     className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 "
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
//                       clipRule="evenodd"
//                     ></path>
//                   </svg>
//                   What is pixlab?
//                 </h3>
//                 <p className="text-gray-500 dark:text-gray-400">
//                   pixlab is a free online tool that allows you to create
//                   beautiful images for social media, blog posts, presentations,
//                   and more. You can use pixlab to create Beautiful Images,
//                   Testimonials, Code Snippets, QR Codes and then download them
//                   as PNG or JPEG files.
//                 </p>
//               </div>
//               <div className="mb-10">
//                 <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">
//                   <svg
//                     className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 "
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
//                       clipRule="evenodd"
//                     ></path>
//                   </svg>
//                   Is pixlab free?
//                 </h3>
//                 <p className="text-gray-500 dark:text-gray-400">
//                   Yes pixlab is free to use, but also comes with a premium plan
//                 </p>
//               </div>
//               <div className="mb-10">
//                 <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">
//                   <svg
//                     className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 "
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
//                       clipRule="evenodd"
//                     ></path>
//                   </svg>
//                   Does pixlab store my images?
//                 </h3>
//                 <p className="text-gray-500 dark:text-gray-400">
//                   pixlab produces your beautiful looking images in your browser
//                   and no information or data is uploaded on the internet.
//                 </p>
//               </div>
//             </div>
//             <div>
//               <div className="mb-10">
//                 <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">
//                   <svg
//                     className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 "
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
//                       clipRule="evenodd"
//                     ></path>
//                   </svg>
//                   Do I need to create an account to use pixlab?
//                 </h3>
//                 <p className="text-gray-500 dark:text-gray-400">
//                   No, you do not need to create an account to use the tools on
//                   pixlab. However, creating an account can provide a more
//                   personalized experience.
//                 </p>
//               </div>
//               <div className="mb-10">
//                 <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">
//                   <svg
//                     className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 "
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
//                       clipRule="evenodd"
//                     ></path>
//                   </svg>
//                   Can I use pixlab for commercial purposes?
//                 </h3>
//                 <p className="text-gray-500 dark:text-gray-400">
//                   Yes, you can use the tools provided by pixlab for commercial
//                   purposes.
//                 </p>
//               </div>

//               <div className="mb-10">
//                 <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">
//                   <svg
//                     className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 "
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
//                       clipRule="evenodd"
//                     ></path>
//                   </svg>
//                   How many images can I create with pixlab?
//                 </h3>
//                 <p className="text-gray-500 dark:text-gray-400">
//                   You can create an unlimited number of images with pixlab.
//                   There is no limit on the number of images you can create or
//                   the number of times you can use the tool.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <div className="p-4 m-auto mb-12">
//         <div
//           className="senja-embed"
//           data-id="c536c108-942e-4f83-8577-e58f7affd2ce"
//           data-lazyload="false"
//         ></div>
//         <script
//           async
//           type="text/javascript"
//           src="https://static.senja.io/dist/platform.js"
//         ></script>
//       </div>

//       <Link
//         style={{
//           width: "100%",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           margin: "96px 0"
//         }}
//         to="https://play.google.com/store/apps/details?id=in.ubout.pixlab.twa"
//         target="_blank"
//       >
//         <img
//           src="/google_play.png"
//           alt="pixlab - Available on Playstore"
//           style={{
//             width: "250px",
//             borderRadius: "16px"
//           }}
//         />
//       </Link>

//       <footer className="bg-white dark:bg-black  w-full pb-[36px] md:pb-0">
//         <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
//           <div className="md:flex md:justify-between">
//             <div className="mb-6 md:mb-0">
//               <Link to="https://www.pixlab.in/" className="flex items-center">
//                 <img
//                   src="/logo_white.png"
//                   className="h-10 mr-3 -rotate-6"
//                   alt="pixlab Logo"
//                 />
//                 <span className="self-center text-xl font-semibold whitespace-nowrap ">
//                   pixlab
//                 </span>
//               </Link>
//             </div>
//             <div className="grid grid-cols-2 gap-8 md:gap-6 md:grid-cols-4">
//               <div className="mr-8">
//                 <h2 className="mb-6 text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase mr-8 ">
//                   Links
//                 </h2>
//                 <ul className="text-gray-500 dark:text-gray-400 font-medium">
//                   <li className="mb-4">
//                     <Link to="/about" className="hover:underline">
//                       Home
//                     </Link>
//                   </li>
//                   <li className="mb-4">
//                     <Link to="/about" className="hover:underline">
//                       About
//                     </Link>
//                   </li>
//                   <li className="mb-4">
//                     <Link to="/pricing" className="hover:underline">
//                       Pricing
//                     </Link>
//                   </li>
//                 </ul>
//               </div>

//               <div className="mr-8">
//                 <h2 className="mb-6 text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase mr-8 ">
//                   Our Apps
//                 </h2>
//                 <ul className="text-gray-500 dark:text-gray-400 font-medium">
//                   <li className="mb-4">
//                     <Link
//                       to="https://www.pixlab.in/"
//                       className="hover:underline"
//                     >
//                       pixlab
//                     </Link>
//                   </li>
//                   <li className="mb-4">
//                     <Link
//                       to="https://www.prodpapa.com/"
//                       className="hover:underline"
//                     >
//                       Prodpapa
//                     </Link>
//                   </li>
//                   <li className="mb-4">
//                     <Link
//                       to="https://www.pixel.estate/"
//                       className="hover:underline"
//                     >
//                       Pixel Estate
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//               <div>
//                 <h2 className="mb-6 text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase ">
//                   Connect
//                 </h2>
//                 <ul className="text-gray-500 dark:text-gray-400 font-medium">
//                   <li className="mb-4">
//                     <Link
//                       to="https://twitter.com/imkrishgohil"
//                       className="hover:underline "
//                     >
//                       Developer
//                     </Link>
//                   </li>
//                   <li className="mb-4">
//                     <Link to="/contact" className="hover:underline ">
//                       Contact us
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//               <div>
//                 <h2 className="mb-6 text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase ">
//                   Legal
//                 </h2>
//                 <ul className="text-gray-500 dark:text-gray-400 font-medium">
//                   <li className="mb-4">
//                     <Link to="/privacy" className="hover:underline">
//                       Privacy Policy
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to="/terms" className="hover:underline">
//                       Terms of Service
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//           <hr className="my-6 border-gray-200 dark:border-gray-600 sm:mx-auto  lg:my-8" />
//           <div className="flex items-center justify-between">
//             <span className="text-sm text-gray-500 sm:text-center ">
//               © 2024{" "}
//               <Link to="https://www.pixlab.in/" className="hover:underline">
//                 pixlab™
//               </Link>
//               . All Rights Reserved.
//             </span>
//             <p>
//               <FaTwitter />
//             </p>
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default Footer;

import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-[#0d0d0f]">
      <footer className="block">
        <div className="mx-auto w-full max-w-5xl px-5 py-16 md:px-10 md:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-100">
              Ready to Elevate Your Visual Content?
            </h2>
            <button className="px-4 py-2 rounded-xl overflow-hidden border-2 border-purple-500 text-gray-100">
              Get Started Now &rarr;
            </button>
          </div>
          <div className="grid mb-10 grid-cols-[auto] justify-between gap-8 sm:grid-cols-[auto_auto_auto]">
            <div className="flex flex-col items-start">
              <h2 className="mb-6 text-sm font-semibold text-gray-100 uppercase">
                Menu
              </h2>
              <ul className="text-gray-400 font-medium">
                <li className="mb-2">
                  <Link to="/about" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/features" className="hover:underline">
                    Features
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/pricing" className="hover:underline">
                    Pricing
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/faq" className="hover:underline">
                    FAQ
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/dashboard" className="hover:underline">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-start">
              <h2 className="mb-6 text-white text-sm font-semiboldtext-gray-100 uppercase">
                Other Links
              </h2>
              <ul className="text-gray-400 font-medium">
                <li className="mb-2">
                  <Link to="/" className="hover:underline">
                    Links ipsum
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/" className="hover:underline">
                    More Products
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/" className="hover:underline">
                    Links ipsum
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/" className="hover:underline">
                    Links ipsum
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-start">
              <h2 className="mb-6 text-sm font-semibold text-gray-100 uppercase">
                Other Links
              </h2>
              <ul className="text-gray-400 font-medium">
                <li className="mb-2">
                  <Link to="/" className="hover:underline">
                    Links ipsum
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/" className="hover:underline">
                    More Products
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/" className="hover:underline">
                    Links ipsum
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/" className="hover:underline">
                    Links ipsum
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Copyright © 2017 - 2025,{" "}
              <Link to="https://www.pixlab.in/" className="hover:underline">
                Pixlab
              </Link>{" "}
              All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
