import { AiOutlineQrcode } from "react-icons/ai";
import { BiText } from "react-icons/bi";
import { FaCode } from "react-icons/fa";
import { GrTemplate } from "react-icons/gr";
import { HiOutlineViewGrid } from "react-icons/hi";
import { MdPermMedia } from "react-icons/md";

const AsideBarDesign = ({
  setshowTemplates,
  undoRedoFunc,
  setcontent,
  content,
  canvasWidth,
  imgref,
  setshowElements
}) => {
  return (
    <div
      id="aside"
      className="w-full sm:w-auto bg-white dark:bg-[#1a1a1a] p-2 fixed bottom-0 md:top-0 md:relative left-0 z-50 overflow-x-scroll sm:overflow-x-hidden scroll-m-0 flex md:flex-col items-center"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <div
        onClick={() => {
          setshowTemplates(true);
        }}
        className="flex flex-col items-center my-0 mx-2 md:my-4 px-2 cursor-pointer text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
      >
        <GrTemplate size={20} />
        <span className="mt-1" style={{ fontSize: "11px" }}>
          Templates
        </span>
      </div>
      <div
        onClick={() => {
          undoRedoFunc();
          setcontent([
            ...content,
            {
              id: Date.now(),
              isDeleted: false,
              shadow: "0",
              scolor: "#1e1e1e",
              br: "0",
              frame: "none",
              fontSize: Math.ceil((16 / canvasWidth) * 100),
              fontShadow: "0",
              bold: false,
              italic: false,
              underline: false,
              fontFamily: null,
              fontcolor: "#ffffff",
              transform:
                "translate(-50%,-50%) perspective(500px) rotateY(0deg) rotateX(0deg)",
              txt: "Text here",
              component: "text",
              position: { left: 0, top: 0 }
            }
          ]);
        }}
        className="flex flex-col items-center my-0 mx-2 md:my-4 px-2 cursor-pointer text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
      >
        <BiText size={20} />
        <span className="mt-1" style={{ fontSize: "11px" }}>
          Text
        </span>
      </div>
      <div
        onClick={() => {
          imgref.current.click();
        }}
        className="flex flex-col items-center my-0 mx-2 md:my-4 px-2 cursor-pointer text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
      >
        <MdPermMedia size={20} />
        <span className="mt-1" style={{ fontSize: "11px" }}>
          Image
        </span>
      </div>
      <div
        onClick={() => {
          undoRedoFunc();
          setcontent([
            ...content,
            {
              id: Date.now(),
              isDeleted: false,
              shadow: "0",
              scolor: "#1e1e1e",
              frame: "none",
              size: 20,
              component: "qrcode",
              position: { left: 0, top: 0 },
              value: "https://www.pixlab.in",
              color: "#000000",
              background: "#ffffff"
            }
          ]);
        }}
        className="flex flex-col items-center my-0 mx-2 md:my-4 px-2 cursor-pointer text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
      >
        <AiOutlineQrcode size={20} />
        <span className="mt-1" style={{ fontSize: "11px" }}>
          QR
        </span>
      </div>
      <div
        onClick={() => {
          undoRedoFunc();
          setcontent([
            ...content,
            {
              id: Date.now(),
              isDeleted: false,
              shadow: "0",
              scolor: "#1e1e1e",
              frame: "macOS-black",
              size: 50,
              component: "code",
              position: { left: 50, top: 50 },
              transform:
                "translate(-50%,-50%) perspective(500px) rotateY(0deg) rotateX(0deg)",
              code: `import React from 'react'

const Code = () => {
  return (
    <div>Code</div>
  )
}

export default Code
              `,
              codetheme: "githubDark",
              lang: "javascript",
              lineNo: false
            }
          ]);
        }}
        className="flex flex-col items-center my-0 mx-2 md:my-4 px-2 cursor-pointer text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
      >
        <FaCode size={20} />
        <span className="mt-1" style={{ fontSize: "11px" }}>
          Code
        </span>
      </div>
      <div
        onClick={() => {
          setshowElements(true);
        }}
        className="flex flex-col items-center my-0 mx-2 md:my-4 px-2 cursor-pointer text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
      >
        <HiOutlineViewGrid size={20} />
        <span className="mt-1" style={{ fontSize: "11px" }}>
          Elements
        </span>
      </div>
    </div>
  );
};

export default AsideBarDesign;
