import domtoimage from "dom-to-image";
import React, { useEffect, useRef, useState } from "react";
import { HexAlphaColorPicker } from "react-colorful";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import { Joystick } from "react-joystick-component";
import HandyFreeTools from "../Tools/HandyFreeTools";
import Footer from "../../Components/shared/footer/Footer";
const gradients = [
  "linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)",
  "linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)",
  "linear-gradient(to right top, #8360c3, #2ebf91)",
  "linear-gradient(to right top, #009245, #FCEE21)",
  "linear-gradient(to right top, #662D8C, #ED1E79)",
  "linear-gradient(to right top, #D4145A, #FBB03B)",
  "linear-gradient(to right top, #009245, #FCEE21)",
  "linear-gradient(to right top, #662D8C, #ED1E79)",
  "linear-gradient(to right top, #FF5F6D, #FFC371)",
  "linear-gradient(to right top, #11998e, #38ef7d)",
  "linear-gradient(to right top, #108dc7, #ef8e38)",
  "linear-gradient(to right top, #FC5C7D, #6A82FB)",
  "linear-gradient(to right top, #FC466B, #3F5EFB)",
  "linear-gradient(to right top, #00C9FF, #92FE9D)",
  "linear-gradient(to right top, #3F2B96, #A8C0FF)",
  "linear-gradient(to right top, #FDBB2D, #22C1C3)",
  "linear-gradient(to right top, #FDBB2D, #3A1C71)",
  "linear-gradient(to right top, #4158D0, #C850C0, #FFCC70)",
  "linear-gradient(to right top, #0093E9, #80D0C7)",
  "linear-gradient(to right top, #8EC5FC, #E0C3FC)",
  "linear-gradient(to right top, #85FFBD, #FFFB7D)",
];

const IconGenerator = () => {
  const [iconName, setIconName] = useState("MdAdd");
  const [color, setColor] = useState("#000000");
  const [backColor, setBackColor] = useState("#ffffff");
  const [size, setSize] = useState(200);
  const [br, setBr] = useState(0);
  const [shadow, setShadow] = useState(30);
  const [frame, setFrame] = useState("none");
  const [gradientColor, setGradientColor] = useState(gradients[0]);
  const [showWatermark, setShowWatermark] = useState(true);
  const [tilt, setTilt] = useState(true);
  const [transform, setTransform] = useState(
    "perspective(500px) rotateY(0deg) rotateX(0deg)"
  );
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showBackColorPicker, setShowBackColorPicker] = useState(false);

  const divRef = useRef();
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);

  useEffect(() => {
    const parentDiv = divRef.current;
    const width = parentDiv.clientWidth;
    const height = parentDiv.clientHeight;
    setCanvasHeight(height);
    setCanvasWidth(width);
    setSize(width / 2);
  }, []);

  const handleJoystickMove = (event) => {
    const { x, y } = event;
    const maxTilt = 2000;
    const tiltX = (maxTilt * x) / 50;
    const tiltY = (maxTilt * y) / 50;
    setTransform(
      `perspective(500px) rotateY(${tiltX}deg) rotateX(${tiltY}deg)`
    );
  };

  const handleDownload = () => {
    const node = document.getElementById("ss");
    const scale = 2;
    const style = {
      transform: `scale(${scale})`,
      transformOrigin: "top left",
      width: node.offsetWidth + "px",
      height: node.offsetHeight + "px",
    };
    const param = {
      height: node.offsetHeight * scale,
      width: node.offsetWidth * scale,
      quality: 1,
      style,
    };

    domtoimage
      .toPng(node, param)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `pixlab Icon ${new Date().toISOString()}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error("Error capturing screenshot:", error);
      });
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Icon Generator</h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Preview Area */}
            <div className="w-full lg:w-1/2" ref={divRef}>
              <div
                id="ss"
                className="aspect-square flex items-center justify-center"
                style={{ background: gradientColor }}
              >
                <div
                  id="icon-container"
                  className=" "
                  style={{
                    borderRadius: `${br}px`,
                    boxShadow: `0 0px ${shadow}px ${
                      shadow > 0 ? "2px" : "0px"
                    } rgba(0, 0, 0,0.5)`,
                    transform: transform,
                    backgroundColor: backColor,
                  }}
                >
                  {React.createElement(
                    iconName.startsWith("Md")
                      ? MdIcons[iconName]
                      : FaIcons[iconName],
                    {
                      size: size,
                      color: color,
                    }
                  )}
                </div>
              </div>
            </div>

            {/* Controls Area */}
            <div className="w-full lg:w-1/2 space-y-6">
              <button
                onClick={handleDownload}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Download Icon
              </button>
              <IconSearch setIconName={setIconName} />

              <div className="grid grid-cols-2 gap-2">
                <ColorPicker
                  label="Icon Color"
                  color={color}
                  onChange={setColor}
                  show={showColorPicker}
                  setShow={setShowColorPicker}
                />
                <ColorPicker
                  label="Background Color"
                  color={backColor}
                  onChange={setBackColor}
                  show={showBackColorPicker}
                  setShow={setShowBackColorPicker}
                />
              </div>

              <div className="space-y-4">
                <Slider
                  label="Size"
                  value={size}
                  onChange={setSize}
                  min={0}
                  max={canvasWidth}
                />
                <Slider
                  label="Roundness"
                  value={br}
                  onChange={setBr}
                  min={0}
                  max={size / 2}
                />
                <Slider
                  label="Shadow"
                  value={shadow}
                  onChange={setShadow}
                  min={0}
                  max={50}
                />
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={tilt}
                    onChange={() => setTilt(!tilt)}
                    className="form-checkbox"
                  />
                  <span>Tilt</span>
                </label>
                {tilt && (
                  <Joystick
                    size={45}
                    baseColor="lightgray"
                    stickColor="gray"
                    move={handleJoystickMove}
                  />
                )}
              </div>

              <div>
                <label className="block mb-2">Gradient</label>
                <div className="flex flex-wrap gap-4">
                  {gradients.map((gradient, index) => (
                    <button
                      key={index}
                      className={`w-10 h-10 rounded-md ${
                        gradientColor === gradient ? "ring-2 ring-blue-500" : ""
                      }`}
                      style={{ background: gradient }}
                      onClick={() => setGradientColor(gradient)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-white dark:bg-gray-800 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
            About the Icon Generator
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Our Icon Generator is a powerful tool designed to help you create
            custom, high-quality icons for various purposes. Whether you need
            icons for your website, mobile app, or any other digital project,
            this tool provides an easy and flexible way to generate
            professional-looking icons.
          </p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Key Features:
          </h3>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6">
            <li>Choose from a wide variety of icon designs</li>
            <li>Customize icon and background colors</li>
            <li>Adjust icon size, roundness, and shadow</li>
            <li>Apply tilt effects for a 3D look</li>
            <li>Select from various gradient backgrounds</li>
            <li>Add frames to your icons (e.g., macOS style)</li>
            <li>Real-time preview of your customized icon</li>
            <li>Download high-resolution PNG images</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300">
            Whether you&apos;re a designer, developer, or just someone who needs
            custom icons, our Icon Generator offers the flexibility and ease of
            use to create perfect icons for any project. Experiment with
            different styles, colors, and effects to create unique icons that
            match your brand or personal aesthetic.
          </p>
        </div>
      </section>
      <HandyFreeTools toolsTitle={"You might also like"} />
      <Footer />
    </>
  );
};

const IconSearch = ({ setIconName }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const results = Object.keys({ ...MdIcons, ...FaIcons })
      .filter((iconName) =>
        iconName.toLowerCase().includes(event.target.value.toLowerCase())
      )
      .slice(0, 20); // Limit to 20 results for performance
    setSearchResults(results);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search icons"
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
      />
      <div className="grid grid-cols-5 gap-2 mt-2">
        {searchResults.map((iconName) => {
          const IconComponent = iconName.startsWith("Md")
            ? MdIcons[iconName]
            : FaIcons[iconName];
          return (
            <button
              key={iconName}
              onClick={() => setIconName(iconName)}
              className="p-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              <IconComponent size={24} />
            </button>
          );
        })}
      </div>
    </div>
  );
};

const ColorPicker = ({ label, color, onChange, show, setShow }) => {
  return (
    <div className="relative">
      <label className="block mb-2">{label}</label>
      <div
        className="w-full h-10 rounded cursor-pointer"
        style={{ backgroundColor: color }}
        onClick={() => setShow(!show)}
      />
      {show && (
        <div className="absolute z-10 mt-2">
          <HexAlphaColorPicker color={color} onChange={onChange} />
          <button
            className="mt-2 w-full bg-gray-200 dark:bg-gray-700 p-2 rounded"
            onClick={() => setShow(false)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

const Slider = ({ label, value, onChange, min, max }) => {
  return (
    <div>
      <label className="block mb-2">{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full"
      />
      <span className="text-sm">{value}</span>
    </div>
  );
};

export default IconGenerator;

export const oldGradients = [
  "linear-gradient(45deg, #a3ffe7, #7a6bfb, #ff90c9)",
  "linear-gradient(45deg, #FFC107, #FF9800)",
  "linear-gradient(45deg, #283c86, #45a247)",
  "linear-gradient(45deg, #00c6ff, #0072ff)",
  "linear-gradient(45deg, #ed213a, #93291e)",
  "linear-gradient(45deg, #1c92d2, #f2fcfe)",
  "linear-gradient(45deg, #f12711, #f5af19)",
  "linear-gradient(45deg, #fc00ff, #00dbde)",
  "linear-gradient(45deg, #f43b47, #453a94)",
  "linear-gradient(45deg, #662d8c, #ed1e79)",
  "linear-gradient(45deg, #fd746c, #ff9068)",
  "linear-gradient(45deg, #92fe9d, #00c9ff)",
  "linear-gradient(45deg, #00c3ff, #ffff1c)",
  "linear-gradient(45deg, #4e54c8, #8f94fb)",
  "linear-gradient(45deg, #1f4037, #99f2c8)",
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(to right, #feac5e 0%, #c779d0 100%)",
  "linear-gradient(to right, #bc4e9c, #f80759)",
  "linear-gradient(to right, #f953c6, #b91d73)",
  "linear-gradient(to right, #000428, #004e92)",
  "linear-gradient(to right, #FF416C, #FF4B2B)",
  "linear-gradient(to right, #fc00ff, #00dbde)",
  "linear-gradient(to right, #f12711, #f5af19)",
  "linear-gradient(to right, #f6d365, #fda085)",
  "linear-gradient(to right, #6190E8, #A7BFE8)",
  "linear-gradient(to right, #4b6cb7, #182848)",
  "linear-gradient(to right, #e65c00, #F9D423)",
  "linear-gradient(to right, #43C6AC, #F8FFAE)",
  "linear-gradient(to right, #2c3e50, #bdc3c7)",
  "linear-gradient(to right, #D1913C, #FFD194)",
  "linear-gradient(to right, #1e3c72, #2a5298)",
  "linear-gradient(to right, #3a7bd5, #00d2ff)",
  "linear-gradient(to right, #085078, #85D8CE)",
  "linear-gradient(to right, #d3cce3, #e9e4f0)",
  "linear-gradient(to right, #eb3349, #f45c43)",
  "linear-gradient(to right, #a8ff78, #78ffd6)",
  "linear-gradient(to right, #fc00ff, #00dbde)",
  "linear-gradient(to right, #ffb347, #ffcc33)",
  "linear-gradient(to right, #e1eec3, #f05053)",
  "linear-gradient(to right, #4568dc, #b06ab3)",
  "linear-gradient(to right, #f12711, #f5af19)",
  "linear-gradient(to right, #4b6cb7, #182848)",
  "linear-gradient(to right, #ffe259, #ffa751)",
  "linear-gradient(to right, #25c481, #25b7c4)",
  "linear-gradient(to right, #ff9966, #ff5e62)",
  "linear-gradient(to right, #d4fc79, #96e6a1)",
  "linear-gradient(to right, #c33764, #1d2671)",
  "linear-gradient(to right, #7f00ff, #e100ff)",
  "linear-gradient(to right, #52c234, #061700)",
  "linear-gradient(to right, #e52d27, #b31217)",
  "linear-gradient(to right, #c94b4b, #4b134f)",
  "linear-gradient(to right, #085078, #85D8CE)",
  "linear-gradient(to right, #de6262, #ffb88c)",
  "linear-gradient(to right, #c6ffdd, #fbd786, #f7797d)",
  "linear-gradient(to right, #6a3093, #a044ff, #6a3093)",
  "linear-gradient(to top, #fddb92, #d1fdff)",
  "linear-gradient(to bottom, #4b6cb7, #182848)",
  "linear-gradient(to right, #fc4a1a, #f7b733)",
  "linear-gradient(to top, #dd5e89, #f7bb97)",
  "linear-gradient(to right, #2c3e50, #4ca1af)",
  "linear-gradient(to top, #3d4e81, #5753c9)",
  "linear-gradient(to bottom, #0f2027, #203a43, #2c5364)",
  "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
  "linear-gradient(to bottom, #cc2b5e, #753a88)",
  "linear-gradient(to right, #1a2a6c, #b21f1f, #fdbb2d)",
  "linear-gradient(to top, #1e3c72, #2a5298)",
  "linear-gradient(to right, #7028e4, #e5b2ca)",
  "linear-gradient(to right, #12c2e9, #c471ed, #f64f59)",
  "linear-gradient(to bottom, #c31432, #240b36)",
  "linear-gradient(to top, #feac5e, #c779d0, #4bc0c8)",
  "linear-gradient(to right, #ec008c, #fc6767)",
  "linear-gradient(to bottom, #5f2c82, #49a09d)",
  "linear-gradient(to right, #642b73, #c6426e)",
  "linear-gradient(to top, #2b5876, #4e4376)",
  "linear-gradient(to top, #ee0979, #ff6a00)",
  "linear-gradient(to bottom, #fc5c7d, #6a82fb)",
  "linear-gradient(to right, #fc4a1a, #f7b733, #6bc1b6)",
  "linear-gradient(to right, #ed4264, #ffedbc)",
  "linear-gradient(to top, #23074d, #cc5333)",
  "linear-gradient(to bottom, #dc2424, #4a569d)",
  "linear-gradient(to top, #0575e6, #021b79)",
  "linear-gradient(to bottom, #f12711, #f5af19)",
  "linear-gradient(to right, #000000, #3f6b6b)",
  // "linear-gradient(to top, #fe8c00, #f83600)",
  "linear-gradient(to bottom, #3f51b1, #5a55ae, #7b5fac, #8f6aae, #a86aa4, #cc6b8e, #eb6b66, #f38c41, #f7a9b7)",
  "linear-gradient(to right, #abbaab, #ffffff)",
  "linear-gradient(to bottom, #a8ff78, #78ffd6)",
  "linear-gradient(45deg, #1b2735, #9c8f79, #b2b2b2)",
  "linear-gradient(45deg, #a52a2a, #8b0000, #ff0000)",
  "linear-gradient(180deg, #f5f5dc, #f5f5dc, #f5f5dc, #f5f5dc, #f5f5dc, #f5f5dc, #f5f5dc, #f5f5dc)",
  "linear-gradient(to top, #ff9966, #ff5e62, #ff5e62, #ff8c66)",
  "linear-gradient(to top, #b3ff66, #66ff99, #66ffff, #66ccff, #6666ff)",
  "linear-gradient(to top left, #000000, #0f9b0f)",
  "linear-gradient(to bottom right, #ff0000, #ffffff)",
  "linear-gradient(-45deg, #ee9ca7 0%, #ffdde1 100%)",
  "linear-gradient(to top right, #ffcc99, #ffcc66, #ffff66, #ccff66, #99ff66)",
  "linear-gradient(135deg, #f5f5dc, #f5f5dc, #f5f5dc, #f5f5dc, #f5f5dc, #f5f5dc, #f5f5dc, #f5f5dc)",
  "linear-gradient(to bottom, #ff7e5f, #feb47b)",
  "linear-gradient(to top, #8e2de2, #4a00e0)",
  "linear-gradient(120deg, #f6d365, #fda085)",
  "linear-gradient(to top, #a8ff78, #78ffd6)",
  "linear-gradient(to top, #00c6ff, #0072ff)",
  "linear-gradient(to top, #f9d423, #ff4e50)",
  "linear-gradient(120deg, #a80077, #66ff99, #ffcc99, #ffcc66, #ffff66)",
  "linear-gradient(to top, #ff4165, #ffeb3b)",
  "linear-gradient(to top, #3f51b1, #5a55ae, #7b5fac)",
  "linear-gradient(to top, #ff0844, #ffb199)",
  "linear-gradient(to top, #00b4db, #0083b0)",
  "linear-gradient(to top, #c21500, #ffc500)",
  "linear-gradient(to top, #fddb92, #d1fdff)",
  "linear-gradient(to top, #a8edea, #fed6e3)",
  "linear-gradient(to top, #f85032, #e73827)",
  "linear-gradient(to top, #ffd89b, #19547b)",
  "linear-gradient(to top, #7f00ff, #e100ff)",
  "linear-gradient(to top, #f0f2f0, #000c40)",
  "linear-gradient(to top, #f5f7fa, #c3cfe2)",
  "linear-gradient(to top, #fdfd96, #f5f5dc)",
  "linear-gradient(-135deg, #FF6B6B 0%, #1E90FF 100%)",
  "linear-gradient(to right, #ff0000, #ff4000, #ff8000, #ffbf00, #ffff00, #bfff00, #80ff00)",
  "linear-gradient(to right, #000000, #333333, #666666, #999999, #cccccc, #ffffff, #000000)",
  "linear-gradient(to right, #f44336, #e91e63, #9c27b0, #673ab7, #3f51b5, #2196f3, #03a9f4)",
  "linear-gradient(to right, #ff0000, #ff0040, #ff0080, #ff00bf, #ff00ff, #bf00ff, #8000ff)",
  "linear-gradient(to right, #ff0000, #ff3333, #ff6666, #ff9999, #ffcccc, #ffffff, #cccccc)",
  "linear-gradient(to bottom, #F0F3BD, #C4E0E5, #87D37C)",
  "linear-gradient(to left, #F8C1CC, #F4A2A2, #F5D0CC)",
  "linear-gradient(to top, #F8E9A1, #F8D1A9, #F8B4B1)",
  "linear-gradient(to right, #F9E79F, #F5CBA7, #F2848E)",
  "linear-gradient(to bottom right, #F5F5DC, #F5F5DC, #F5F5DC)",
  "linear-gradient(to top left, #F8F8FF, #F8F8FF, #F8F8FF)",
  "linear-gradient(to right, #000000, #333333)",
  "linear-gradient(to top, #1c1c1c, #383838, #555555)",
  "linear-gradient(to bottom, #2c3e50, #34495e)",
  "linear-gradient(to left, #0c0c0c, #282828, #454545)",
  "linear-gradient(to right, #333, #555, #777)",
  "linear-gradient(to top left, #1a1a1a, #333333, #4d4d4d)",
  "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
  "linear-gradient(225deg, #FFFEFF 0%, #D7FFFE 100%)",
];
