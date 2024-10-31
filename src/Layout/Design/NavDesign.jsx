import { BiRedo, BiUndo } from "react-icons/bi";
import { MdFileDownload, MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import ModeToggle from "../../Components/shared/header/ModeToggle";

const NavDesign = ({
  format,
  handleDownload,
  handleDownloadGif,
  canvasStyles,
  setCanvasStyles,
  divRef,
  setCanvasWidth,
  setCanvasHeight,
  undoRedoFunc,
  undoHistory,
  redoHistory,
  setclicks,
  clicks,
  setcontent,
  setRedoHistory,
  setUndoHistory,
  mainState,
  settransform,
  setbr,
  setshadow,
  setframe,
  setpdng,
  setimg,
  setgradientColor,
  setMainState,
  setcustomGrad,
  designprops,
}) => {
  return (
    <nav
      className={`z-[999] border-b border-gray-300 dark:border-[#1a1a1a] bg-white dark:bg-[#1a1a1a] sticky top-0 w-full h-[56px] shadow-md`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <Link to={"/"} className="hidden md:flex items-center">
          <img
            src="/logo_white.png"
            className="h-10 mr-3 rounded-lg shadow-md transform transition-transform hover:rotate-0 -rotate-6"
            alt="pixlab logo"
          />
        </Link>
        <div className="flex">
          <button
            className="text-sm text-white px-4 py-1 flex items-center rounded-lg font-medium bg-black dark:bg-[#3b3939] dark:text-gray-100 transition-transform transform hover:scale-105 hover:bg-gray-800 dark:hover:bg-[#4a4848] "
            onClick={() => {
              if (format !== "gif") {
                handleDownload();
              } else {
                handleDownloadGif();
              }
            }}
          >
            <span className="dnone mr-2">Save</span>
            <MdFileDownload className="mt-[1px]" />
          </button>
          {/* <button
            className="text-black dark:text-white py-1 px-2 rounded-md font-medium border border-gray-500 ml-2 flex items-center"
            onClick={() => {
              if (isPreset) {
                deletePreset();
              } else {
                savePreset();
              }
            }}
          >
            <MdOutlineBookmarkBorder
              color={isPreset ? "dodgerblue" : "currentColor"}
              size={16}
            />
          </button> */}
          <select
            value={canvasStyles.aspectRatio}
            onChange={(e) => {
              undoRedoFunc();
              setCanvasStyles((prevStyles) => ({
                ...prevStyles,
                aspectRatio: e.target.value,
              }));

              setTimeout(() => {
                const parentDiv = divRef.current;
                const width = parentDiv.clientWidth;
                const height = parentDiv.clientHeight;
                setCanvasWidth(width);
                setCanvasHeight(height);
              }, 200);
            }}
            name="category"
            id=""
            className="ml-2 text-sm outline-none dark:bg-[#19191a] bg-white px-3 py-1 border border-gray-600 dark:border-gray-500 rounded-xl dark:text-white text-black max-w-[100px] hover:border-gray-400 dark:hover:border-gray-400 transition-all"
          >
            <option value="1/1">1:1 Instagram Post (Square)</option>
            <option value="3/1">3:1 Twitter Header</option>
            <option value="4/3">4:3 Standard TV</option>
            <option value="3/4">3:4 Portrait TV</option>
            <option value="5/4">5:4 Classic Computer Monitor</option>
            <option value="4/5">4:5 Instagram Portrait</option>
            <option value="16/9">16:9 Youtube Video</option>
            <option value="9/16">9:16 Instagram Story</option>
            <option value="21/9">21:9 Ultrawide Monitor</option>
            <option value="9/21">9:21 Ultrawide Portrait</option>
            <option value="3/2">3:2 Classic Film Camera</option>
            <option value="2/3">2:3 Portrait Film Camera</option>
            <option value="2/1">2:1 Panoramic Landscape</option>
            <option value="1/2">1:2 Panoramic Portrait</option>
            <option value="1.91/1">1.91:1 Facebook Link Preview</option>
            <option value="1/1.91">
              1:1.91 Facebook Link Preview (Portrait)
            </option>
            <option value="4/5.3">4:5.3 iPhone Photo</option>
            <option value="5.3/4">5.3:4 iPhone Photo (Portrait)</option>
            <option value="18.5/9">18.5:9 Samsung Galaxy S8/S9</option>
            <option value="9/18.5">
              9:18.5 Samsung Galaxy S8/S9 (Portrait)
            </option>
            <option value="19.5/9">19.5:9 iPhone X/XS/XR</option>
            <option value="9/19.5">9:19.5 iPhone X/XS/XR (Portrait)</option>
            <option value="18/9">18:9 Google Pixel XL2/XL3</option>
          </select>
        </div>
        <div className="flex items-center">
          <button
            className={`text-black dark:text-white py-1 px-2 rounded-md font-medium border border-gray-500 ml-2 flex items-center ${
              undoHistory.length === 0 ? "text-gray-400 dark:text-gray-600" : ""
            }`}
            onClick={() => {
              if (undoHistory.length > 0) {
                setclicks(clicks + 1);
                const prevMainState = undoHistory[undoHistory.length - 1];
                setRedoHistory((prevRedoHistory) => [
                  ...prevRedoHistory,
                  mainState,
                ]);
                setUndoHistory((prevUndoHistory) =>
                  prevUndoHistory.slice(0, prevUndoHistory.length - 1)
                );
                setcontent(prevMainState.content);
                setCanvasStyles(prevMainState.canvasStyles);
              }
            }}
          >
            <BiUndo size={18} />
          </button>
          <button
            className={`text-black dark:text-white py-1 px-2 rounded-md font-medium border border-gray-500 ml-2 flex items-center ${
              redoHistory.length === 0 ? "text-gray-400 dark:text-gray-600" : ""
            }`}
            onClick={() => {
              if (redoHistory.length > 0) {
                setclicks(clicks + 1);
                const nextMainState = redoHistory[redoHistory.length - 1];
                setUndoHistory((prevUndoHistory) => [
                  ...prevUndoHistory,
                  mainState,
                ]);
                setRedoHistory((prevRedoHistory) =>
                  prevRedoHistory.slice(0, prevRedoHistory.length - 1)
                );
                setcontent(nextMainState.content);
                setCanvasStyles(nextMainState.canvasStyles);
              }
            }}
          >
            <BiRedo size={18} />
          </button>
          <button
            className="text-black dark:text-white py-1 px-2 rounded-md font-medium border border-gray-500 ml-2 flex items-center"
            onClick={() => {
              if (window.confirm("Are you sure you want to Reset?")) {
                if (!designprops) {
                  localStorage.removeItem("localPreset");
                  localStorage.removeItem("localPresetStyles");
                }
                setCanvasStyles((prevStyles) => ({
                  canvasFilters: {
                    brightness: 1,
                    contrast: 1,
                    grayscale: 0,
                    blur: 0,
                    hueRotate: 0,
                    invert: 0,
                    saturate: 1,
                    sepia: 0,
                    opacity: 1,
                  },
                  aspectRatio: 1 / 1,
                  backgroundColor: "#ffffff",
                  bgtheme: "gradient",
                  gradangle: 135,
                  gradientIndex: 27,
                  currentImg: 3,
                }));
                settransform(
                  "translate(-50%,-50%) perspective(500px) rotateY(0deg) rotateX(0deg)"
                );
                setbr(0);
                setshadow(0);
                setframe("none");
                setpdng(3);
                setimg([]);
                setcontent([]);
                setgradientColor(
                  `linear-gradient(${canvasStyles.gradangle}deg, #FF002C, #FF0057, #FF0082, #FF00AD, #FF00D8, #C100FF, #8900FF, #5900FF, #2400FF)`
                );
                setMainState({
                  content: [],
                  canvasStyles: {
                    canvasFilters: {
                      brightness: 1,
                      contrast: 1,
                      grayscale: 0,
                      blur: 0,
                      hueRotate: 0,
                      invert: 0,
                      saturate: 1,
                      sepia: 0,
                      opacity: 1,
                    },
                    aspectRatio: 1 / 1,
                    bgtheme: "gradient",
                    gradangle: 135,
                    gradientIndex: 27,
                    currentImg: 3,
                  },
                });

                const hexRegex = /#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/g;
                const rgbaRegex =
                  /rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/g;
                const hexColors =
                  `linear-gradient(${canvasStyles.gradangle}deg, #FF002F, #FF0055, #FF007C)`.match(
                    hexRegex
                  ) || [];
                const rgbaColors =
                  `linear-gradient(${canvasStyles.gradangle}deg, #FF002F, #FF0055, #FF007C)`.match(
                    rgbaRegex
                  ) || [];

                let rgbaToHex = [];
                for (let i = 0; i < rgbaColors.length; i++) {
                  const values = rgbaColors[i]
                    .replace(/rgba?\(/, "")
                    .replace(/\)/, "")
                    .replace(/[\s+]/g, "")
                    .split(",");
                  const r = parseInt(values[0], 10)
                    .toString(16)
                    .padStart(2, "0");
                  const g = parseInt(values[1], 10)
                    .toString(16)
                    .padStart(2, "0");
                  const b = parseInt(values[2], 10)
                    .toString(16)
                    .padStart(2, "0");
                  const hex = `#${r}${g}${b}`;
                  rgbaToHex.push(hex);
                }
                const colors = [...hexColors, ...rgbaToHex];
                setcustomGrad(colors);
              }
            }}
          >
            <MdOutlineDelete size={18} />
          </button>
        </div>
        <div className="hidden md:flex items-center md:order-2">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default NavDesign;
