import FontsYard from "@/Components/Fonts/FontsYard";
import Offer from "@/Components/Sponsors/Offer";
import { CustomColor } from "@/Components/files/GradientsAndImages";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { HexAlphaColorPicker } from "react-colorful";
import { BiFontSize, BiText } from "react-icons/bi";
import {
  FaBold,
  FaItalic,
  FaLayerGroup,
  FaRegFile,
  FaUnderline,
} from "react-icons/fa";
import {
  MdAdd,
  MdDragIndicator,
  MdOutlineDelete,
  MdRemove,
  MdSettings,
} from "react-icons/md";
import { Joystick } from "react-joystick-component";
import { transformValues } from "../../constants/transforms";

const EditOptionsDesign = ({
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
  setscolor,
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
  setshowExtra,
  handleColorChange,
  gradients,
  gradientIndex,
  gradangle,
  gradientColor,
  bgImage,
  bgimgref,
  setbgImage,
  setcustombgImage,
  solidColors,
  setshowWatermark,
  dm,
  isIOS,
  isSafari,
  designprops,
  currentActive,
  setcurrentActive,
  currentTag,
  canvasWidth,
  custombgImage,
}) => {
  function onDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(content);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    undoRedoFunc();

    setcontent(items);
    console.log(items);
  }
  return (
    <div
      id="rightAside"
      className="w-full md:max-w-[340px] bg-white dark:bg-[#1a1a1a] p-2 relative top-0 right-0  z-20 pb-16 "
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <div className="w-full flex flex-row items-center justify-between rounded-t-xl p-2 text-xs font-medium border  bg-gray-50 dark:bg-[#0f0f0f] dark:border-gray-950">
        <p
          onClick={() => settab(2)}
          className={`px-4 text-center py-2 rounded-[10px] cursor-pointer ${
            tab === 2 ? "shadow-md" : ""
          } font-semibold hover:bg-gray-200 dark:hover:bg-[#121212] mx-1`}
          style={{
            background: tab === 2 ? "" : "",
          }}
        >
          <MdSettings size={18} />
        </p>

        <p
          onClick={() => settab(3)}
          className={`w-full text-center py-2 rounded-[10px] cursor-pointer ${
            tab === 3 ? "bg-white dark:bg-[#1a1a1a] shadow-md" : ""
          } font-semibold hover:bg-gray-200 dark:hover:bg-[#121212] mx-1`}
        >
          Edit
        </p>

        <p
          onClick={() => settab(0)}
          className={`w-full text-center py-2 rounded-[10px] cursor-pointer ${
            tab === 0 ? "bg-white dark:bg-[#1a1a1a] shadow-md" : ""
          } font-semibold hover:bg-gray-200 dark:hover:bg-[#121212] mx-1`}
        >
          Background
        </p>

        <p
          onClick={() => settab(1)}
          className={`px-4 text-center py-2 rounded-[10px] cursor-pointer ${
            tab === 1 ? "bg-white dark:bg-[#1a1a1a] shadow-md" : ""
          } font-semibold hover:bg-gray-200 dark:hover:bg-[#121212] mx-1`}
        >
          <FaLayerGroup size={16} />
        </p>
      </div>

      {tab === 1 ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {content.map((item, index) => (
                  <Draggable
                    key={item.id.toString()}
                    draggableId={item.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div
                          onClick={() => {
                            setcurrentActive(item.id);
                          }}
                          style={{
                            background:
                              currentActive === item.id
                                ? dm
                                  ? "rgb(30,30,30)"
                                  : "whitesmoke"
                                : "none",
                            margin: "4px 0",
                            padding: "4px",
                            display: "flex",
                            alignItems: "center",
                            borderRadius: "1rem",
                          }}
                        >
                          <MdDragIndicator
                            size={20}
                            color="gray"
                          ></MdDragIndicator>

                          <span style={{ fontSize: "14px" }}>
                            {item.component.charAt(0).toUpperCase() +
                              item.component.slice(1).toLowerCase()}{" "}
                            -{item.id.toString()}
                          </span>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        ""
      )}
      {tab === 2 ? (
        <div style={{ padding: "8px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "8px",
            }}
          >
            <h6
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "14px",
              }}
            >
              Quality
              <select
                value={quality}
                onChange={(e) => {
                  if (
                    e.target.value == 6 ||
                    e.target.value == 4 ||
                    e.target.value == 8
                  ) {
                    if (!username || username === null) {
                      return setshowLoginModal(true);
                    }

                    if (planType !== "starter" && planType !== "lifetime") {
                      return setshowPremiumModal(true);
                    }
                  }
                  setquality(e.target.value);
                }}
                name="category"
                id=""
                className="outline-none bg-white dark:bg-[#0f0f0f] mx-2 px-2 border border-gray-600 rounded-lg text-black dark:text-white"
              >
                <option value={1}>1x</option>
                <option value={2}>2x</option>
                <option value={4}>4x</option>
                <option value={6}>6x</option>
                <option value={8}>8x</option>
              </select>
            </h6>

            <h6
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "14px",
              }}
            >
              Format
              <select
                value={format}
                onChange={(e) => {
                  if (
                    e.target.value == "webp" ||
                    e.target.value == "svg" ||
                    e.target.value == "gif"
                  ) {
                    if (!username || username === null) {
                      return setshowLoginModal(true);
                    }

                    if (planType !== "starter" && planType !== "lifetime") {
                      return setshowPremiumModal(true);
                    }
                  }
                  setformat(e.target.value);
                }}
                name="category"
                id=""
                className="outline-none bg-white dark:bg-[#0f0f0f] mx-2 px-2 border border-gray-600 rounded-lg text-black dark:text-white"
              >
                <option value="png">PNG</option>
                <option value="jpeg">JPEG</option>
                {isIOS && isSafari ? null : (
                  <>
                    {/* <option value="gif">GIF</option> */}
                    <option value="svg">SVG</option>
                    <option value="webp">WEBP</option>
                  </>
                )}
              </select>
            </h6>
          </div>

          <div
            style={{
              fontSize: "14px",
              marginBottom: "8px",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              marginTop: "16px",
            }}
          >
            <label style={{ flex: 0.5 }}>Brightness:</label>
            <input
              name="brightness"
              className="range  accent-gray-600"
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={canvasStyles.canvasFilters.brightness}
              onChange={handleFilterChange}
            />
          </div>
          <div
            style={{
              fontSize: "14px",
              marginBottom: "8px",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
            }}
          >
            <label style={{ flex: 0.5 }}>Contrast:</label>
            <input
              name="contrast"
              className="range  accent-gray-600"
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={canvasStyles.canvasFilters.contrast}
              onChange={handleFilterChange}
            />
          </div>
          <div
            style={{
              fontSize: "14px",
              marginBottom: "8px",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
            }}
          >
            <label style={{ flex: 0.5 }}>Grayscale:</label>
            <input
              name="grayscale"
              className="range  accent-gray-600"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={canvasStyles.canvasFilters.grayscale}
              onChange={handleFilterChange}
            />
          </div>
          <div
            style={{
              fontSize: "14px",
              marginBottom: "8px",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
            }}
          >
            <label style={{ flex: 0.5 }}>Blur:</label>
            <input
              name="blur"
              className="range  accent-gray-600"
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={canvasStyles.canvasFilters.blur}
              onChange={handleFilterChange}
            />
          </div>
          <div
            style={{
              fontSize: "14px",
              marginBottom: "8px",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
            }}
          >
            <label style={{ flex: 0.5 }}>Hue-rotate:</label>
            <input
              name="hueRotate"
              className="range  accent-gray-600"
              type="range"
              min="0"
              max="360"
              step="10"
              value={canvasStyles.canvasFilters.hueRotate}
              onChange={handleFilterChange}
            />
          </div>
          <div
            style={{
              fontSize: "14px",
              marginBottom: "8px",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
            }}
          >
            <label style={{ flex: 0.5 }}>Invert:</label>
            <input
              name="invert"
              className="range  accent-gray-600"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={canvasStyles.canvasFilters.invert}
              onChange={handleFilterChange}
            />
          </div>
          <div
            style={{
              fontSize: "14px",
              marginBottom: "8px",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
            }}
          >
            <label style={{ flex: 0.5 }}>Opacity:</label>
            <input
              name="opacity"
              className="range  accent-gray-600"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={canvasStyles.canvasFilters.opacity}
              onChange={handleFilterChange}
            />
          </div>
          <div
            style={{
              fontSize: "14px",
              marginBottom: "8px",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
            }}
          >
            <label style={{ flex: 0.5 }}>Saturate:</label>
            <input
              name="saturate"
              className="range  accent-gray-600"
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={canvasStyles.canvasFilters.saturate}
              onChange={handleFilterChange}
            />
          </div>
          <div
            style={{
              fontSize: "14px",
              marginBottom: "8px",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
            }}
          >
            <label style={{ flex: 0.5 }}>Sepia:</label>
            <input
              name="sepia"
              className="range  accent-gray-600"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={canvasStyles.canvasFilters.sepia}
              onChange={handleFilterChange}
            />
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
            color="dark"
            onClick={() => {
              if (window.confirm("Are you sure you want to Reset ?")) {
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
                  gradientIndex: 4,
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
            style={{
              color: dm ? "white" : "black",
              padding: "4px 8px",
              borderRadius: "6px",
              fontWeight: "500",
              alignItems: "center",
              background: dm ? "black" : "white",
              // border: "none",
              border: "1px solid rgb(80,80,80)",
              marginTop: "8px",
            }}
            className="flex items-center text-sm"
          >
            Reset <MdOutlineDelete size={16} />{" "}
          </button>

          {/* <button onClick={savePreset} >Save as Preset</button> */}
        </div>
      ) : (
        ""
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
            style={{
              display:
                canvasStyles.bgtheme === "gradient" && showExtra
                  ? "flex"
                  : "none",
              marginTop: "12px",
            }}
          >
            {customGrad.map((color, index) => (
              <div key={index + 1}>
                <CustomColor
                  color={color}
                  key={index}
                  dm={dm}
                  handleColorChange={handleColorChange}
                ></CustomColor>
              </div>
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
                  onClick={(e) => {
                    setgradientColor(gradient);
                    undoRedoFunc();
                    setCanvasStyles((prevStyles) => ({
                      ...prevStyles,
                      gradientIndex: index,
                    }));
                    // const regex = /#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/g;
                    // const colors = gradient.match(regex);
                    const hexRegex = /#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/g;
                    const rgbaRegex =
                      /rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/g;
                    const hexColors = gradient.match(hexRegex) || [];
                    const rgbaColors = gradient.match(rgbaRegex) || [];

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
                    // console.log(customGrad)
                    // console.log(colors)
                  }}
                  key={index}
                  className={`block h-8 w-8 m-1 rounded ${
                    gradientColor === gradient ? "rounded-full" : "rounded-sm"
                  } border border-gray-400`}
                  style={{ background: gradient }}
                ></span>
              ))}

            {canvasStyles.bgtheme === "solid" &&
              solidColors.map((solid, index) => (
                <span
                  onClick={(e) => {
                    //console.log(gradientColor)
                    setgradientColor(solid);
                    // setgradientIndex(index)
                    undoRedoFunc();
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
                ></span>
              ))}

            <input
              type="file"
              accept="image/png, image/jpg, image/jpeg,image/jfif"
              style={{ display: "none" }}
              ref={bgimgref}
              onChange={(e) => {
                setcustombgImage(true);
                setbgImage(e.target.files[0]);
              }}
            />

            {/* {
                    canvasStyles.bgtheme === "image" ?
                      <div onClick={() => {
                        bgimgref.current.click()
                      }} alt="" style={{
                        height: "50px", width: "50px", margin: "4px", color: dm?"white":"black", display: "flex", alignItems: 'center', justifyContent: "center",
                        borderRadius: custombgImage ? "50%" : "0",
                        background: (canvasStyles.bgtheme === "image" && custombgImage && bgImage?.name?.length > 0) ? `url(${URL.createObjectURL(bgImage)})` : "gray", backgroundSize: "cover"

                      }} >
                        <MdAdd size={32} />
                      </div>
                      : ""
                  } */}

            {canvasStyles.bgtheme === "image" &&
              Array(70)
                .fill(0)
                .map((img, i) => {
                  return (
                    <img
                      key={i}
                      onClick={() => {
                        undoRedoFunc();
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
                  );
                })
                .reverse()}
          </div>
        </>
      ) : (
        ""
      )}

      {tab === 3 ? (
        <div className=" p-4 my-2 rounded-xl text-sm">
          {currentActive === "" ? (
            <p className="text-center text-xs">*Select an element to edit it</p>
          ) : (
            ""
          )}
          <div className={`${currentTag === "image" ? "block" : "hidden"}`}>
            {content?.map(
              (item, index) =>
                item.component === "image" && (
                  <div
                    key={index}
                    className={`${
                      item.id == currentActive ? "block" : "hidden"
                    }`}
                  >
                    <div className="flex justify-evenly items-start">
                      <div className="flex flex-col w-full">
                        <div className="text-sm mb-2 font-medium flex items-center">
                          <span className="flex-1">Round</span>
                          <input
                            className="range accent-gray-600 mx-4 w-2/4"
                            type="range"
                            defaultValue={0}
                            min="0"
                            max={item.size / 2}
                            step="1"
                            id="roundness"
                            value={item.br}
                            onChange={(e) => {
                              const newArr = [...content];
                              newArr[index] = { ...item, br: e.target.value };
                              undoRedoFunc();
                              setcontent(newArr);
                            }}
                          />
                        </div>

                        <div className="text-sm mb-2 font-medium flex items-center">
                          <span className="flex-1">Shadow</span>
                          <input
                            className="range accent-gray-600 mx-4 w-2/4"
                            type="range"
                            defaultValue={0}
                            min="0"
                            max="100"
                            step="1"
                            id="shadow"
                            value={item.shadow}
                            onChange={(e) => {
                              const newArr = [...content];
                              newArr[index] = {
                                ...item,
                                shadow: e.target.value,
                              };
                              undoRedoFunc();
                              setcontent(newArr);
                            }}
                          />
                        </div>

                        <div className="text-sm mb-2 font-medium flex items-center">
                          <span className="flex-1">Size</span>
                          <input
                            className="range accent-gray-600 mx-4 w-2/4"
                            type="range"
                            value={item.size}
                            min="0"
                            max="100"
                            step="1"
                            id="size"
                            onChange={(e) => {
                              const newArr = [...content];
                              newArr[index] = { ...item, size: e.target.value };
                              undoRedoFunc();
                              setcontent(newArr);
                            }}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col items-center border-l border-gray-600 dark:border-gray-400 pl-4">
                        <span
                          onClick={() => {
                            settilt(!tilt);
                            const transformValue = `translate(-50%,-50%) perspective(500px) rotateY(0deg) rotateX(0deg)`;
                            const newArr = [...content];
                            newArr[index] = {
                              ...item,
                              transform: transformValue,
                            };
                            undoRedoFunc();
                            setcontent(newArr);
                          }}
                          className={`flex-1 font-medium px-3 py-1 mb-2 rounded-full border border-gray-600 cursor-pointer select-none text-sm
                ${tilt ? "bg-gray-100 dark:bg-gray-800" : ""}
              `}
                        >
                          Tilt
                        </span>

                        <div className={tilt ? "block" : "hidden"}>
                          <Joystick
                            baseColor="whitesmoke"
                            stickColor="black"
                            size={40}
                            move={(e) => {
                              const { x, y } = e;
                              const maxTilt = 2000;
                              const tiltX = (maxTilt * x) / 50;
                              const tiltY = (maxTilt * y) / 50;
                              const transformValue = `translate(-50%,-50%) perspective(500px) rotateY(${tiltX}deg) rotateX(${tiltY}deg)`;
                              const newArr = [...content];
                              newArr[index] = {
                                ...item,
                                transform: transformValue,
                              };
                              undoRedoFunc();
                              setcontent(newArr);
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between my-4">
                      <h6 className="flex items-center">
                        Frame
                        <select
                          value={item.frame}
                          onChange={(e) => {
                            const newArr = [...content];
                            newArr[index] = { ...item, frame: e.target.value };
                            undoRedoFunc();
                            setcontent(newArr);
                          }}
                          name="category"
                          className="outline-none bg-white dark:bg-gray-800 mx-2 px-2 py-1 border border-gray-600 rounded-2xl text-sm"
                        >
                          <option value="none">None</option>
                          <option value="arc-light">Arc Light</option>
                          <option value="arc-dark">Arc Dark</option>
                          <option value="macOS-black">macOS Black</option>
                          <option value="macOS-white">macOS White</option>
                          <option value="photograph">Photograph</option>
                          <option value="mobile-2">Galaxy S8</option>
                          <option value="mobile-3">Mobile 3</option>
                          <option value="mobile-4">Iphone 14 Pro</option>
                          <option value="mobile-5">Iphone X</option>
                          <option value="monitor-white">Monitor White</option>
                          <option value="monitor-black">Monitor Black</option>
                          <option value="laptop-white">Laptop White</option>
                          <option value="laptop-black">Laptop Black</option>
                          <option value="macbook">MacBook</option>
                          <option value="watch-white">Watch White</option>
                          <option value="watch-black">Watch Black</option>
                          <option value="stacked">Stacked</option>
                          <option value="macOS-Dark">macOS Dark</option>
                          <option value="macOS-Light">macOS Light</option>
                          <option value="black">Black </option>
                          <option value="white">White</option>
                          <option value="dodgerblue">Blue</option>
                          <option value="hotpink">Hotpink</option>
                          <option value="green">Green</option>
                          <option value="blueviolet">Blue Violet</option>
                          <option value="gold">Gold</option>
                        </select>
                      </h6>

                      <div className="relative flex items-center px-3 py-1 border border-gray-600 rounded-full cursor-pointer bg-white dark:bg-gray-900">
                        <span
                          onClick={() =>
                            setshowScolorPalette(!showScolorPalette)
                          }
                        >
                          Shadow
                        </span>

                        <span
                          className="h-4 w-4 rounded-full border border-gray-400 ml-1"
                          style={{ backgroundColor: item.scolor }}
                          onClick={() =>
                            setshowScolorPalette(!showScolorPalette)
                          }
                        ></span>

                        {showScolorPalette && (
                          <div
                            onMouseLeave={() => setshowScolorPalette(false)}
                            className="absolute z-50 -left-25 top-8 flex flex-col"
                          >
                            <HexAlphaColorPicker
                              color={item.scolor}
                              onChange={(e) => {
                                const newArr = [...content];
                                newArr[index] = { ...item, scolor: e };
                                undoRedoFunc();
                                setcontent(newArr);
                              }}
                            />

                            <div className="flex items-center justify-between bg-white dark:bg-black">
                              <span className="bg-gray-100 text-gray-800 text-sm m-1 px-2 rounded">
                                {item.scolor}
                              </span>
                              <button
                                className="bg-gray-100 text-gray-800 text-sm m-1 px-2 rounded"
                                onClick={() => setshowScolorPalette(false)}
                              >
                                Done
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex overflow-x-auto scroll-m-0 scrollbar-none">
                      {transformValues?.map((t, i) => (
                        <div
                          key={i}
                          onClick={() => {
                            const transformValue = `translate(-50%,-50%) ${t}`;
                            const newArr = [...content];
                            newArr[index] = {
                              ...item,
                              transform: transformValue,
                            };
                            undoRedoFunc();
                            setcontent(newArr);
                          }}
                          className="flex-shrink-0 w-20 h-20 mr-2 rounded-sm relative flex items-center justify-center"
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
                            aspectRatio: 1,
                            filter: !modalIsOn
                              ? `brightness(${canvasStyles.canvasFilters.brightness}) contrast(${canvasStyles.canvasFilters.contrast}) grayscale(${canvasStyles.canvasFilters.grayscale}) blur(${canvasStyles.canvasFilters.blur}px) hue-rotate(${canvasStyles.canvasFilters.hueRotate}deg) invert(${canvasStyles.canvasFilters.invert})  opacity(${canvasStyles.canvasFilters.opacity}) saturate(${canvasStyles.canvasFilters.saturate}) sepia(${canvasStyles.canvasFilters.sepia})`
                              : "",
                            opacity: dwGif ? opacity : 1,
                          }}
                        >
                          <div
                            className="w-12 h-12 block bg-slate-50 border"
                            style={{ transform: t }}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
            )}
          </div>

          {/* for text */}
          <div className={currentTag === "text" ? "block" : "hidden"}>
            {content?.map((item, index) => {
              return item.component === "text" ? (
                <div
                  key={index}
                  className={`${
                    item.id === currentActive ? "block" : "hidden"
                  } font-medium`}
                >
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    {/* Font Size Control */}
                    <div className="flex items-center text-sm font-medium border border-gray-400 dark:border-gray-700 px-2 py-1 rounded-lg dark:bg-gray-800 bg-gray-200">
                      <BiFontSize
                        className="mr-2 text-gray-600 dark:text-gray-300"
                        size={20}
                      />
                      <MdRemove
                        onClick={() => {
                          const newArr = [...content];
                          newArr[index] = {
                            ...item,
                            fontSize: Math.max(1, item.fontSize - 1),
                          };
                          undoRedoFunc();
                          setcontent(newArr);
                        }}
                        className="cursor-pointer hover:text-red-500"
                      />
                      <input
                        type="number"
                        name="size"
                        value={item.fontSize}
                        min="1"
                        max={canvasWidth}
                        step="1"
                        id="size"
                        onChange={(e) => {
                          const newArr = [...content];
                          newArr[index] = {
                            ...item,
                            fontSize: Math.floor(e.target.value),
                          };
                          undoRedoFunc();
                          setcontent(newArr);
                        }}
                        className="border-none outline-none bg-transparent text-black dark:text-white w-8 text-center mx-1"
                      />
                      <MdAdd
                        onClick={() => {
                          const newArr = [...content];
                          newArr[index] = {
                            ...item,
                            fontSize: Math.min(canvasWidth, item.fontSize + 1),
                          };
                          undoRedoFunc();
                          setcontent(newArr);
                        }}
                        className="cursor-pointer hover:text-green-500"
                      />
                    </div>

                    {/* Text Style Controls */}
                    <div className="flex items-center border border-gray-400 dark:border-gray-700 rounded-lg px-2 py-1 dark:bg-gray-800 bg-gray-200">
                      <FaBold
                        className={`mx-1 cursor-pointer ${
                          item.bold
                            ? "text-skyblue"
                            : "text-gray-600 dark:text-gray-300"
                        } hover:text-skyblue`}
                        onClick={() => {
                          const newArr = [...content];
                          newArr[index] = { ...item, bold: !item.bold };
                          undoRedoFunc();
                          setcontent(newArr);
                        }}
                        size={14}
                      />
                      <FaItalic
                        className={`mx-1 cursor-pointer ${
                          item.italic
                            ? "text-skyblue"
                            : "text-gray-600 dark:text-gray-300"
                        } hover:text-skyblue`}
                        onClick={() => {
                          const newArr = [...content];
                          newArr[index] = { ...item, italic: !item.italic };
                          undoRedoFunc();
                          setcontent(newArr);
                        }}
                        size={14}
                      />
                      <FaUnderline
                        className={`mx-1 cursor-pointer ${
                          item.underline
                            ? "text-skyblue"
                            : "text-gray-600 dark:text-gray-300"
                        } hover:text-skyblue`}
                        onClick={() => {
                          const newArr = [...content];
                          newArr[index] = {
                            ...item,
                            underline: !item.underline,
                          };
                          undoRedoFunc();
                          setcontent(newArr);
                        }}
                        size={14}
                      />
                    </div>

                    {/* Color Picker */}
                    <div className="relative flex items-center border border-gray-400 dark:border-gray-700 rounded-lg px-3 py-1 dark:bg-gray-800 bg-gray-200 cursor-pointer">
                      <span
                        onClick={() => {
                          setshowScolorPalette(!showScolorPalette);
                        }}
                        className="flex items-center"
                      >
                        Color
                        <span
                          className="w-4 h-4 ml-2 border border-gray-300 rounded-full"
                          style={{ backgroundColor: item.fontcolor }}
                        ></span>
                      </span>

                      {showScolorPalette && (
                        <div
                          onMouseLeave={() => setshowScolorPalette(false)}
                          className="absolute z-50 flex flex-col left-[-100px] top-10"
                        >
                          <HexAlphaColorPicker
                            color={item.fontcolor}
                            onChange={(e) => {
                              const newArr = [...content];
                              newArr[index] = { ...item, fontcolor: e };
                              undoRedoFunc();
                              setcontent(newArr);
                            }}
                          />
                          <div className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-700">
                            <span
                              onClick={() => setshowScolorPalette(false)}
                              className="text-sm px-2 py-0.5 rounded-md bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-white"
                            >
                              {item.fontcolor}
                            </span>
                            <button
                              className="text-sm px-2 py-0.5 rounded-md bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-white"
                              onClick={() => setshowScolorPalette(false)}
                            >
                              Done
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Font & Shadow Control */}
                    <FontsYard
                      item={item}
                      content={content}
                      setcontent={setcontent}
                      dm={dm}
                      undoRedoFunc={undoRedoFunc}
                      index={index}
                      setshowPremiumModal={setshowPremiumModal}
                    />
                    <div className="flex items-center border border-gray-400 dark:border-gray-700 rounded-lg px-2 py-1 dark:bg-gray-800 bg-gray-200">
                      <BiText
                        className="mr-2 text-gray-600 dark:text-gray-300"
                        size={20}
                      />
                      <span className="mr-2">Shadow</span>
                      <MdRemove
                        onClick={() => {
                          const newArr = [...content];
                          newArr[index] = {
                            ...item,
                            fontShadow: Math.max(1, item.fontShadow - 1),
                          };
                          undoRedoFunc();
                          setcontent(newArr);
                        }}
                        className="cursor-pointer hover:text-red-500"
                      />
                      <input
                        type="number"
                        name="size"
                        value={item.fontShadow}
                        min="1"
                        max={canvasWidth}
                        step="1"
                        id="size"
                        onChange={(e) => {
                          const newArr = [...content];
                          newArr[index] = {
                            ...item,
                            fontShadow: Math.floor(e.target.value),
                          };
                          undoRedoFunc();
                          setcontent(newArr);
                        }}
                        className="border-none outline-none bg-transparent text-black dark:text-white w-8 text-center mx-1"
                      />
                      <MdAdd
                        onClick={() => {
                          const newArr = [...content];
                          newArr[index] = {
                            ...item,
                            fontShadow: Math.min(
                              canvasWidth,
                              item.fontShadow + 1
                            ),
                          };
                          undoRedoFunc();
                          setcontent(newArr);
                        }}
                        className="cursor-pointer hover:text-green-500"
                      />
                    </div>
                  </div>
                </div>
              ) : null;
            })}
          </div>

          {/* for qr code  */}

          <div className={currentTag === "qrcode" ? "" : "hidden"}>
            {content?.map(
              (item, index) =>
                item.component === "qrcode" && (
                  <div
                    key={index}
                    className={item.id == currentActive ? "" : "hidden"}
                  >
                    <div className="flex justify-evenly items-start">
                      <div className="flex flex-col w-full">
                        <label>Enter Url Here </label>
                        <input
                          placeholder="eg: https://www.pixlab.in"
                          value={item.value}
                          onChange={(e) => {
                            const newArr = [...content];
                            newArr[index] = { ...item, value: e.target.value };
                            undoRedoFunc();
                            setcontent(newArr);
                          }}
                          className="text-sm w-4/5 bg-transparent outline-none  border-b border-gray-500 px-2 p-1 pl-0"
                        />

                        <div className="my-2">
                          <div className="text-sm mb-2 font-medium flex items-center mt-2">
                            <span className="w-16">Shadow</span>
                            <input
                              className="range accent-gray-600 mx-4 w-2/4"
                              type="range"
                              defaultValue={0}
                              min="0"
                              max="100"
                              step="1"
                              value={item.shadow}
                              onChange={(e) => {
                                const newArr = [...content];
                                newArr[index] = {
                                  ...item,
                                  shadow: e.target.value,
                                };
                                undoRedoFunc();
                                setcontent(newArr);
                              }}
                            />
                          </div>
                          <div className="text-sm mb-2 font-medium flex items-center">
                            <span className="w-16">Size</span>
                            <input
                              className="range accent-gray-600 mx-4 w-2/4"
                              type="range"
                              value={item.size}
                              min="0"
                              max="100"
                              step="1"
                              onChange={(e) => {
                                const newArr = [...content];
                                newArr[index] = {
                                  ...item,
                                  size: e.target.value,
                                };
                                undoRedoFunc();
                                setcontent(newArr);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <h6 className="flex items-center">
                        Frame
                        <select
                          value={item.frame}
                          onChange={(e) => {
                            const newArr = [...content];
                            newArr[index] = { ...item, frame: e.target.value };
                            undoRedoFunc();
                            setcontent(newArr);
                          }}
                          name="category"
                          className="outline-none dark:bg-gray-800 bg-white ml-2 mr-2 px-2 py-1 rounded-xl border border-gray-700 text-sm dark:text-white text-black"
                        >
                          <option value="none">None</option>
                          <option value="macOS-Dark">macOS Dark</option>
                          <option value="macOS-black">macOS Black</option>
                          <option value="macOS-Light">macOS Light</option>
                          <option value="macOS-white">macOS White</option>
                          <option value="black">Black</option>
                          <option value="white">White</option>
                          <option value="dodgerblue">Blue</option>
                          <option value="hotpink">Hotpink</option>
                          <option value="green">Green</option>
                          <option value="blueviolet">Blue Violet</option>
                          <option value="gold">Gold</option>
                        </select>
                      </h6>

                      <div className="relative flex items-center px-2 p-1 border border-gray-700 rounded-xl bg-gray-100 dark:bg-gray-900 cursor-pointer ">
                        <span
                          onClick={() => {
                            setshowScolorPalette(!showScolorPalette);
                          }}
                        >
                          Shadow
                        </span>

                        <span
                          className="ml-1 w-4 h-4 rounded-full border border-gray-500"
                          style={{ backgroundColor: item.scolor }}
                          onClick={() => {
                            setshowScolorPalette(!showScolorPalette);
                          }}
                        ></span>

                        {showScolorPalette && (
                          <div
                            className="absolute z-50 left-[-100px] top-8 flex flex-col"
                            onMouseLeave={() => setshowScolorPalette(false)}
                          >
                            <HexAlphaColorPicker
                              color={item.scolor}
                              onChange={(e) => {
                                const newArr = [...content];
                                newArr[index] = { ...item, scolor: e };
                                undoRedoFunc();
                                setcontent(newArr);
                              }}
                            />
                            <div className="flex items-center justify-between px-2 p-1 bg-white dark:bg-black">
                              <span className="text-gray-800 bg-gray-200 px-2 py-0.5 rounded-md">
                                {item.scolor}
                              </span>
                              <button
                                className="text-gray-800 bg-gray-200 px-2 py-0.5 rounded-md"
                                onClick={() => setshowScolorPalette(false)}
                              >
                                Done
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="relative flex items-center px-2 p-1 border border-gray-700 rounded-xl bg-gray-100 dark:bg-gray-900 cursor-pointer ">
                        <span
                          onClick={() => {
                            setshowBackgroundPalette(false);
                            setshowColorPalette(!showColorPalette);
                          }}
                        >
                          Color
                        </span>

                        <span
                          className="ml-1 w-4 h-4 rounded-full border border-gray-500"
                          style={{ backgroundColor: item.color }}
                          onClick={() => {
                            setshowBackgroundPalette(false);
                            setshowColorPalette(!showColorPalette);
                          }}
                        ></span>

                        {showColorPalette && (
                          <div
                            className="absolute z-50 left-8 top-8 flex flex-col"
                            onMouseLeave={() => setshowColorPalette(false)}
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
                            <div className="flex items-center justify-between px-2 p-1 bg-white dark:bg-black">
                              <span className="text-gray-800 bg-gray-200 px-2 py-0.5 rounded-md">
                                {item.color}
                              </span>
                              <button
                                className="text-gray-800 bg-gray-200 px-2 py-0.5 rounded-md"
                                onClick={() => setshowColorPalette(false)}
                              >
                                Done
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="relative flex items-center px-2 p-1 border border-gray-700 rounded-xl bg-gray-100 dark:bg-gray-900 cursor-pointer ">
                        <span
                          onClick={() => {
                            setshowColorPalette(false);
                            setshowBackgroundPalette(!showBackgroundPalette);
                          }}
                        >
                          Background
                        </span>

                        <span
                          className="ml-1 w-4 h-4 rounded-full border border-gray-500"
                          style={{ backgroundColor: item.background }}
                          onClick={() => {
                            setshowColorPalette(false);
                            setshowBackgroundPalette(!showBackgroundPalette);
                          }}
                        ></span>

                        {showBackgroundPalette && (
                          <div
                            className="absolute z-50 left-8 top-8 flex flex-col"
                            onMouseLeave={() => setshowBackgroundPalette(false)}
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
                            <div className="flex items-center justify-between px-2 p-1 bg-white dark:bg-black">
                              <span className="text-gray-800 bg-gray-200 px-2 py-0.5 rounded-md">
                                {item.background}
                              </span>
                              <button
                                className="text-gray-800 bg-gray-200 px-2 py-0.5 rounded-md"
                                onClick={() => setshowBackgroundPalette(false)}
                              >
                                Done
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start"></div>
                  </div>
                )
            )}
          </div>

          {/* for icons */}

          <div className={`${currentTag === "icon" ? "block" : "hidden"}`}>
            {content?.map((item, index) => {
              return item.component === "icon" ? (
                <div
                  key={index}
                  className={`${item.id == currentActive ? "block" : "hidden"}`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`cursor-pointer relative flex items-center px-2 py-1 border rounded-full ${
                        showScolorPalette
                          ? "border-gray-800 bg-gray-900"
                          : "border-gray-400 bg-gray-50"
                      } dark:border-gray-400 dark:bg-gray-900`}
                    >
                      <span
                        onClick={() => setshowScolorPalette(!showScolorPalette)}
                      >
                        Color
                      </span>
                      <span
                        className="ml-1.5 h-4 w-4 rounded-full border border-gray-400"
                        style={{ backgroundColor: item.fontcolor }}
                        onClick={() => setshowScolorPalette(!showScolorPalette)}
                      ></span>

                      {showScolorPalette && (
                        <div
                          onMouseLeave={() => setshowScolorPalette(false)}
                          className="absolute z-[800] left-[-100px] top-8 flex flex-col"
                        >
                          <HexAlphaColorPicker
                            color={item.fontcolor}
                            onChange={(e) => {
                              const newArr = [...content];
                              newArr[index] = { ...item, fontcolor: e };
                              undoRedoFunc();
                              setcontent(newArr);
                            }}
                          />
                          <div className="flex items-center justify-between bg-white dark:bg-black">
                            <span
                              onClick={() => {
                                setshowBackgroundPalette(false);
                                setshowScolorPalette(!showScolorPalette);
                              }}
                              className="bg-gray-200 text-gray-800 text-sm m-1 p-2 rounded-md"
                            >
                              {item.fontcolor}
                            </span>
                            <button
                              className="bg-gray-200 text-gray-800 text-sm m-1 p-2 rounded-md"
                              onClick={() => setshowScolorPalette(false)}
                            >
                              Done
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-evenly mt-2">
                    <div className="flex flex-col w-full my-4">
                      <div className="text-sm mb-2 font-medium flex items-center">
                        <span className="w-16">Size</span>
                        <input
                          className="range accent-gray-600 mx-4 w-2/4"
                          type="range"
                          value={item.size}
                          min="0"
                          max="100"
                          step="1"
                          id="size"
                          onChange={(e) => {
                            const newArr = [...content];
                            newArr[index] = { ...item, size: e.target.value };
                            undoRedoFunc();
                            setcontent(newArr);
                          }}
                        />
                      </div>
                      <div className="text-sm mb-2 font-medium flex items-center ">
                        <span className="w-16">Rotate</span>
                        <input
                          className="range accent-gray-600 mx-4 w-2/4"
                          type="range"
                          value={item.transform}
                          min="0"
                          max={canvasWidth}
                          step="1"
                          id="rotate"
                          onChange={(e) => {
                            const newArr = [...content];
                            newArr[index] = {
                              ...item,
                              transform: e.target.value,
                            };
                            undoRedoFunc();
                            setcontent(newArr);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              );
            })}
          </div>

          {/* for code */}
          <div className={currentTag === "code" ? "" : "hidden"}>
            {content?.map((item, index) => {
              return item.component === "code" ? (
                <div
                  key={index}
                  className={item.id == currentActive ? "" : "hidden"}
                >
                  <div className="flex justify-evenly items-start">
                    <div className="flex flex-col w-full">
                      <div className="text-sm mb-2 font-medium flex items-center">
                        <span className="flex-1">Round</span>
                        <input
                          className="range accent-gray-600 mx-4 w-2/4"
                          type="range"
                          defaultValue={0}
                          min="0"
                          max={item.size / 2}
                          step="1"
                          id="roundness"
                          value={item.br}
                          onChange={(e) => {
                            const newArr = [...content];
                            newArr[index] = { ...item, br: e.target.value };
                            undoRedoFunc();
                            setcontent(newArr);
                          }}
                        />
                      </div>
                      <div className="text-sm mb-2 font-medium flex items-center">
                        <span className="flex-1">Shadow</span>
                        <input
                          className="range accent-gray-600 mx-4 w-2/4"
                          type="range"
                          defaultValue={0}
                          min="0"
                          max="100"
                          step="1"
                          id="shadow"
                          value={item.shadow}
                          onChange={(e) => {
                            const newArr = [...content];
                            newArr[index] = { ...item, shadow: e.target.value };
                            undoRedoFunc();
                            setcontent(newArr);
                          }}
                        />
                      </div>
                      <div className="text-sm mb-2 font-medium flex items-center">
                        <span className="flex-1">Size</span>
                        <input
                          className="range accent-gray-600 mx-4 w-2/4"
                          type="range"
                          value={item.size}
                          min="0"
                          max="100"
                          step="1"
                          id="size"
                          onChange={(e) => {
                            const newArr = [...content];
                            newArr[index] = { ...item, size: e.target.value };
                            undoRedoFunc();
                            setcontent(newArr);
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col items-center border-l border-gray-600 pl-4">
                      <span
                        onClick={() => {
                          settilt(!tilt);
                          const transformValue = `translate(-50%,-50%) perspective(500px) rotateY(0deg) rotateX(0deg)`;
                          const newArr = [...content];
                          newArr[index] = {
                            ...item,
                            transform: transformValue,
                          };
                          undoRedoFunc();
                          setcontent(newArr);
                        }}
                        className={`flex-1 font-medium px-3 py-1 mb-2 rounded-full border border-gray-600 cursor-pointer select-none text-sm ${
                          tilt ? "bg-gray-100 dark:bg-[#1a1a1a]" : ""
                        }`}
                      >
                        Tilt
                      </span>

                      <div className={tilt ? "" : "hidden"}>
                        <Joystick
                          baseColor="whitesmoke"
                          stickColor="black"
                          size={40}
                          move={(e) => {
                            const { x, y } = e;
                            const maxTilt = 2000;
                            const tiltX = (maxTilt * x) / 50;
                            const tiltY = (maxTilt * y) / 50;
                            const transformValue = `translate(-50%,-50%) perspective(500px) rotateY(${tiltX}deg) rotateX(${tiltY}deg)`;
                            const newArr = [...content];
                            newArr[index] = {
                              ...item,
                              transform: transformValue,
                            };
                            undoRedoFunc();
                            setcontent(newArr);
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="my-4">
                    <div className="flex items-center justify-between">
                      <h6 className="mt-2 flex items-center">
                        Frame
                        <select
                          value={item.frame}
                          onChange={(e) => {
                            const newArr = [...content];
                            newArr[index] = { ...item, frame: e.target.value };
                            undoRedoFunc();
                            setcontent(newArr);
                          }}
                          className="outline-none bg-white dark:bg-[#19191a] ml-2 px-2 py-1 border border-gray-600 rounded-full text-sm text-black dark:text-white"
                        >
                          <option value="none">None</option>
                          <option value="macOS-Dark">macOS Dark</option>
                          <option value="macOS-black">macOS Black</option>
                          <option value="macOS-Light">macOS Light</option>
                          <option value="macOS-white">macOS White</option>
                          <option value="black">Black</option>
                          <option value="white">White</option>
                          <option value="dodgerblue">Blue</option>
                          <option value="hotpink">Hotpink</option>
                          <option value="green">Green</option>
                          <option value="blueviolet">Blue Violet</option>
                          <option value="gold">Gold</option>
                        </select>
                      </h6>

                      <div className="cursor-pointer mt-2 flex items-center px-2 py-1 border border-gray-600 rounded-full bg-gray-50 dark:bg-[#0a0a0a]">
                        <span
                          onClick={() => {
                            setshowScolorPalette(!showScolorPalette);
                          }}
                        >
                          Shadow
                        </span>

                        <span
                          className="h-4 w-4 rounded-full ml-2 border border-gray-600"
                          style={{ backgroundColor: item.scolor }}
                          onClick={() => {
                            setshowScolorPalette(!showScolorPalette);
                          }}
                        ></span>

                        {showScolorPalette ? (
                          <div
                            onMouseLeave={() => setshowScolorPalette(false)}
                            className="absolute z-50 left-[-100px] top-[32px] flex flex-col"
                          >
                            <HexAlphaColorPicker
                              color={item.scolor}
                              onChange={(e) => {
                                const newArr = [...content];
                                newArr[index] = { ...item, scolor: e };
                                undoRedoFunc();
                                setcontent(newArr);
                              }}
                            />

                            <div className="flex items-center justify-between bg-white dark:bg-black p-2 rounded">
                              <span className="bg-whitesmoke text-gray-800 text-sm p-1 rounded">
                                {scolor}
                              </span>
                              <button
                                className="bg-whitesmoke text-gray-800 text-sm p-1 rounded"
                                onClick={() => setshowScolorPalette(false)}
                              >
                                Done
                              </button>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>

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
                        <option value="androidstudio">Android Studio</option>
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
                        <option value="androidstudio">Android Studio</option>
                        <option value="materialDark">Material Dark</option>
                        <option value="gruvboxdark">Gruvbox Dark</option>
                      </select>
                    </div>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </div>
      ) : (
        ""
      )}

      <label className="inline-flex items-center m-2 my-8  cursor-pointer">
        <input
          checked={showWatermark}
          onChange={() => {
            if (!username) {
              setshowLoginModal(true);
            } else if (planType === "free") {
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
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-100">
          Show Watermark
        </span>
      </label>

      <Offer></Offer>
    </div>
  );
};

export default EditOptionsDesign;
