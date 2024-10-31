import BarCode from "@/Components/ChildrenComponents/BarCode";
import CodeChild from "@/Components/ChildrenComponents/Code";
import DeviceMockupShot from "@/Components/ChildrenComponents/DeviceMockupShot";
import FakeTweet from "@/Components/ChildrenComponents/FakeTweet";
import QRChild from "@/Components/ChildrenComponents/QRChild";
import RedditToShot from "@/Components/ChildrenComponents/RedditShot";
import ScreenShotMockup from "@/Components/ChildrenComponents/ScreenShotMockup";
import ShortBlog from "@/Components/ChildrenComponents/ShortBlog";
import TweetToShot from "@/Components/ChildrenComponents/TweetToShot";
import YoutubeShot from "@/Components/ChildrenComponents/YoutubeShot";
import { solidColors } from "@/Components/files/GradientsAndImages";
import InstaPost from "@/Components/Insta/InstaPost";
import LoginModal from "@/Components/Modals/LoginModal";
import PremiumModal from "@/Components/Modals/PremiumModal";
import Template1 from "@/Components/TestimonialTemplates/Template1";
import Watermark from "@/Components/Watermark";
import { useAppContext } from "@/context";
import { host } from "@/host";
import domtoimage from "dom-to-image";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import ImgDiv2 from "./ImgDiv2";
import Nav from "./Nav";
import RightSidebar from "./RightSidebar";

export default function MainLayout({ designprops, dm, device }) {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log(`Navigating to ${pathname}`);
    window.scrollTo(0, 0);
  }, [pathname]);

  const bgimgref = useRef();
  const router = useLocation();
  const [content, setcontent] = useState([
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
      lineNo: false,
    },
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
      opacity: 1,
    },
    aspectRatio: "auto",
    backgroundColor: "#ffffff",
    bgtheme: "gradient",
    gradangle: 135,
    gradientIndex: 88,
    currentImg: 3,
    show: false,
  });

  const [undoHistory, setUndoHistory] = useState([]);
  const [redoHistory, setRedoHistory] = useState([]);
  const [showWatermark, setshowWatermark] = useState(true);
  const [showLoginModal, setshowLoginModal] = useState(false);
  const [showPremiumModal, setshowPremiumModal] = useState(false);
  const [location, setlocation] = useState({
    top: 1,
    right: 1,
    bottom: 1,
    left: 1,
  });

  const [gradientColor, setgradientColor] = useState(
    `linear-gradient(${canvasStyles.gradangle}deg, #FF002C, #FF0057, #FF0082, #FF00AD, #FF00D8, #C100FF, #8900FF, #5900FF, #2400FF)`
  );

  const [transparency, settransparency] = useState(1);
  const [br, setbr] = useState(0);
  const [shadow, setshadow] = useState(0);
  const [pdng, setpdng] = useState(3);
  const [size, setsize] = useState(100);
  const [showExtra, setshowExtra] = useState(true);
  const [frame, setframe] = useState("none");
  const [isVisible, setisVisible] = useState(false);
  const [showScolorPalette, setshowScolorPalette] = useState(false);
  const [scolor, setscolor] = useState("#1e1e1e");
  const divRef = useRef();
  const [tilt, settilt] = useState(true);
  const [currentActive, setcurrentActive] = useState("");
  const [currentTag, setcurrentTag] = useState("");
  const [custombgImage, setcustombgImage] = useState(false);
  const [bgImage, setbgImage] = useState("");
  const [opacity, setOpacity] = useState(1);
  const [dwGif, setdwGif] = useState(false);
  const [downloading, setdownloading] = useState(false);
  const [tab, settab] = useState(3);
  const [showColorPalette, setshowColorPalette] = useState(false);
  const [showBackgroundPalette, setshowBackgroundPalette] = useState(false);
  const [quality, setquality] = useState(2);
  const [format, setformat] = useState("png");
  const [customGrad, setcustomGrad] = useState([]);
  const [filename, setfilename] = useState("pixlab");
  const context = useAppContext();

  const { username, _id, planType } = context.sharedState;

  const [canvasWidth, setCanvasWidth] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);

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
        opacity: 1,
      },
      aspectRatio: "1/1",
      backgroundColor: "#ffffff",
      bgtheme: "gradient",
      gradangle: 135,
      gradientIndex: 27,
      currentImg: 3,
    },
  });

  function undoRedoFunc() {
    setUndoHistory((prevUndoHistory) => [...prevUndoHistory, mainState]);
    setRedoHistory([]);
  }

  useEffect(() => {
    if (planType !== "free") {
      setshowWatermark(false);
    } else {
      setshowWatermark(true);
    }

    if (planType == "pro" || planType == "starter") {
      setquality(4);
    }
  }, [planType]);

  const saveImage = async () => {
    const scale = quality;
    domtoimage
      .toPng(divRef.current, {
        height: divRef.current.offsetHeight * scale,
        width: divRef.current.offsetWidth * scale,
        style: {
          transform: "scale(" + scale + ")",
          transformOrigin: "top left",
          width: divRef.current.offsetWidth + "px",
          height: divRef.current.offsetHeight + "px",
        },
      })
      .then(async (data) => {
        domtoimage
          .toPng(divRef.current, {
            height: divRef.current.offsetHeight * scale,
            width: divRef.current.offsetWidth * scale,
            style: {
              transform: "scale(" + scale + ")",
              transformOrigin: "top left",
              width: divRef.current.offsetWidth + "px",
              height: divRef.current.offsetHeight + "px",
            },
          })
          .then(async (data) => {
            var a = document.createElement("A");
            a.href = data;
            a.download = `${filename}.${format}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            toast.success("Image exported!");
            updateanalytics();
          });
      });
  };

  const handleDownload = () => {
    setisVisible(true);
    setdownloading(true);

    const scale = quality;
    const node = document.getElementById("ss");

    const style = {
      transform: "scale(" + scale + ")",
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

    // Convert data URL to Blob
    // Convert data URL to Blob
    function dataURLtoBlob(dataurl) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      // Set MIME type for SVG and WebP images
      if (format === "svg") {
        mime = "image/svg+xml";
      } else if (format === "webp") {
        alert("herelad");
        mime = "image/webp";
      }

      return new Blob([u8arr], { type: mime });
    }

    const generateImage = async () => {
      try {
        var dataUrl1;
        var dataUrl;
        if (format === "jpeg") {
          dataUrl1 = await domtoimage.toJpeg(node, param);
          dataUrl = await domtoimage.toJpeg(node, param);
        } else if (format === "svg") {
          dataUrl1 = await domtoimage.toSvg(node, param);
          dataUrl = await domtoimage.toSvg(node, param);
        } else if (format === "webp") {
          dataUrl = await convertImageToWebP(node, param);
        } else {
          dataUrl1 = await domtoimage.toPng(node, param);
          dataUrl = await domtoimage.toPng(node, param);
        }

        // Convert data URL to Blob
        const downloadLink = document.createElement("a");

        downloadLink.download = `${filename}.${format}`;
        downloadLink.href = dataUrl;
        downloadLink.click();
        updateanalytics();
      } catch (error) {
        console.error("Error capturing screenshot:", error);
        window.open(dataUrl, "_blank");
      } finally {
        setdownloading(false);
        setTimeout(() => {
          setisVisible(false);
        }, 2000);
        return toast("Downloaded ! Share pixlab With Others", {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };

    setTimeout(generateImage, 0);
  };

  const convertImageToWebP = async (node, param) => {
    const dataUrl = await domtoimage.toPng(node, param);
    const image = new Image();
    image.src = dataUrl;
    await new Promise((resolve) => (image.onload = resolve));

    // Create a canvas element
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    // Draw the image onto the canvas
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);

    // Convert the canvas to a WebP blob
    return new Promise((resolve) =>
      canvas.toBlob((blob) => {
        // Create a data URL for the blob
        const dataUrl = URL.createObjectURL(blob);

        // Callback
        resolve(dataUrl);
      }, "image/webp")
    );
  };

  const handleDownloadGif = () => {
    setOpacity(0);
    setdwGif(true);
    setdownloading(true);
    setisVisible(true);

    const node = document.getElementById("ss");

    const generateGif = async () => {
      try {
        const frames = [];
        let numFrames = 10; // Number of frames to capture
        let frameDelay = 300; // Delay between each frame capture in ms

        for (let i = 0; i < numFrames; i++) {
          setOpacity(i / (numFrames - 1));
          const dataUrl = await domtoimage.toPng(node);
          frames.push(dataUrl);
          await new Promise((resolve) => setTimeout(resolve, frameDelay));
        }

        const gifOptions = {
          images: frames,
          interval: frameDelay / 1000,
          gifWidth: node.offsetWidth,
          gifHeight: node.offsetHeight,
          numWorkers: 5,
        };

        gifshot.createGIF(gifOptions, (obj) => {
          if (!obj.error) {
            const downloadLink = document.createElement("a");
            let d = new Date();
            let ds = d.toString();
            downloadLink.download = `pixlab ${ds}.gif`;
            downloadLink.href = obj.image;
            downloadLink.click();
          }
        });
      } catch (error) {
        console.error("Error capturing screenshot:", error);
      } finally {
        setisVisible(false);
        setdownloading(false);
        setdwGif(false);
        updateanalytics();
      }
    };

    setTimeout(generateGif, 0);
  };

  const [transform, settransform] = useState(
    " perspective(500px) rotateY(0deg) rotateX(0deg)"
  );

  useEffect(() => {
    const parentDiv = divRef.current;
    const width = parentDiv.clientWidth;
    const height = parentDiv.clientHeight;
    setCanvasWidth(width);
    setCanvasHeight(height);
  }, [canvasStyles.aspectRatio]);

  useEffect(() => {
    const fn = Math.floor(Date.now());
    setfilename(`pixlab_${fn}`);

    if (location.pathname == `/device-mockups/${device}`) {
      const newArr = [...content]; // create a copy of the original array
      let s = "0.5";
      if (window.innerWidth < 600) {
        s = "0.3";
      }
      newArr[0] = { ...content[0], frame: device, scale: s, pdng: 1 }; // update the shadow property of the selected item
      undoRedoFunc();
      setcontent(newArr); // update the state with the new array

      setCanvasStyles((prevStyles) => ({
        ...prevStyles,
        aspectRatio: 1,
      }));
    } else {
      if (window.innerWidth < 801) {
        const newArr = [...content]; // create a copy of the original array
        newArr[0] = { ...content[0], pdng: 1 }; // update the shadow property of the selected item
        undoRedoFunc();
        setcontent(newArr); // update the state with the new array
      }
    }
  }, []);

  async function updateanalytics() {
    if (
      _id &&
      (_id == "6486b6d925e907175c59a831" ||
        _id == "648b353648b0630acf47d13e" ||
        _id == "64cff4ef4fe7a04dcd2ea0ad" ||
        _id == "64d219d7010d1c3346d9ca47")
    ) {
      return;
    }

    const response = await fetch(`${host}/api/update-analytics`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    const json = await response.json();
    // //console.log(json)
  }

  useEffect(() => {
    if (canvasStyles.bgtheme === "image") {
      let getcol = document.getElementById("ss");

      getcol.style.backgroundSize = "cover";
    }
  }, [canvasStyles.bgtheme, canvasStyles.currentImg, bgImage]);

  useEffect(() => {
    const hexRegex = /#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/g;
    const rgbaRegex = /rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/g;
    const hexColors = gradientColor.match(hexRegex) || [];
    const rgbaColors = gradientColor.match(rgbaRegex) || [];
    const colors = [...hexColors, ...rgbaColors];
    setcustomGrad(colors);
  }, []);

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
    `linear-gradient(${canvasStyles.gradangle}deg, #ffffff, #ffffff)`,
  ];

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

  useEffect(() => {
    if (canvasStyles.bgtheme === "gradient") {
      setgradientColor(gradients[canvasStyles.gradientIndex]);
    }
  }, [transparency, canvasStyles.gradangle]);

  const [modalIsOn, setmodalIsOn] = useState(false);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setCanvasStyles((prevStyles) => ({
      ...prevStyles,
      canvasFilters: {
        ...prevStyles.canvasFilters,
        [event.target.name]: Number(event.target.value),
      },
    }));
  };
  const handleChange = (event, item, index) => {
    const { name, value } = event.target;
    const newArr = [...content]; // create a copy of the original array
    newArr[index] = { ...item, [event.target.name]: event.target.value }; // update the shadow property of the selected item
    undoRedoFunc();
    setcontent(newArr); // update the state with the new array
  };

  const handleImageChange = (event, item, index, asBlob) => {
    if (!asBlob) {
      const { name, value } = event.target;
      const newArr = [...content]; // create a copy of the original array
      newArr[index] = { ...item, [event.target.name]: event.target.files[0] }; // update the shadow property of the selected item
      undoRedoFunc();
      setcontent(newArr); // update the state with the new array
    } else if (asBlob) {
      // alert("sdfls",asBlob)
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const newArr = [...content]; // create a copy of the original array
        newArr[index] = { ...item, [event.target.name]: reader.result }; // update the shadow property of the selected item
        undoRedoFunc();
        setcontent(newArr); // update the state with the new array
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  const handleCodeChange = (event, item, index) => {
    const newArr = [...content]; // create a copy of the original array
    newArr[index] = { ...item, code: event }; // update the shadow property of the selected item
    undoRedoFunc();
    setcontent(newArr); // update the state with the new array
  };

  useEffect(() => {
    setMainState({
      content: content,
      canvasStyles: canvasStyles,
    });
  }, [content, canvasStyles]);

  return (
    <>
      <div className="h-screen">
        <Nav
          canvasStyles={canvasStyles}
          setCanvasStyles={setCanvasStyles}
          setCanvasWidth={setCanvasWidth}
          setCanvasHeight={setCanvasHeight}
          divRef={divRef}
          format={format}
          saveImage={saveImage}
          handleDownload={handleDownload}
          handleDownloadGif={handleDownloadGif}
        ></Nav>

        <div
          id="maindiv"
          className="flex flex-col sm:flex-row  overflow-auto bg-[#f5f5f5] dark:bg-[#141414] dark:text-white"
          style={{ minHeight: "calc(100vh - 56px)" }}
        >
          {/* <div className="w-80 h-screen bg-[#f5f5f5] dark:bg-[#1a1a1a]" ></div> */}
          <div
            className="flex justify-center items-center py-4 w-full"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <div
              id="ss"
              ref={divRef}
              className={`ssMainTernary shadow-lg md:max-w-[50%] ${
                canvasStyles.aspectRatio !== "auto" &&
                parseFloat(eval(canvasStyles.aspectRatio)) < 1
                  ? "md:max-w-[30%]"
                  : "md:max-w-[60%]"
              }`}
              onClick={() => {
                setcurrentActive("");
                document.body.style.overflow = "auto";
              }}
              style={{
                paddingTop: `${content[0]?.pdng * location.top}rem`,
                paddingRight: `${content[0]?.pdng * location.right}rem`,
                paddingBottom: `${content[0]?.pdng * location.bottom}rem`,
                paddingLeft: `${content[0]?.pdng * location.left}rem`,
                margin: "0px",
                background:
                  canvasStyles.bgtheme === "gradient" ||
                  canvasStyles.bgtheme === "solid"
                    ? gradientColor
                    : canvasStyles.bgtheme === "image" && !custombgImage
                    ? `url(/test${canvasStyles.currentImg}.webp)`
                    : canvasStyles.bgtheme === "image" &&
                      custombgImage &&
                      bgImage?.name
                    ? `url(${URL.createObjectURL(bgImage)})`
                    : "",
                position: "relative",
                backgroundSize: "contain",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                aspectRatio: canvasStyles.aspectRatio,
                filter: !modalIsOn
                  ? `brightness(${canvasStyles.canvasFilters.brightness}) contrast(${canvasStyles.canvasFilters.contrast}) grayscale(${canvasStyles.canvasFilters.grayscale}) blur(${canvasStyles.canvasFilters.blur}px) hue-rotate(${canvasStyles.canvasFilters.hueRotate}deg) invert(${canvasStyles.canvasFilters.invert}) opacity(${canvasStyles.canvasFilters.opacity}) saturate(${canvasStyles.canvasFilters.saturate}) sepia(${canvasStyles.canvasFilters.sepia})`
                  : "",
                overflow: "hidden",
                opacity: dwGif ? opacity : 1,
                scrollMargin: 0,
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {content.length > 0 &&
                content.map((item, i) => (
                  <ImgDiv2
                    key={item.id}
                    dm={dm}
                    br={br}
                    frame={frame}
                    size={size}
                    shadow={shadow}
                    photo={item.photo}
                    canvasHeight={canvasHeight}
                    canvasWidth={canvasWidth}
                    transform={transform}
                    scolor={scolor}
                    id={item.id}
                    isDeleted={item.isDeleted}
                    content={content}
                    undoRedoFunc={undoRedoFunc}
                    setcontent={setcontent}
                    setcurrentActive={setcurrentActive}
                    item={item}
                    currentActive={currentActive}
                    setcurrentTag={setcurrentTag}
                    downloading={downloading}
                    index={i}
                    setmodalIsOn={setmodalIsOn}
                  >
                    {router.pathname === "/testimonial" && (
                      <Template1
                        item={item}
                        undoRedoFunc={undoRedoFunc}
                        setcontent={setcontent}
                        content={content}
                        handleChange={handleChange}
                        handleImageChange={handleImageChange}
                        index={i}
                      />
                    )}

                    {router.pathname === "/twitter" && (
                      <FakeTweet
                        item={item}
                        handleChange={handleChange}
                        handleImageChange={handleImageChange}
                        index={i}
                      />
                    )}

                    {router.pathname === "/instagram" && (
                      <InstaPost
                        item={item}
                        handleChange={handleChange}
                        handleImageChange={handleImageChange}
                        index={i}
                      />
                    )}

                    {router.pathname === "/short-blog" && (
                      <ShortBlog
                        item={item}
                        handleChange={handleChange}
                        handleImageChange={handleImageChange}
                        index={i}
                      />
                    )}

                    {router.pathname === "/code" && (
                      <CodeChild
                        item={item}
                        handleChange={handleChange}
                        handleImageChange={handleImageChange}
                        index={i}
                        handleCodeChange={handleCodeChange}
                      />
                    )}

                    {router.pathname === `/device-mockups/${device}` && (
                      <DeviceMockupShot
                        item={item}
                        handleChange={handleChange}
                        handleImageChange={handleImageChange}
                        index={i}
                        handleCodeChange={handleCodeChange}
                        content={content}
                        setcontent={setcontent}
                        undoRedoFunc={undoRedoFunc}
                        setCanvasStyles={setCanvasStyles}
                      />
                    )}

                    {router.pathname === "/screenshot-mockup" && (
                      <ScreenShotMockup
                        item={item}
                        handleChange={handleChange}
                        handleImageChange={handleImageChange}
                        index={i}
                        handleCodeChange={handleCodeChange}
                        content={content}
                        setcontent={setcontent}
                      />
                    )}

                    {router.pathname === "/tweet-to-screenshot" && (
                      <TweetToShot
                        item={item}
                        handleChange={handleChange}
                        handleImageChange={handleImageChange}
                        index={i}
                        handleCodeChange={handleCodeChange}
                        content={content}
                        setcontent={setcontent}
                      />
                    )}

                    {router.pathname === "/reddit-screenshot" && (
                      <RedditToShot
                        item={item}
                        handleChange={handleChange}
                        handleImageChange={handleImageChange}
                        index={i}
                        handleCodeChange={handleCodeChange}
                        content={content}
                        setcontent={setcontent}
                      />
                    )}

                    {router.pathname === "/youtube-screenshot" && (
                      <YoutubeShot
                        item={item}
                        handleChange={handleChange}
                        handleImageChange={handleImageChange}
                        index={i}
                        handleCodeChange={handleCodeChange}
                        content={content}
                        setcontent={setcontent}
                      />
                    )}

                    {router.pathname === "/qr-code" && (
                      <QRChild
                        item={item}
                        frame={item.frame}
                        br={item.br}
                        shadow={item.shadow}
                        transform={item.transform}
                        code={item.code}
                        theme={item.theme}
                        language={item.language}
                        lineNo={item.lineNo}
                        glassy={item.glassy}
                        backColor={item.background}
                        color={item.color}
                        title={item.title}
                        showQrLabel={item.showQrLabel}
                        qrlabel={item.qrlabel}
                      />
                    )}

                    {router.pathname === "/bar-code" && (
                      <BarCode
                        item={item}
                        frame={item.frame}
                        br={item.br}
                        shadow={item.shadow}
                        transform={item.transform}
                        code={item.code}
                        theme={item.theme}
                        language={item.language}
                        lineNo={item.lineNo}
                        glassy={item.glassy}
                        backColor={item.background}
                        color={item.color}
                        title={item.title}
                        showQrLabel={item.showQrLabel}
                        qrlabel={item.qrlabel}
                      />
                    )}
                  </ImgDiv2>
                ))}

              <Watermark
                dm={dm}
                showWatermark={showWatermark}
                setshowWatermark={setshowWatermark}
                setmodalIsOn={setmodalIsOn}
                setshowPremiumModal={setshowPremiumModal}
                setshowLoginModal={setshowLoginModal}
              />
            </div>
          </div>

          <RightSidebar
            tab={tab}
            settab={settab}
            quality={quality}
            format={format}
            username={username}
            planType={planType}
            setshowLoginModal={setshowLoginModal}
            setshowPremiumModal={setshowPremiumModal}
            setquality={setquality}
            setformat={setformat}
            canvasStyles={canvasStyles}
            handleFilterChange={handleFilterChange}
            setfilename={setfilename}
            filename={filename}
            setCanvasStyles={setCanvasStyles}
            setbr={setbr}
            setshadow={setshadow}
            setframe={setframe}
            setpdng={setpdng}
            content={content}
            setcontent={setcontent}
            setMainState={setMainState}
            customGrad={customGrad}
            setcustomGrad={setcustomGrad}
            showWatermark={showWatermark}
            setshowWatermark={setshowWatermark}
            showColorPalette={showColorPalette}
            setshowColorPalette={setshowColorPalette}
            showBackgroundPalette={showBackgroundPalette}
            setshowBackgroundPalette={setshowBackgroundPalette}
            tilt={tilt}
            settilt={settilt}
            scolor={scolor}
            setscolor={setscolor}
            showScolorPalette={showScolorPalette}
            setshowScolorPalette={setshowScolorPalette}
            transform={transform}
            settransform={settransform}
            setgradientColor={setgradientColor}
            modalIsOn={modalIsOn}
            setmodalIsOn={setmodalIsOn}
            dwGif={dwGif}
            location={location}
            setlocation={setlocation}
            undoRedoFunc={undoRedoFunc}
            showExtra={showExtra}
            setshowExtra={setshowExtra}
            handleColorChange={handleColorChange}
            gradients={gradients}
            gradientColor={gradientColor}
            bgimgref={bgimgref}
            bgImage={bgImage}
            setbgImage={setbgImage}
            custombgImage={custombgImage}
            setcustombgImage={setcustombgImage}
            solidColors={solidColors}
          />
        </div>
      </div>

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
    </>
  );
}
