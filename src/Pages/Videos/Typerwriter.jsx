import LoginModal from "@/Components/Modals/LoginModal";
import PremiumModal from "@/Components/Modals/PremiumModal";
import {
  CustomColor,
  solidColors
} from "@/Components/files/GradientsAndImages";
import { useAppContext } from "@/context";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { get, set } from "idb-keyval";
import { useEffect, useRef, useState } from "react";
import { HexAlphaColorPicker } from "react-colorful";
import { BiFontSize } from "react-icons/bi";
import { MdAdd, MdFileDownload, MdRemove } from "react-icons/md";
import { Link } from "react-router-dom";

export default function VideoLayout({ dm }) {
  const bgimgref = useRef();
  const [content, setcontent] = useState([
    {
      photo: "",
      id: Date.now(),
      isDeleted: false,
      shadow: "0",
      scolor: "#3c3a3a",
      pdng: 3,
      scale: "1",
      br: 1,
      frame: "none",
      size: 50,
      transform: " perspective(500px) rotateY(0deg) rotateX(0deg)",
      component: "image",
      position: { left: 50, top: 50 },
      color: "#000000",
      background: "#ffffff",
      title: "Title",
      subtitle: "subtitle",
      description: "pixlab is the best tool for creating image mockups",
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
      lineNo: false
    }
  ]);
  const [canvasStyles, setCanvasStyles] = useState({
    canvasFilters: {
      brightness: 1,
      contrast: 1,
      grayscale: 0,
      blur: 0,
      hueRotate: 0,
      invert: 0,
      saturate: 1,
      sepia: 0,
      opacity: 1
    },
    aspectRatio: "16/9",
    backgroundColor: "#ffffff",
    bgtheme: "gradient",
    gradangle: 135,
    gradientIndex: 76,
    currentImg: 3,
    show: false
  });

  const [undoHistory, setUndoHistory] = useState([]);
  const [redoHistory, setRedoHistory] = useState([]);
  const [showWatermark, setshowWatermark] = useState(true);
  const [showLoginModal, setshowLoginModal] = useState(false);
  const [showPremiumModal, setshowPremiumModal] = useState(false);
  const [time, settime] = useState(5000);
  const [gradientColor, setgradientColor] = useState(
    `linear-gradient(${canvasStyles.gradangle}deg, #FF002F, #FF0055, #FF007C)`
  );

  const [showExtra, setshowExtra] = useState(true);

  const [tab, settab] = useState(3);
  const [showColorPalette, setshowColorPalette] = useState(false);
  const [showBackgroundPalette, setshowBackgroundPalette] = useState(false);
  const [customGrad, setcustomGrad] = useState([]);
  const context = useAppContext();

  const { username, planType } = context.sharedState;

  const [canvasWidth, setCanvasWidth] = useState(0);

  const [mainState, setMainState] = useState({
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
        opacity: 1
      },
      aspectRatio: "16/9",
      backgroundColor: "#ffffff",
      bgtheme: "gradient",
      gradangle: 135,
      gradientIndex: 27,
      currentImg: 3
    }
  });

  useEffect(() => {
    if (planType !== "free") {
      setshowWatermark(false);
    } else {
      setshowWatermark(true);
    }
  }, [planType]);

  const handleColorChange = (index, newColor) => {
    // Create a new array with the updated color
    const newColors = [...customGrad];
    newColors[index] = newColor;
    setcustomGrad(newColors);
    // console.log(newColors)
    setgradientColor(
      `linear-gradient(${canvasStyles.gradangle}deg, ${newColors.join(", ")})`
    );
  };

  const gradients = [
    `linear-gradient(${canvasStyles.gradangle}deg, #f3a683, #ffcc70)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #74b9ff, #a29bfe)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #48dbfb, #6c5ce7)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #55efc4, #81ecec)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #fd79a8, #fdcb6e)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #a29bfe, #6c5ce7)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #00cec9, #74b9ff)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #ff7675, #d63031)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #74b9ff, #55efc4)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #f9ca24, #f0932b)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #ff9ff3, #feca57)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #00b894, #00cec9)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #ff9ff3, #feca57, #00cec9, #eb4d4b)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #55efc4, #81ecec, #74b9ff, #a29bfe)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #00b894, #00cec9, #74b9ff, #a29bfe)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #fd79a8, #fdcb6e, #74b9ff, #a29bfe)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #f3a683, #ffcc70, #74b9ff, #a29bfe)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #f9ca24, #f0932b, #74b9ff, #a29bfe)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #48dbfb, #6c5ce7, #74b9ff, #a29bfe)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #00cec9, #74b9ff, #a29bfe, #e84393)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #FF9F00, #FFC200, #FFEB00)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #FF0062, #FF00A9, #FF00FF)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #00B0FF, #00E5FF, #00FFFF)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #FF0090, #FF00B6, #FF00DE)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #B900FF, #E200FF, #FF00FF)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #00FF6C, #00FFA4, #00FFDE)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #00D8FF, #00FFFF, #00FFD8)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #FF002F, #FF0055, #FF007C)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #00FF00, #00FF3D, #00FF7A, #00FFB6)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #FF8800, #FF9800, #FFA900, #FFB900)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #00FFC2, #00FFDC, #00FFF7)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #FF0047, #FF0066, #FF0084, #FF00A2)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #ff00cc, #3366ff)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #ff6699, #ff66cc)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #ff99cc, #ff99ff)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #ff66cc, #cc99ff)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #ff3399, #cc66ff)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #a3ffe7, #7a6bfb, #ff90c9)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #ffc107, #ff9800)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #283c86, #45a247)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #00c6ff, #0072ff)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #ed213a, #93291e)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #1c92d2, #f2fcfe)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #fc00ff, #00dbde)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #f43b47, #453a94)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #f48fb1, #ffcdc6, #ffebee, #fce4ec)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #662d8c, #ed1e79)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #fd746c, #ff9068)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #92fe9d, #00c9ff)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #00c3ff, #ffff1c)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #4e54c8, #8f94fb)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #1f4037, #99f2c8)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #667eea , #764ba2)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #feac5e , #c779d0)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #bc4e9c, #f80759)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #f953c6, #b91d73)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #000428, #004e92)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #ff416c, #ff4b2b)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #fc00ff, #00dbde)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #f6d365, #fda085)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #6190e8, #a7bfe8)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #e65c00, #f9d423)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #43c6ac, #f8ffae)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #2c3e50, #bdbfc7)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #d1913c, #ffd194)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #1e3c72, #2a5298)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #3a7bd5, #00d2ff)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #d3cce3, #e9e4f0)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #eb3339, #f45c43)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #a8ff78, #78ffd6)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #ffb347, #ffcc33)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #e1eec3, #f05053)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #4568dc, #b06ab3)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #f12711, #f5af19)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #4b6cb7, #182848)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #FFE2FB, #F8E5BC, #ADFFFE, #FFE4E4, #CFFBBC, #FABED3)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #55efc4, #81ecec, #74b9ff, #a29bfe, #ff9ff3, #fdcb6e)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #00b894, #00cec9, #74b9ff, #a29bfe, #ff7675, #d63031)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #fd79a8, #fdcb6e, #74b9ff, #a29bfe, #f9ca24, #f0932b)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #48dbfb, #6c5ce7, #74b9ff, #a29bfe, #00b894, #00cec9)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #74b9ff, #a29bfe, #d63031, #ff7675, #6ab04c, #fd79a8)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #FF3D00, #FF6D00, #FFA000, #FFD500, #FFFF00)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #0088FF, #00B8FF, #00E7FF, #00FFFF, #00FFCB, #00FF96)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #FF0000, #FF3F00, #FF7D00, #FFBB00, #FFF800, #B7FF00, #6CFF00)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #FF00B7, #FF00E0, #FF00FF, #C300FF, #8700FF, #5600FF, #2400FF)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #00FFB5, #00FFDA, #00FFFE, #00D2FF, #0095FF, #0049FF, #0000FF)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #FF0078, #FF009D, #FF00C3, #FF00E9, #C700FF, #9100FF, #6400FF, #3000FF)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #00FF46, #00FF78, #00FFAA, #00FFDC, #00D2FF, #0096FF, #004AFF, #0000FF)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #FF002C, #FF0057, #FF0082, #FF00AD, #FF00D8, #C100FF, #8900FF, #5900FF, #2400FF)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #ffe259, #ffa751)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #25c481, #25b7c4)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #ff9966, #ff5e62)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #d4fc79, #96e6a1)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #c33764, #1d2671)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #7f00ff, #e100ff)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #52c334, #061700)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #e52d27, #b31217)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #c94b4b, #4b134f)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #085078, #4ca1af)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #de6262, #ffb88c)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #c6ffdd, #fbd786, #f7797d)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #6a30af, #a044ff, #6a30af)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #fddb92, #d1fdff)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #4b6cb7, #182848)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #fc4a1a, #f7b733)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #dd5e89, #f7bb97)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #2c3e50, #4ca1af)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #3d4e81, #5753c9)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #0f2027, #203a43, #2c5364)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #0f0c29, #302b3e, #24243e)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #cc2b5e, #753a88)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #2a2a6e, #b21f1f, #fdbb2d)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #1e3c72, #2a5298)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #7028e4, #e5b2ca)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #12c2e9, #c471ed, #f64f59)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #c31432, #240b16)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #feac5e, #c779d0, #4bc8c8)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #642b73, #c6426e)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #2b5876, #4e4376)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #ee0979, #ff6a00)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #fc5c7d, #6a82fb)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #fc4a1a, #f7b733, #6bc1b6)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #ed4264, #ffedbc)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #23074d, #cc5333)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #dc2424, #4a569d)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #0575e6, #021b79)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #f12711, #f5af19)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #000000, #3f6b6b)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #3f51b1, #5a55ae, #7b5fac, #8f6aae, #a86aa4, #cc6b8e, #eb6b66, #f38d41, #f7a9b3)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #abbaba, #ffffff)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #a8ff78, #78ffd6)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #1b2735, #9c8f79, #b2b2b2)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #a52a2a, #8b0000, #ff0000)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #f5f5dc, #f5f5dc, #f5f5dc, #f5f5dc, #f5f5dc, #f5f5dc, #f5f5dc, #f5f5dc)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #ff7e5f, #feb47b)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #8eff66, #66ff99, #66ffff, #66ccff, #6666ff)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #000000, #0f9b0f)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #ff0000, #ffffff)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #8e9cd6, #ffddd1)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #ffcc99, #ffcc66, #ffff66, #ccff66, #99ff66)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #f5f5dc, #f5f5dc, #f5f5dc, #f5f5dc, #f5f5dc, #f5f5dc, #f5f5dc, #f5f5dc)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #ff7e5f, #feb47b)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #8e2de2, #4a00e0)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #f6d365, #fdb483)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #74b9ff, #a29bfe, #d63031, #ff7675)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #a8ff78, #78ffd6)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #00c6ff, #0072ff)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #3f51b1, #5a55ae, #7b5fac)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #ff0844, #ffb199)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #00b4db, #0083b0)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #c21500, #ffc500)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #fddb92, #d1fdff)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #a8edea, #fed6e3)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #f85032, #e73827)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #ffd89b, #19547b)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #7f00ff, #e100ff)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #f0f2f0, #000c40)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #f5f7fa, #c3cfe2)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #fdfd96, #f5f5dc)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #ff6b6b, #1e90ff)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #ff0000, #ff4000, #ff8000, #ffbf00, #ffff00, #bfff00, #80ff00)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #000000, #333333, #666666, #999999, #cccccc, #ffffff, #000000)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #f44336, #e91e63, #9c27b0, #673ab7, #3f51b5, #2196f3, #03a9f4)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #ff0000, #ff3333, #ff6666, #ff9999, #ffcccc, #ffffff, #cccccc)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #ff0000, #ff0040, #ff0080, #ff00bf, #ff00ff, #bf00ff, #8000ff)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #ff0000, #ff3333, #ff6666, #ff9999, #ffcccc, #ffffff, #cccccc)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #f0f3bd, #c4e0e5, #87d37c)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #f8c1cc, #f4a2a2, #f5d0cc)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #f8e9a1, #f8d1a9, #f8b4b1)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #f9e79f, #f5cba7, #f2848e)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #f5f5dc, #f5f5dc, #f5f5dc)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #f8f8ff, #f8f8ff, #f8f8ff)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #000000, #333333)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #1c1c1c, #383838, #555555)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #000000, #000000)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #2c3e50, #34495e)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #0c0c0c, #282828, #454545)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #333333, #555555, #777777)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #1a1a1a, #333333, #4d4d4d)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #f5f7fa, #c3cfe2)`,
    `linear-gradient(${canvasStyles.gradangle}deg, #ffffff, #ffffff)`
  ];

  const canvasRef = useRef(null);
  const downloadLinkRef = useRef(null);
  const [isPlaying, setisPlaying] = useState(false);
  const [elements, setElements] = useState([
    {
      type: "text",
      content: "Life is exciting with the right people on your side!",
      fontSize: 48,
      color: "#ffffff",
      position: { x: 100, y: 100 },
      startTime: 0,
      endTime: 5,
      currentLength: 0, // Add this line
      cursorVisible: true // Add this line
    }
  ]);

  const [elementStates, setElementStates] = useState(elements.map(() => ({})));

  useEffect(() => {
    const loadImages = async () => {
      const updatedElements = await Promise.all(
        elements.map(async (element) => {
          if (element.type === "image") {
            const img = new Image();
            img.src = element.url;
            await new Promise((resolve) => {
              img.onload = resolve;
            });
            return { ...element, image: img };
          }
          return element;
        })
      );
      setElements(updatedElements);
    };

    loadImages();
  }, []);

  const ffmpegRef = useRef(null);

  useEffect(() => {
    ffmpegRef.current = new FFmpeg();
    load();
  }, []);

  const load = async () => {
    console.log("started");
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on("log", ({ message }) => {});

    const coreUrl = await getCachedUrl(
      `${baseURL}/ffmpeg-core.js`,
      "text/javascript",
      "ffmpeg-core"
    );
    const wasmUrl = await getCachedUrl(
      `${baseURL}/ffmpeg-core.wasm`,
      "application/wasm",
      "ffmpeg-wasm"
    );

    await ffmpeg.load({
      coreURL: coreUrl,
      wasmURL: wasmUrl
    });
  };

  async function getCachedUrl(url, type, key) {
    let buffer = await get(key);
    if (!buffer) {
      const response = await fetch(url);
      buffer = await response.arrayBuffer();
      set(key, buffer);
    } else {
    }
    const blob = new Blob([buffer], { type });
    const cachedUrl = URL.createObjectURL(blob);

    return cachedUrl;
  }

  function record(shouldrecord) {
    let mediaRecorder;
    let recordedChunks = [];
    let isRecording = false;
    let startTime = 0;
    let recordingStartTime = 0; // Add this line
    console.log(shouldrecord);

    // Start recording
    function startRecording(stream) {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = handleDataAvailable;
      startTime = Date.now(); // Record the start time
      mediaRecorder.start();
      isRecording = true;
      console.log("started recording");
      recordingStartTime = performance.now(); // Add this line
    }

    // Stop recording
    function stopRecording() {
      mediaRecorder.stop();
      isRecording = false;
    }

    // Handle the data after stopping the recorder
    function handleDataAvailable(event) {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
        prepareDownloadLink();
      }
    }

    function prepareDownloadLink() {
      var blob = new Blob(recordedChunks, {
        type: "video/webm"
      });
      var url = URL.createObjectURL(blob);
      var a = downloadLinkRef.current;
      a.href = url;
      a.download = "animation.webm";
      a.click();
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let aspectRatio;
    if (canvasStyles.aspectRatio !== "16/9") {
      const [numerator, denominator] = canvasStyles.aspectRatio.split("/");
      aspectRatio = Number(denominator) / Number(numerator);
      canvas.height = canvas.width * aspectRatio;
    } else {
      canvas.height = canvas.width / 1.76;
    }

    let animationFrameId;

    const renderFrame = (timestamp) => {
      const elapsedTime = timestamp - recordingStartTime; // Modify this line
      context.clearRect(0, 0, canvas.width, canvas.height);

      if (canvasStyles.bgtheme == "gradient") {
        function parseGradientString(gradientString) {
          const colorPattern = /#([0-9a-f]{3}|[0-9a-f]{6})\b/gi;
          const anglePattern = /(\d+)deg/;

          const colors = gradientString.match(colorPattern);
          const angleMatch = gradientString.match(anglePattern);
          const angle = angleMatch ? parseInt(angleMatch[1]) : 0;

          return { colors, angle };
        }

        const { colors, angle } = parseGradientString(gradientColor);

        const radianAngle = (angle * Math.PI) / 180;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius =
          Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2)) / 2;

        const gradient = context.createLinearGradient(
          centerX - radius * Math.cos(radianAngle),
          centerY - radius * Math.sin(radianAngle),
          centerX + radius * Math.cos(radianAngle),
          centerY + radius * Math.sin(radianAngle)
        );

        colors.forEach((color, index) => {
          gradient.addColorStop(index / (colors.length - 1), color);
        });

        context.fillStyle = gradient;
      } else {
        context.fillStyle = gradientColor;
      }
      // context.fillStyle = 'yellow';
      context.fillRect(0, 0, canvas.width, canvas.height);

      elements.forEach((element, index) => {
        // if (elapsedTime >= element.startTime * 1000 && elapsedTime <= element.endTime * 1000) changin endtime of element to just time state for typewriter effect
        if (
          elapsedTime >= element.startTime * 1000 &&
          elapsedTime <= (time / 1000) * 1000
        ) {
          if (element.type === "text") {
            const duration = ((time / 1000 - element.startTime) * 1000) / 2;
            const progress = Math.min(
              (elapsedTime - element.startTime * 1000) / duration,
              1
            );
            const currentLength = Math.floor(progress * element.content.length);

            const cursorVisible = Math.floor(elapsedTime / 500) % 2 === 0;

            context.font = `${element.fontSize}px Arial`;

            const PADDING = 32;

            const wrapText = (text, maxWidth) => {
              maxWidth -= 2 * PADDING; // Subtracting 2 * PADDING to account for padding on both sides

              let lines = text.split("\n");
              let wrappedLines = [];

              lines.forEach((line) => {
                let words = line.split(" ");
                let currentLine = words[0];

                for (let i = 1; i < words.length; i++) {
                  let word = words[i];
                  let width = context.measureText(
                    currentLine + " " + word
                  ).width;
                  if (width < maxWidth) {
                    currentLine += " " + word;
                  } else {
                    wrappedLines.push(currentLine);
                    currentLine = word;
                  }
                }
                wrappedLines.push(currentLine);
              });

              return wrappedLines;
            };

            // Wrap the text
            let lines = wrapText(
              element.content.substring(0, currentLength),
              canvas.width
            );

            // Draw the text with typewriter and cursor effects
            context.fillStyle = element.color;
            for (let i = 0; i < lines.length; i++) {
              const textWidth = context.measureText(lines[i]).width;
              const x = PADDING + (canvas.width - 2 * PADDING - textWidth) / 2; // Adding PADDING to the x position
              const y =
                (canvas.height - element.fontSize * (lines.length - 1)) / 2 +
                element.fontSize * i;

              // Determine if the cursor should be visible on this line
              const isCurrentLine =
                currentLength >= lines.slice(0, i).join(" ").length &&
                currentLength <= lines.slice(0, i + 1).join(" ").length;
              const lineWithCursor =
                isCurrentLine &&
                cursorVisible &&
                currentLength < element.content.length
                  ? lines[i] + "|"
                  : lines[i];

              context.fillText(lineWithCursor, x, y);
            }

            // Update the state
            setElementStates((states) => {
              const newStates = [...states];
              newStates[index] = { currentLength, cursorVisible };
              return newStates;
            });
          } else if (element.type === "image" && element.image) {
            let opacity =
              (elapsedTime - element.startTime * 1000) /
              ((element.endTime - element.startTime) * 1000);
            opacity = Math.min(Math.max(opacity, 0), 1); // Clamp between 0 and 1

            // Apply the opacity
            context.globalAlpha = opacity;

            // Draw the image
            context.drawImage(
              element.image,
              element.position.x,
              element.position.y,
              element.size.width,
              element.size.height
            );

            // Reset the opacity
            context.globalAlpha = 1.0;
          }

          if (showWatermark) {
            // Set the watermark text
            const watermarkText = "Made with pixlab";

            // Set the font for the watermark text
            context.font = "12px Arial";

            // Measure the width of the watermark text
            const textWidth = context.measureText(watermarkText).width;

            // Set the position for the watermark
            const x = canvas.width - textWidth - 10; // 10px padding from the right edge
            const y = canvas.height - 20; // 20px padding from the bottom edge

            // // Draw the semi-transparent background for the watermark
            // context.fillStyle = 'rgba(0, 0, 0, 0.3)';
            // context.fillRect(x, y - 20, textWidth, 30); // The height of the rectangle is assumed to be 30px

            // Set the shadow color
            context.shadowColor = "rgba(0, 0, 0, 0.5)"; // Change the color and opacity as needed

            // Set the shadow blur radius
            context.shadowBlur = 1; // Change the blur radius as needed

            // Set the shadow offset
            context.shadowOffsetX = 1; // Change the horizontal offset as needed
            context.shadowOffsetY = 1; // Change the vertical offset as needed

            // Draw the watermark text
            context.fillStyle = "white";
            context.fillText(watermarkText, x, y);
          }
        }
      });

      if (isRecording && elapsedTime >= time) {
        setisPlaying(false);
        if (shouldrecord) {
          stopRecording();
        }
      } else {
        animationFrameId = requestAnimationFrame(renderFrame);
      }
    };

    setisPlaying(true);
    if (!isRecording && shouldrecord) {
      const stream = canvas.captureStream();
      startRecording(stream);
      startTime = performance.now(); // Record the start time
      renderFrame(startTime);
    } else {
      startTime = Date.now(); // Record the start time
      isRecording = true;
      console.log("started recording");
      recordingStartTime = performance.now(); // Add this line
      startTime = performance.now(); // Record the start time
      renderFrame(startTime);
    }
  }

  return (
    <>
      {showLoginModal ? (
        <LoginModal
          dm={dm}
          showLoginModal={showLoginModal}
          setshowLoginModal={setshowLoginModal}
        ></LoginModal>
      ) : (
        ""
      )}

      {showPremiumModal ? (
        <PremiumModal
          dm={dm}
          showPremiumModal={showPremiumModal}
          setshowPremiumModal={setshowPremiumModal}
        />
      ) : (
        ""
      )}

      <div className="h-screen bg-white text-black">
        <nav
          style={{ zIndex: 999, borderBottom: "1px solid rgb(220,220,220)" }}
          className="bg-white sticky top-0  w-full  h-[56px]"
        >
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
            <Link to={"/"} className="md:flex items-center">
              <img
                src="/logo_white.png"
                className="h-10 mr-3 rounded-lg shadow -rotate-6"
                style={{}}
                alt="Prodpapa Logo"
              />
            </Link>
            <div style={{ display: "flex" }}>
              <button
                className="text-sm"
                onClick={() => record(true)}
                style={{
                  color: "white",
                  padding: "4px 8px",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "6px",
                  fontWeight: "500",
                  border: "none",
                  background: "black"
                }}
              >
                {" "}
                <span className="">Save</span>{" "}
                <MdFileDownload className="ml-1" style={{ marginTop: "1px" }} />{" "}
              </button>

              <select
                value={time}
                onChange={(e) => {
                  settime(Number(e.target.value));
                }}
                name="category"
                id=""
                className="text-sm"
                style={{
                  outline: "none",
                  backgroundColor: dm ? "#19191a" : "white",
                  margin: "0 0.5rem",
                  padding: "4px 0.5rem",
                  border: "1px solid #363636",
                  borderRadius: "1rem",
                  color: dm ? "white" : "black",
                  maxWidth: "80px"
                }}
              >
                <option value="1000">1 second</option>
                <option value="2000">2 seconds</option>
                <option value="3000">3 seconds</option>
                <option value="4000">4 seconds</option>
                <option value="5000">5 seconds</option>
                <option value="6000">6 seconds</option>
                <option value="7000">7 seconds</option>
                <option value="8000">8 seconds</option>
                <option value="9000">9 seconds</option>
                <option value="10000">10 seconds</option>
              </select>
              <select
                value={canvasStyles.aspectRatio}
                onChange={(e) => {
                  setCanvasStyles((prevStyles) => ({
                    ...prevStyles,
                    aspectRatio: e.target.value
                  }));
                }}
                name="category"
                id=""
                className="text-sm"
                style={{
                  outline: "none",
                  backgroundColor: dm ? "#19191a" : "white",
                  margin: "0 0.5rem",
                  padding: "4px 0.5rem",
                  border: "1px solid #363636",
                  borderRadius: "1rem",
                  color: dm ? "white" : "black",
                  maxWidth: "80px"
                }}
              >
                {/* <option value="auto">Auto</option> */}
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
            <div></div>

            <div className="flex items-center md:order-2">
              <Link
                to="/"
                className="border text-xs text-gray-600 py-1  px-2 rounded-lg hidden sm:flex"
              >
                View all templates
              </Link>
            </div>
          </div>
        </nav>
        <div
          id="maindiv"
          className="flex flex-col sm:flex-row  overflow-auto "
          style={{ height: "calc(100vh - 56px)", background: "whitesmoke" }}
        >
          <div
            className="flex justify-center items-center py-4"
            style={{
              background: "whitesmoke",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              width: "100%"
            }}
          >
            <canvas
              width="600"
              className="shadow-lg"
              style={{
                maxWidth: "90%",
                aspectRatio: canvasStyles.aspectRatio,
                scale:
                  canvasStyles.aspectRatio !== "auto" &&
                  parseFloat(eval(canvasStyles.aspectRatio)) < 1 &&
                  window.innerWidth > 800
                    ? "0.5"
                    : "1"
              }}
              ref={canvasRef}
            />

            <a ref={downloadLinkRef} style={{ display: "none" }}>
              Download link
            </a>
          </div>

          <div
            id="rightAside"
            className="w-full sm:w-[440px] bg-white p-2 relative top-0 right-0  z-20 pb-12"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {tab === 3 ? (
              <div className="border p-4 my-2 rounded-xl text-sm">
                <div className="flex justify-center mb-4">
                  <button
                    className="text-sm"
                    onClick={() => {
                      if (!isPlaying) {
                        record(false);
                      }
                    }}
                    style={{
                      color: "white",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      fontWeight: "500",
                      border: "none",
                      background: "black",
                      width: "100%"
                    }}
                  >
                    {isPlaying ? "Playing" : "Play"}
                  </button>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="small-input"
                    className="block mb-1 text-xs font-medium text-gray-900 dark:text-white"
                  >
                    Enter text here
                  </label>

                  <textarea
                    id="message"
                    value={elements[0].content}
                    onChange={(event) => {
                      setElements((prevElements) =>
                        prevElements.map((element, index) => {
                          if (index === 0) {
                            // Assuming you want to update the first element
                            return { ...element, content: event.target.value };
                          }
                          return element;
                        })
                      );
                    }}
                    placeholder="Your text here"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>

                <div className="flex items-center justify-around mb-4">
                  <div
                    className=""
                    style={{
                      cursor: "pointer",
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      padding: "2px 12px",
                      border: dm
                        ? "1px solid rgb(80,80,80)"
                        : "1px solid rgb(200,200,200)",
                      borderRadius: "18px",
                      background: dm ? "rgb(10,10,10)" : "white",
                      justifyContent: "center"
                    }}
                  >
                    <span
                      onClick={() => {
                        setshowBackgroundPalette(false);
                        setshowColorPalette(!showColorPalette);
                      }}
                    >
                      Color
                    </span>

                    <span
                      style={{
                        height: "16px",
                        width: "16px",
                        borderRadius: "50%",
                        backgroundColor: elements[0].color,
                        border: "1px solid gray",
                        marginLeft: "4px"
                      }}
                      onClick={() => {
                        setshowBackgroundPalette(false);
                        setshowColorPalette(!showColorPalette);
                      }}
                    ></span>

                    {showColorPalette ? (
                      <div
                        onMouseLeave={() => {
                          setshowColorPalette(false);
                        }}
                        style={{
                          position: "absolute",
                          zIndex: 800,
                          left: "32px",
                          top: "32px",
                          display: "flex",
                          flexDirection: "column"
                        }}
                      >
                        <HexAlphaColorPicker
                          color={elements[0].color}
                          onChange={(e) => {
                            setElements((prevElements) =>
                              prevElements.map((element, index) => {
                                if (index === 0) {
                                  // Assuming you want to update the first element
                                  return { ...element, color: e };
                                }
                                return element;
                              })
                            );
                          }}
                        />

                        <div
                          style={{
                            background: dm ? "black" : "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between"
                          }}
                        >
                          <span
                            onClick={() => {}}
                            style={{
                              background: "whitesmoke",
                              color: "black",
                              fontSize: "14px",
                              margin: "4px",
                              padding: "0px 8px",
                              border: "none",
                              borderRadius: "4px"
                            }}
                          >
                            {content[0].color}
                            {/* <FaHandPointer style={{ marginLeft: "4px" }} /> */}
                          </span>
                          <button
                            style={{
                              background: "whitesmoke",
                              color: "black",
                              fontSize: "14px",
                              margin: "4px",
                              padding: "0px 8px",
                              border: "none",
                              borderRadius: "4px"
                            }}
                            onClick={() => setshowColorPalette(false)}
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid rgb(120,120,120)",
                      padding: "0 8px",
                      borderRadius: "16px",
                      background: dm ? "#19191a" : "whitesmoke",
                      color: dm ? "white" : "black"
                    }}
                  >
                    <span style={{ marginRight: "10px" }}>
                      <BiFontSize size={20} />{" "}
                    </span>
                    <MdRemove
                      onClick={() => {
                        setElements((prevElements) =>
                          prevElements.map((element, index) => {
                            if (index === 0) {
                              // Assuming you want to update the first element
                              return {
                                ...element,
                                fontSize: elements[0].fontSize - 1
                              };
                            }
                            return element;
                          })
                        );
                      }}
                      style={{ cursor: "pointer" }}
                    ></MdRemove>
                    <input
                      type="number"
                      name="size"
                      value={elements[0].fontSize}
                      min="0"
                      max={canvasWidth}
                      step="1"
                      id="size"
                      onChange={(e) => {
                        setElements((prevElements) =>
                          prevElements.map((element, index) => {
                            if (index === 0) {
                              // Assuming you want to update the first element
                              return { ...element, fontSize: e.target.value };
                            }
                            return element;
                          })
                        );
                      }}
                      style={{
                        color: dm ? "white" : "black",
                        border: "none",
                        outline: "none",
                        background: dm ? "rgb(50,50,50)" : "white",
                        width: "30px",
                        textAlign: "center",
                        margin: "0 4px"
                      }}
                    />
                    <MdAdd
                      onClick={() => {
                        setElements((prevElements) =>
                          prevElements.map((element, index) => {
                            if (index === 0) {
                              // Assuming you want to update the first element
                              return {
                                ...element,
                                fontSize: elements[0].fontSize + 1
                              };
                            }
                            return element;
                          })
                        );
                      }}
                      style={{ cursor: "pointer" }}
                    ></MdAdd>
                  </div>
                </div>

                <div className="w-full flex flex-row items-center justify-between rounded-xl p-2 text-xs font-medium border bg-gray-50">
                  <p
                    onClick={() => {
                      setCanvasStyles((prevStyles) => ({
                        ...prevStyles,
                        bgtheme: "gradient"
                      }));
                    }}
                    className={`w-full text-center py-2 rounded-[10px] cursor-pointer ${
                      canvasStyles.bgtheme == "gradient" ? "shadow-md" : ""
                    } font-semibold hover:bg-[rgb(250,250,250)]`}
                    style={{
                      background:
                        canvasStyles.bgtheme == "gradient" ? "white" : ""
                    }}
                  >
                    Gradient
                  </p>

                  <p
                    onClick={() => {
                      setCanvasStyles((prevStyles) => ({
                        ...prevStyles,
                        bgtheme: "solid"
                      }));
                    }}
                    className={`w-full text-center py-2 rounded-[10px] cursor-pointer ${
                      canvasStyles.bgtheme == "solid" ? "shadow-md" : ""
                    } font-semibold hover:bg-[rgb(250,250,250)] mx-1`}
                    style={{
                      background: canvasStyles.bgtheme == "solid" ? "white" : ""
                    }}
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
                    marginTop: "12px"
                  }}
                >
                  {customGrad.map((color, index) => (
                    <>
                      <CustomColor
                        color={color}
                        key={index}
                        dm={dm}
                        index={index}
                        handleColorChange={handleColorChange}
                      ></CustomColor>
                    </>
                  ))}
                </div>

                <div
                  style={{
                    display: showExtra ? "flex" : "none",
                    width: "100%",
                    flexWrap: "wrap",
                    maxHeight: "15vh",
                    overflowY: "scroll",
                    scrollMargin: 0,
                    justifyContent: "center",
                    backgroundColor: dm ? "black" : "white",
                    border: dm ? "1px solid rgb(50,50,50)" : "1px solid silver",
                    marginTop: "8px",
                    padding: "4px",
                    borderRadius: "16px"
                  }}
                >
                  {canvasStyles.bgtheme === "gradient" &&
                    gradients.map((gradient, index) => (
                      <span
                        onClick={(e) => {
                          setgradientColor(gradient);
                          setCanvasStyles((prevStyles) => ({
                            ...prevStyles,
                            gradientIndex: index
                          }));

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
                        }}
                        key={index}
                        style={{
                          background: gradient,
                          height: "30px",
                          width: "30px",
                          margin: "4px",
                          borderRadius:
                            gradientColor === gradient ? "50%" : "4px",
                          border: "1px solid gray"
                        }}
                      ></span>
                    ))}

                  {canvasStyles.bgtheme === "solid" &&
                    solidColors.map((solid, index) => (
                      <span
                        onClick={(e) => {
                          setgradientColor(solid);
                          setCanvasStyles((prevStyles) => ({
                            ...prevStyles,
                            gradientIndex: index
                          }));
                        }}
                        key={index}
                        style={{
                          background: solid,
                          height: "30px",
                          width: "30px",
                          margin: "4px",
                          borderRadius: gradientColor === solid ? "50%" : "0"
                        }}
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

                  {canvasStyles.bgtheme === "image" &&
                    Array(70)
                      .fill(0)
                      .map((img, i) => {
                        return (
                          <img
                            key={i}
                            onClick={() => {
                              setCanvasStyles((prevStyles) => ({
                                ...prevStyles,
                                currentImg: i + 1
                              }));
                              setbgImage("");
                              setcustombgImage(false);
                            }}
                            src={`/test${i + 1}.webp`}
                            alt=""
                            style={{
                              height: "50px",
                              width: "50px",
                              margin: "4px",
                              borderRadius:
                                canvasStyles.currentImg === i + 1 ? "50%" : "0"
                            }}
                          />
                        );
                      })
                      .reverse()}
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
              <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all  peer-checked:bg-teal-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 ">
                Show Watermark
              </span>
            </label>

            <p className="text-xs mx-4 text-gray-400">
              Note - video is downloaded in webm format, once downloaded you can
              easily convert it to mp4 online
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
