import { CustomColor } from "@/Components/files/GradientsAndImages";
import { transformValues } from "../../constants/transforms";
import Offer from "@/Components/Sponsors/Offer";
import { HexAlphaColorPicker } from "react-colorful";
import { FaRegFile } from "react-icons/fa";
import { MdOutlineDelete, MdSettings } from "react-icons/md";
import { Joystick } from "react-joystick-component";
import { useLocation } from "react-router-dom";
import { positions } from "../../constants/positions";

const RightSidebar = ({
  tab,
  quality,
  format,
  username,
  planType,
  setshowLoginModal,
  setshowPremiumModal,
  setquality,
  setformat,
  canvasStyles,
  handleFilterChange,
  setfilename,
  filename,
  setCanvasStyles,
  setbr,
  setshadow,
  setframe,
  setpdng,
  setimg,
  setcontent,
  setMainState,
  setcustomGrad,
  content,
  showWatermark,
  settab,
  customGrad,
  showColorPalette,
  setshowColorPalette,
  showBackgroundPalette,
  setshowBackgroundPalette,
  tilt,
  settilt,
  scolor,
  showScolorPalette,
  setshowScolorPalette,
  settransform,
  transform,
  setgradientColor,
  modalIsOn,
  dwGif,
  location,
  setlocation,
  undoRedoFunc,
  showExtra,
  handleColorChange,
  gradients,
  gradientColor,
  bgImage,
  bgimgref,
  setbgImage,
  custombgImage,
  setcustombgImage,
  solidColors,
  setshowWatermark,
}) => {
  const router = useLocation();
  return (
    <div
      id="rightAside"
      className={`w-full md:max-w-[340px] bg-white dark:bg-[#1a1a1a] p-2 relative top-0 right-0 z-20 pb-12 scrollbar-none overflow-auto md:h-[calc(100vh-56px)]`}
    >
      <div className="w-full flex flex-row items-center justify-between rounded-t-xl p-2 text-xs font-medium border  bg-gray-50 dark:bg-[#0f0f0f] dark:border-gray-950">
        <p
          onClick={() => settab(2)}
          className={`px-4 text-center py-2 rounded-lg cursor-pointer ${
            tab === 2 ? "bg-white dark:bg-[#1a1a1a] shadow-md" : ""
          } font-semibold hover:bg-gray-200 dark:hover:bg-[#121212] mx-1`}
        >
          <MdSettings size={18} />
        </p>

        <p
          onClick={() => settab(3)}
          className={`w-full text-center py-2 rounded-lg cursor-pointer ${
            tab === 3 ? "bg-white dark:bg-[#1a1a1a] shadow-md" : ""
          } font-semibold hover:bg-gray-200 dark:hover:bg-[#121212] mx-1`}
        >
          Edit
        </p>

        <p
          onClick={() => settab(0)}
          className={`w-full text-center py-2 rounded-lg cursor-pointer ${
            tab === 0 ? "bg-white dark:bg-[#1a1a1a] shadow-md" : ""
          } font-semibold hover:bg-gray-200 dark:hover:bg-[#121212] mx-1`}
        >
          Background
        </p>
      </div>

      {tab === 2 && (
        <div className="p-2">
          <div className="flex items-center justify-between mt-2">
            <h6 className="flex items-center text-sm">
              Quality
              <select
                value={quality}
                onChange={(e) => {
                  const value = e.target.value;
                  if ([6, 4, 8].includes(Number(value))) {
                    if (!username) {
                      setshowLoginModal(true);
                    } else if (
                      planType !== "starter" &&
                      planType !== "lifetime"
                    ) {
                      setshowPremiumModal(true);
                    }
                  }
                  setquality(value);
                }}
                className="outline-none bg-white dark:bg-[#0f0f0f] mx-2 px-2 border border-gray-600 rounded-lg text-black dark:text-white"
              >
                <option value={1}>1x</option>
                <option value={2}>2x</option>
                <option value={4}>4x</option>
                <option value={6}>6x</option>
                <option value={8}>8x</option>
              </select>
            </h6>

            <h6 className="flex items-center text-sm">
              Format
              <select
                value={format}
                onChange={(e) => {
                  const value = e.target.value;
                  if (["webp", "svg", "gif"].includes(value)) {
                    if (!username) {
                      setshowLoginModal(true);
                    } else if (
                      planType !== "starter" &&
                      planType !== "lifetime"
                    ) {
                      setshowPremiumModal(true);
                    }
                  }
                  setformat(value);
                }}
                className="outline-none bg-white dark:bg-[#0f0f0f] mx-2 px-2 border border-gray-600 rounded-lg text-black dark:text-white"
              >
                <option value="png">PNG</option>
                <option value="jpeg">JPEG</option>
                <option value="svg">SVG</option>
                <option value="webp">WEBP</option>
              </select>
            </h6>
          </div>

          <div className="my-8">
            {[
              {
                label: "Brightness",
                name: "brightness",
                min: 0,
                max: 2,
                step: 0.1,
              },
              {
                label: "Contrast",
                name: "contrast",
                min: 0,
                max: 2,
                step: 0.1,
              },
              {
                label: "Grayscale",
                name: "grayscale",
                min: 0,
                max: 1,
                step: 0.1,
              },
              { label: "Blur", name: "blur", min: 0, max: 10, step: 0.5 },
              {
                label: "Hue-rotate",
                name: "hueRotate",
                min: 0,
                max: 360,
                step: 10,
              },
              {
                label: "Invert",
                name: "invert",
                min: 0,
                max: 1,
                step: 0.1,
              },
              {
                label: "Opacity",
                name: "opacity",
                min: 0,
                max: 1,
                step: 0.1,
              },
              {
                label: "Saturate",
                name: "saturate",
                min: 0,
                max: 2,
                step: 0.1,
              },
              { label: "Sepia", name: "sepia", min: 0, max: 1, step: 0.1 },
            ].map(({ label, name, min, max, step }) => (
              <div
                key={name}
                className="flex items-center text-xs mb-2 mt-4 font-medium"
              >
                <label className="flex-shrink-0 w-20">{label}:</label>
                <input
                  name={name}
                  className="range accent-gray-600"
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={canvasStyles.canvasFilters[name]}
                  onChange={handleFilterChange}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center text-sm mb-4 mt-4">
            <FaRegFile className="mr-1" />
            <span className="mx-1">File Name</span>
            <input
              value={filename}
              onChange={(e) => setfilename(e.target.value)}
              type="text"
              className="outline-none border-b border-gray-400 bg-transparent text-black dark:text-white ml-1 text-xs"
            />
          </div>

          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to Reset?")) {
                setCanvasStyles({
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
                  gradientIndex: 4,
                  currentImg: 3,
                });
                settransform(" perspective(500px) rotateY(0deg) rotateX(0deg)");
                setbr(0);
                setshadow(0);
                setframe("none");
                setpdng(3);
                setcontent([
                  {
                    photo: "",
                    id: Date.now(),
                    isDeleted: false,
                    shadow: "20",
                    scolor: "#3c3a3a",
                    pdng: 3,
                    scale: "1",
                    br: 1,
                    frame: "none",
                    size: 50,
                    transform:
                      " perspective(500px) rotateY(0deg) rotateX(0deg)",
                    component: "image",
                    position: { left: 50, top: 50 },
                    color: "#000000",
                    background: "#ffffff",
                    title: "Title",
                    subtitle: "subtitle",
                    description:
                      "pixlab is the best tool for creating image mockups",
                    darkMode: false,
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
                    lineNo: false,
                  },
                ]);
                setgradientColor(
                  `linear-gradient(${canvasStyles.gradangle}deg, #FF002F, #FF0055, #FF007C)`
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

                let rgbaToHex = rgbaColors.map((color) => {
                  const values = color
                    .replace(/rgba?\(/, "")
                    .replace(/\)/, "")
                    .split(",");
                  const [r, g, b] = values.map((val) =>
                    parseInt(val, 10).toString(16).padStart(2, "0")
                  );
                  return `#${r}${g}${b}`;
                });

                setcustomGrad([...hexColors, ...rgbaToHex]);
              }
            }}
            className="flex items-center text-sm mt-2 px-4 py-2 rounded-lg font-medium border border-gray-700 bg-white dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#121212]"
          >
            Reset <MdOutlineDelete size={16} />
          </button>
        </div>
      )}

      {tab === 0 ? (
        <>
          <div
            className="w-full flex flex-row items-center justify-between rounded-b-xl p-2 text-xs font-medium border
                bg-gray-50 dark:bg-[#0f0f0f]
                dark:border-gray-950"
          >
            <p
              onClick={() => {
                setCanvasStyles((prevStyles) => ({
                  ...prevStyles,
                  bgtheme: "gradient",
                }));
              }}
              className={`w-full text-center py-2 rounded-[10px] cursor-pointer ${
                canvasStyles.bgtheme === "gradient" ? "shadow-md" : ""
              } font-semibold hover:bg-gray-200 dark:hover:bg-[#121212] ${
                canvasStyles.bgtheme === "gradient"
                  ? "bg-white dark:bg-[#1a1a1a]"
                  : ""
              }`}
            >
              Gradient
            </p>
            <p
              onClick={() => {
                setCanvasStyles((prevStyles) => ({
                  ...prevStyles,
                  bgtheme: "image",
                }));
              }}
              className={`w-full text-center py-2 rounded-[10px] cursor-pointer ${
                canvasStyles.bgtheme === "image" ? "shadow-md" : ""
              } font-semibold hover:bg-gray-200 dark:hover:bg-[#121212] mx-1 ${
                canvasStyles.bgtheme === "image"
                  ? "bg-white dark:bg-[#1a1a1a]"
                  : ""
              }`}
            >
              Image
            </p>
            <p
              onClick={() => {
                setCanvasStyles((prevStyles) => ({
                  ...prevStyles,
                  bgtheme: "solid",
                }));
              }}
              className={`w-full text-center py-2 rounded-[10px] cursor-pointer ${
                canvasStyles.bgtheme === "solid" ? "shadow-md" : ""
              } font-semibold hover:bg-gray-200 dark:hover:bg-[#121212] mx-1 ${
                canvasStyles.bgtheme === "solid"
                  ? "bg-white dark:bg-[#1a1a1a]"
                  : ""
              }`}
            >
              Solid
            </p>
          </div>

          <div
            className={`${
              canvasStyles.bgtheme === "gradient" && showExtra
                ? "flex"
                : "hidden"
            } mt-3`}
          >
            {customGrad.map((color, index) => (
              <CustomColor
                color={color}
                key={index}
                index={index}
                handleColorChange={handleColorChange}
              />
            ))}
          </div>

          <div
            className={`${
              showExtra ? "flex" : "hidden"
            } w-full flex-wrap max-h-[20vh] md:max-h-[40vh] overflow-y-scroll scroll-m-0 justify-center bg-white dark:bg-[#0f0f0f] dark:border-gray-700  border-gray-300 rounded-xl mt-2 p-1`}
          >
            {canvasStyles.bgtheme === "gradient" &&
              gradients.map((gradient, index) => (
                <span
                  onClick={() => {
                    setgradientColor(gradient);
                    setCanvasStyles((prevStyles) => ({
                      ...prevStyles,
                      gradientIndex: index,
                    }));
                    const hexRegex = /#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/g;
                    const rgbaRegex =
                      /rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/g;
                    const hexColors = gradient.match(hexRegex) || [];
                    const rgbaColors = gradient.match(rgbaRegex) || [];

                    const rgbaToHex = rgbaColors.map((rgba) => {
                      const values = rgba
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
                      return `#${r}${g}${b}`;
                    });
                    setcustomGrad([...hexColors, ...rgbaToHex]);
                  }}
                  key={index}
                  className={`block h-8 w-8 m-1 rounded ${
                    gradientColor === gradient ? "rounded-full" : "rounded-sm"
                  } border border-gray-400`}
                  style={{ background: gradient }}
                />
              ))}

            {canvasStyles.bgtheme === "solid" &&
              solidColors.map((solid, index) => (
                <span
                  onClick={() => {
                    setgradientColor(solid);
                    setCanvasStyles((prevStyles) => ({
                      ...prevStyles,
                      gradientIndex: index,
                    }));
                  }}
                  key={index}
                  className={`block h-8 w-8 m-1 ${
                    gradientColor === solid ? "rounded-full" : "rounded-sm"
                  }`}
                  style={{ background: solid }}
                />
              ))}

            <input
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/jfif"
              className="hidden"
              ref={bgimgref}
              onChange={(e) => {
                setcustombgImage(true);
                setbgImage(e.target.files[0]);
              }}
            />

            {canvasStyles.bgtheme === "image" &&
              Array.from({ length: 70 }, (_, i) => (
                <img
                  key={i}
                  onClick={() => {
                    setCanvasStyles((prevStyles) => ({
                      ...prevStyles,
                      currentImg: i + 1,
                    }));
                    setbgImage("");
                    setcustombgImage(false);
                  }}
                  src={`/test${i + 1}.webp`}
                  alt=""
                  className={`h-12 w-12 m-1 ${
                    canvasStyles.currentImg === i + 1 ? "rounded-full" : ""
                  }`}
                />
              ))}
          </div>
        </>
      ) : null}

      {tab === 3
        ? content?.map((item, index) => {
            return (
              <div key={index + 1}>
                <div className="p-4 my-2 rounded-xl text-sm">
                  <div style={{}}>
                    {router.pathname === "/qr-code" ||
                    router.pathname === "/bar-code" ? (
                      <div>
                        <label
                          htmlFor="small-input"
                          className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Enter URL here
                        </label>
                        <input
                          value={item.title}
                          onChange={(e) => {
                            const newArr = [...content]; // create a copy of the original array
                            newArr[index] = {
                              ...item,
                              title: e.target.value,
                            }; // update the shadow property of the selected item
                            undoRedoFunc();
                            setcontent(newArr); // update the state with the new array
                          }}
                          placeholder="eg: www.pixlab.in"
                          type="text"
                          id="small-input"
                          className="block w-full p-2 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-950 text-xs focus:ring-blue-500 focus:border-blue-500 mb-4"
                        />
                      </div>
                    ) : (
                      ""
                    )}

                    <div
                      style={{
                        display:
                          router.pathname === "/screenshot-mockup" ||
                          router.pathname === "/device-mockups/[device]"
                            ? "none"
                            : "flex",
                        alignItems: "flex-start",
                        marginBottom: "24px",
                      }}
                    >
                      <div className="flex items-center cursor-pointer mt-4 relative py-0.5 px-3 border border-gray-300 dark:border-gray-600 rounded-2xl mr-4">
                        <span
                          onClick={() => {
                            setshowBackgroundPalette(false);
                            setshowColorPalette(!showColorPalette);
                          }}
                        >
                          Color
                        </span>

                        <span
                          className="h-4 w-4 rounded-full ml-1 border border-gray-400"
                          style={{ backgroundColor: item.color }}
                          onClick={() => {
                            setshowBackgroundPalette(false);
                            setshowColorPalette(!showColorPalette);
                          }}
                        ></span>

                        {showColorPalette && (
                          <div
                            className="absolute z-50 left-8 top-8 flex flex-col"
                            onMouseLeave={() => {
                              setshowColorPalette(false);
                            }}
                          >
                            <HexAlphaColorPicker
                              color={item.color}
                              onChange={(e) => {
                                const newArr = [...content];
                                newArr[index] = { ...item, color: e };
                                undoRedoFunc();
                                setcontent(newArr);
                              }}
                            />
                            <div className="flex justify-between items-center mt-2">
                              <span className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white text-sm mx-1 px-2 py-0.5 rounded">
                                {item.color}
                              </span>
                              <button
                                className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white text-sm mx-1 px-2 py-0.5 rounded"
                                onClick={() => setshowColorPalette(false)}
                              >
                                Done
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center cursor-pointer mt-4 relative py-0.5 px-3 border border-gray-300 dark:border-gray-600 rounded-2xl">
                        <span
                          onClick={() => {
                            setshowColorPalette(false);
                            setshowBackgroundPalette(!showBackgroundPalette);
                          }}
                        >
                          Background
                        </span>

                        <span
                          className="h-4 w-4 rounded-full ml-1 border border-gray-400"
                          style={{ backgroundColor: item.background }}
                          onClick={() => {
                            setshowColorPalette(false);
                            setshowBackgroundPalette(!showBackgroundPalette);
                          }}
                        ></span>

                        {showBackgroundPalette && (
                          <div
                            className="absolute z-50 left-8 top-8 flex flex-col"
                            onMouseLeave={() => {
                              setshowBackgroundPalette(false);
                            }}
                          >
                            <HexAlphaColorPicker
                              color={item.background}
                              onChange={(e) => {
                                const newArr = [...content];
                                newArr[index] = { ...item, background: e };
                                undoRedoFunc();
                                setcontent(newArr);
                              }}
                            />
                            <div className="flex justify-between items-center mt-2">
                              <span className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white text-sm mx-1 px-2 py-0.5 rounded">
                                {item.background}
                              </span>
                              <button
                                className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white text-sm mx-1 px-2 py-0.5 rounded"
                                onClick={() => setshowBackgroundPalette(false)}
                              >
                                Done
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "12px",
                            marginBottom: "8px",
                            fontWeight: "500",
                            display:
                              router.pathname !== "/device-mockups/[device]"
                                ? "flex"
                                : "none",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <span style={{ flex: 1 }} className="mr-2 md:mr-0">
                            Round
                          </span>
                          <input
                            className="range  accent-gray-600 mx-4 w-2/4"
                            type="range"
                            defaultValue={0}
                            min="0"
                            // max={(size / 200) * canvasWidth}
                            max={60}
                            step="1"
                            id="roundness"
                            value={item.br}
                            // label='Example range'

                            onChange={(e) => {
                              const newArr = [...content]; // create a copy of the original array
                              newArr[index] = {
                                ...item,
                                br: e.target.value,
                              }; // update the shadow property of the selected item
                              undoRedoFunc();
                              setcontent(newArr); // update the state with the new array
                            }}

                            // style={{ marginLeft: "16px", width: "70%" }}
                          />
                        </div>

                        <div
                          style={{
                            fontSize: "12px",
                            marginBottom: "8px",
                            fontWeight: "500",
                            display:
                              router.pathname !== "/device-mockups/[device]"
                                ? "flex"
                                : "none",
                            alignItems: "center",
                          }}
                        >
                          {" "}
                          <span style={{ flex: 1 }} className="mr-2 md:mr-0">
                            Shadow
                          </span>
                          <input
                            className="range  accent-gray-600 mx-4 w-2/4"
                            type="range"
                            defaultValue={0}
                            min="0"
                            value={item.shadow}
                            max="100"
                            step="1"
                            id="shadow"
                            // label='Example range'
                            // onChange={(e) => setshadow(e.target.value)}
                            onChange={(e) => {
                              const newArr = [...content]; // create a copy of the original array
                              newArr[index] = {
                                ...item,
                                shadow: e.target.value,
                              }; // update the shadow property of the selected item
                              undoRedoFunc();
                              setcontent(newArr); // update the state with the new array
                            }}
                            // style={{ marginLeft: "16px", width: "70%" }}
                          />
                        </div>

                        <div
                          style={{
                            fontSize: "12px",
                            marginBottom: "8px",
                            fontWeight: "500",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {" "}
                          <span style={{ flex: 1 }} className="mr-2 md:mr-0">
                            Padding
                          </span>
                          <input
                            className="range  accent-gray-600 mx-4 w-2/4"
                            type="range"
                            value={item.pdng}
                            min="0"
                            max="10"
                            step="0.5"
                            id="pdng"
                            onChange={(e) => {
                              const newArr = [...content];
                              newArr[index] = {
                                ...item,
                                pdng: e.target.value,
                              };
                              undoRedoFunc();
                              setcontent(newArr);
                            }}
                          />
                        </div>
                        <div
                          style={{
                            fontSize: "12px",
                            marginBottom: "8px",
                            fontWeight: "500",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {" "}
                          <span style={{ flex: 1 }} className="mr-2 md:mr-0">
                            Scale
                          </span>
                          <input
                            className="range  accent-gray-600 mx-4 w-2/4"
                            type="range"
                            value={item.scale}
                            min="0.15"
                            max="2"
                            step="0.1"
                            id="scale"
                            onChange={(e) => {
                              const newArr = [...content];
                              newArr[index] = {
                                ...item,
                                scale: e.target.value,
                              };
                              undoRedoFunc();
                              setcontent(newArr);
                            }}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col items-center border-l border-gray-400 px-4 py-2">
                        <span
                          onClick={() => {
                            settilt(!tilt);
                            const transformValue = ` perspective(500px) rotateY(0deg) rotateX(0deg)`;

                            const newArr = [...content]; // create a copy of the original array
                            newArr[index] = {
                              ...item,
                              transform: transformValue,
                            }; // update the shadow property of the selected item
                            undoRedoFunc();
                            setcontent(newArr); // update the state with the new array
                          }}
                          className={`flex-1 font-medium px-3 py-1 mb-2 rounded-full border border-gray-600 cursor-pointer select-none text-sm
      ${tilt ? "bg-gray-100 dark:bg-[#1a1a1a]" : ""}
    `}
                        >
                          Tilt
                        </span>

                        {tilt && (
                          <div>
                            <Joystick
                              baseColor="whitesmoke"
                              stickColor="black"
                              size={40}
                              move={(e) => {
                                const { x, y } = e;

                                const maxTilt = 2000; // maximum tilt angle in degrees
                                const tiltX = (maxTilt * x) / 50; // calculate tilt angle for X axis
                                const tiltY = (maxTilt * y) / 50; // calculate tilt angle for Y axis

                                const transformValue = ` perspective(500px) rotateY(${tiltX}deg) rotateX(${tiltY}deg)`;

                                // settransform(transformValue);

                                const newArr = [...content]; // create a copy of the original array
                                newArr[index] = {
                                  ...item,
                                  transform: transformValue,
                                }; // update the shadow property of the selected item
                                undoRedoFunc();
                                setcontent(newArr); // update the state with the new array
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div
                      className="flex-wrap"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: "8px",
                      }}
                    >
                      <h6 className="flex items-center text-sm font-medium">
                        Frame
                        <select
                          value={item.frame}
                          onChange={(e) => {
                            if (
                              e.target.value === "iphone-15-pro" ||
                              e.target.value === "macbook-pro"
                            ) {
                              const newArr = [...content]; // create a copy of the original array
                              let s = "0.5";
                              if (window.innerWidth < 600) {
                                s = "0.3";
                              }
                              newArr[index] = {
                                ...item,
                                frame: e.target.value,
                                scale: s,
                              }; // update the shadow property of the selected item
                              undoRedoFunc();
                              setCanvasStyles((prevStyles) => ({
                                ...prevStyles,
                                aspectRatio: 1,
                              }));
                              setcontent(newArr); // update the state with the new array
                            } else {
                              const newArr = [...content]; // create a copy of the original array
                              newArr[index] = {
                                ...item,
                                frame: e.target.value,
                              }; // update the shadow property of the selected item
                              undoRedoFunc();
                              setcontent(newArr); // update the state with the new array
                            }
                          }}
                          name="category"
                          className={`outline-none bg-white dark:bg-[#19191a] ml-2 px-2 py-1 border border-gray-600 rounded-full text-sm text-black dark:text-white`}
                        >
                          {router.pathname === "/device-mockups/[device]" ? (
                            <>
                              <option value="iphone-15-pro">Iphone 15</option>
                              <option value="macbook-pro">MacBook Pro</option>
                              <option value="arc-light">Arc Light</option>
                              <option value="arc-dark">Arc Dark</option>
                            </>
                          ) : (
                            <>
                              <option value="none">None</option>
                              <option value="macOS-black">macOS Black</option>
                              <option value="macOS-white">macOS White</option>
                              {router.pathname === "/screenshot-mockup" && (
                                <>
                                  <option value="arc-light">Arc Light</option>
                                  <option value="arc-dark">Arc Dark</option>
                                  <option value="iphone-15-pro">
                                    Iphone 15
                                  </option>
                                  <option value="macbook-pro">
                                    MacBook Pro
                                  </option>
                                </>
                              )}
                              <option value="photograph">Photograph</option>
                              <option value="black">Black</option>
                              <option value="white">White</option>
                              <option value="dodgerblue">Blue</option>
                              <option value="hotpink">Hotpink</option>
                              <option value="green">Green</option>
                              <option value="blueviolet">Blue Violet</option>
                              <option value="gold">Gold</option>
                            </>
                          )}
                        </select>
                      </h6>

                      <div
                        className="bg-gray-100 dark:bg-[#1a1a1a]"
                        style={{
                          cursor: "pointer",
                          position: "relative",
                          display:
                            router.pathname !== "/device-mockups/[device]"
                              ? "flex"
                              : "none",
                          alignItems: "center",
                          padding: "2px 12px",
                          border: "1px solid rgb(80,80,80)",
                          borderRadius: "18px",
                        }}
                      >
                        <span
                          style={{}}
                          onClick={() => {
                            setshowScolorPalette(!showScolorPalette);
                          }}
                        >
                          Shadow
                        </span>

                        <span
                          style={{
                            height: "16px",
                            width: "16px",
                            borderRadius: "50%",
                            backgroundColor: scolor,
                            border: "1px solid gray",
                            marginLeft: "4px",
                          }}
                          onClick={() => {
                            setshowScolorPalette(!showScolorPalette);
                          }}
                        ></span>

                        {showScolorPalette ? (
                          <div
                            onMouseLeave={() => {
                              setshowScolorPalette(false);
                            }}
                            style={{
                              position: "absolute",
                              zIndex: 800,
                              left: "-100px",
                              top: "32px",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <HexAlphaColorPicker
                              color={item.scolor}
                              onChange={(e) => {
                                const newArr = [...content]; // create a copy of the original array
                                newArr[index] = { ...item, scolor: e }; // update the shadow property of the selected item
                                undoRedoFunc();
                                setcontent(newArr); // update the state with the new array
                              }}
                            />

                            <div className="flex justify-between items-center text-white dark:black">
                              <span
                                onClick={() => {}}
                                style={{
                                  background: "whitesmoke",
                                  color: "rgb(50,50,50)",
                                  fontSize: "14px",
                                  margin: "4px",
                                  padding: "0px 8px",
                                  border: "none",
                                  borderRadius: "4px",
                                }}
                              >
                                {item.scolor}
                              </span>
                              <button
                                style={{
                                  background: "whitesmoke",
                                  color: "rgb(50,50,50)",
                                  fontSize: "14px",
                                  margin: "4px",
                                  padding: "0px 8px",
                                  border: "none",
                                  borderRadius: "4px",
                                }}
                                onClick={() => setshowScolorPalette(false)}
                              >
                                Done
                              </button>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

                      {router.pathname === "/code" && (
                        <div className="flex items-center justify-start mt-2">
                          <select
                            value={item.lang}
                            onChange={(e) => {
                              const newArr = [...content];
                              newArr[index] = { ...item, lang: e.target.value };
                              undoRedoFunc();
                              setcontent(newArr);
                            }}
                            className="outline-none bg-white dark:bg-[#19191a] mr-2 px-2 py-1 border border-gray-600 rounded-full text-sm text-black dark:text-white"
                          >
                            <option value="html">HTML</option>
                            <option value="css">CSS</option>
                            <option value="javascript">JavaScript</option>
                            <option value="python">Python</option>
                            <option value="java">Java</option>
                            <option value="cpp">C++</option>
                            <option value="rust">Rust</option>
                            <option value="sql">SQL</option>
                            <option value="json">JSON</option>
                            <option value="wast">Wast</option>
                          </select>

                          <select
                            value={item.codetheme}
                            onChange={(e) => {
                              const newArr = [...content];
                              newArr[index] = {
                                ...item,
                                codetheme: e.target.value,
                              };
                              undoRedoFunc();
                              setcontent(newArr);
                            }}
                            className="outline-none bg-white dark:bg-[#19191a] mr-2 px-2 py-1 border border-gray-600 rounded-full text-sm text-black dark:text-white"
                          >
                            <option value="dracula">Dracula</option>
                            <option value="okaidia">Okaidia</option>
                            <option value="darcula">Darcula</option>
                            <option value="androidstudio">
                              Android Studio
                            </option>
                            <option value="atomone">Atomone</option>
                            <option value="githubDark">Github Dark</option>
                            <option value="githubLight">Github Light</option>
                            <option value="abcdef">ABCDEF</option>
                            <option value="aura">Aura</option>
                            <option value="nord">Nord</option>
                            <option value="tomorrowNightBlue">
                              Tomorrow Night Blue
                            </option>
                            <option value="vscodeDark">VS Code Dark</option>
                            <option value="androidstudio">
                              Android Studio
                            </option>
                            <option value="materialDark">Material Dark</option>
                            <option value="gruvboxdark">Gruvbox Dark</option>
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div key={index} className="p-4 mt-4 rounded-xl text-sm w-full">
                  <div className="flex overflow-x-auto scroll-m-0 scrollbar-none">
                    {transformValues?.map((t, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          const transformValue =
                            transform === t
                              ? "perspective(500px) rotateY(0deg) rotateX(0deg)"
                              : t;

                          const newArr = [...content];
                          newArr[index] = {
                            ...item,
                            transform: transformValue,
                          };
                          undoRedoFunc();
                          setcontent(newArr);
                          settransform(transformValue);
                        }}
                        className={`flex-shrink-0 w-20 h-20 mr-2 rounded-sm ${
                          transform === t
                            ? "border-2 border-gray-800 dark:border-gray-300"
                            : ""
                        }`}
                        style={{
                          background:
                            canvasStyles.bgtheme === "gradient" ||
                            canvasStyles.bgtheme === "solid"
                              ? gradientColor
                              : canvasStyles.bgtheme === "image" &&
                                !custombgImage
                              ? `url(/test${canvasStyles.currentImg}.webp)`
                              : canvasStyles.bgtheme === "image" &&
                                custombgImage &&
                                bgImage?.name?.length > 0
                              ? `url(${URL.createObjectURL(bgImage)})`
                              : "",
                          backgroundSize: "cover",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          filter: !modalIsOn
                            ? `brightness(${canvasStyles.canvasFilters.brightness}) contrast(${canvasStyles.canvasFilters.contrast}) grayscale(${canvasStyles.canvasFilters.grayscale}) blur(${canvasStyles.canvasFilters.blur}px) hue-rotate(${canvasStyles.canvasFilters.hueRotate}deg) invert(${canvasStyles.canvasFilters.invert}) opacity(${canvasStyles.canvasFilters.opacity}) saturate(${canvasStyles.canvasFilters.saturate}) sepia(${canvasStyles.canvasFilters.sepia})`
                            : "",
                          opacity: dwGif ? opacity : 1,
                        }}
                      >
                        <div
                          className="w-12 h-12 bg-slate-50 border"
                          style={{ transform: t }}
                        ></div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center mt-4">
                    <div className="grid grid-cols-3 w-fit">
                      {positions?.map((p, pIndex) => (
                        <div
                          key={pIndex}
                          onClick={() => setlocation(p)}
                          className={`w-16 h-10 m-1 rounded bg-slate-200 dark:bg-slate-700 ${
                            location === p ? "border border-gray-400" : ""
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        : ""}

      <label className="inline-flex items-center m-2 my-8  cursor-pointer">
        <input
          checked={showWatermark}
          onChange={() => {
            if (!username) {
              setshowLoginModal(true);
            } else if (planType === "free" && showWatermark) {
              setshowPremiumModal(true);
            } else {
              setshowWatermark(!showWatermark);
            }
          }}
          id="showWatermark"
          type="checkbox"
          value=""
          className="sr-only peer"
        />
        <div className="relative w-9 h-5 bg-gray-200 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all  peer-checked:bg-teal-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-100 ">
          Show Watermark
        </span>
      </label>

      <Offer></Offer>
    </div>
  );
};

export default RightSidebar;
