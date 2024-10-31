import { MdFileDownload } from "react-icons/md";
import { Link } from "react-router-dom";
import ModeToggle from "../../Components/shared/header/ModeToggle";
const Nav = ({
  canvasStyles,
  setCanvasHeight,
  setCanvasStyles,
  setCanvasWidth,
  format,
  saveImage,
  handleDownload,
  handleDownloadGif,
  divRef,
}) => {
  return (
    <nav className="z-[999] border-b border-gray-300 dark:border-[#1a1a1a] bg-white dark:bg-[#1a1a1a] sticky top-0 w-full h-[56px] shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <Link to={"/"} className="md:flex items-center">
          <img
            src="/favicon.png"
            className="h-10 mr-3 rounded-lg shadow-md transform transition-transform hover:rotate-0 -rotate-6"
            alt="pixlab logo"
          />
        </Link>
        <div className="flex items-center space-x-2">
          <button
            className="text-sm text-white px-4 py-1 flex items-center rounded-lg font-medium bg-black dark:bg-[#3b3939] dark:text-gray-100 transition-transform transform hover:scale-105 hover:bg-gray-800 dark:hover:bg-[#4a4848] "
            onClick={() => {
              if (format !== "gif") {
                const isIOS =
                  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
                  !window.MSStream;
                const isSafari = /^((?!chrome|android).)*safari/i.test(
                  navigator.userAgent
                );

                if (isIOS || isSafari) {
                  saveImage();
                } else {
                  handleDownload();
                }
              } else if (format === "gif") {
                handleDownloadGif();
              }
            }}
          >
            <span>Save</span>
            <MdFileDownload className="ml-2 mt-[1px]" />
          </button>

          <select
            value={canvasStyles.aspectRatio}
            onChange={(e) => {
              setCanvasStyles((prevStyles) => ({
                ...prevStyles,
                aspectRatio: e.target.value,
              }));

              setTimeout(() => {
                const parentDiv = divRef.current;
                if (parentDiv) {
                  const width = parentDiv.clientWidth;
                  const height = parentDiv.clientHeight;
                  setCanvasWidth(width);
                  setCanvasHeight(height);
                }
              }, 200);
            }}
            name="category"
            id=""
            className="text-sm outline-none dark:bg-[#19191a] bg-white px-3 py-1 border border-gray-600 dark:border-gray-500 rounded-xl dark:text-white text-black max-w-[100px] hover:border-gray-400 dark:hover:border-gray-400 transition-all"
          >
            <option value="auto">Auto</option>
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

        <div className="flex items-center md:order-2">
          <Link
            to="/"
            className="border text-xs text-gray-600 dark:text-gray-300 py-1 px-3 rounded-lg hidden sm:flex dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-[#121212] transition-all"
          >
            View all templates
          </Link>
          <div className="ml-2">
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
