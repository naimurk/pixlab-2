import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader
} from "@/Components/ui/drawer";
import { host } from "@/host";
import domtoimage from "dom-to-image";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Code from "@/Components/Drag&Drop/Code";
import Icon from "@/Components/Drag&Drop/Icon";
import ImageComponent from "@/Components/Drag&Drop/Image2";
import QrCode from "@/Components/Drag&Drop/QrCode";
import Text from "@/Components/Drag&Drop/Text2";
import Watermark from "@/Components/Watermark";
import { useAppContext } from "@/context";

import {
  solidColors,
  template_images,
  testArray
} from "@/Components/files/GradientsAndImages";
import MaterialUIIcons from "@/Components/MaterialUIIcons";
import LoginModal from "@/Components/Modals/LoginModal";
import PremiumModal from "@/Components/Modals/PremiumModal";
import { Image } from "lucide-react";
import QRCode from "react-qr-code";
import AsideBarDesign from "./AsideBarDesign";
import EditOptionsDesign from "./EditOptionsDesign";
import NavDesign from "./NavDesign";

export default function DesignLayout({ designprops, dm }) {
  const imgref = useRef();
  const bgimgref = useRef();
  const [content, setcontent] = useState([]);
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
    aspectRatio: "1/1",
    backgroundColor: "#ffffff",
    bgtheme: "gradient",
    gradangle: 135,
    gradientIndex: 27,
    currentImg: 3
  });

  const [undoHistory, setUndoHistory] = useState([]);
  const [redoHistory, setRedoHistory] = useState([]);
  const [showLoginModal, setshowLoginModal] = useState(false);
  const [showPremiumModal, setshowPremiumModal] = useState(false);

  const [designPresets, setdesignPresets] = useState([]);

  const [gradientColor, setgradientColor] = useState(
    `linear-gradient(${canvasStyles.gradangle}deg, #FF002C, #FF0057, #FF0082, #FF00AD, #FF00D8, #C100FF, #8900FF, #5900FF, #2400FF)`
  );

  const [img, setimg] = useState([]);
  const [transparency, settransparency] = useState(1);
  const [br, setbr] = useState(0);
  const [maxbr, setmaxbr] = useState(250);
  const [shadow, setshadow] = useState(0);
  const [pdng, setpdng] = useState(3);
  const [size, setsize] = useState(100);
  const [showExtra, setshowExtra] = useState(true);
  const [frame, setframe] = useState("none");
  const [isVisible, setisVisible] = useState(false);
  const [showScolorPalette, setshowScolorPalette] = useState(false);
  const [scolor, setscolor] = useState("#1e1e1e");
  const divRef = useRef();
  const containerRef = useRef();
  const [tilt, settilt] = useState(true);
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);
  const [showBasics, setshowBasics] = useState(true);
  const [showWatermark, setshowWatermark] = useState(true);

  const [showAddBtn, setshowAddBtn] = useState(false);
  const [showAddOpt, setshowAddOpt] = useState(false);

  const [currentActive, setcurrentActive] = useState("");
  const [currentTag, setcurrentTag] = useState("");
  const [clicks, setclicks] = useState(0);

  const [custombgImage, setcustombgImage] = useState(false);
  const [bgImage, setbgImage] = useState("");

  const [opacity, setOpacity] = useState(1);
  const [dwGif, setdwGif] = useState(false);
  const [downloading, setdownloading] = useState(false);
  const [tab, settab] = useState(0);
  const [showColorPalette, setshowColorPalette] = useState(false);
  const [showBackgroundPalette, setshowBackgroundPalette] = useState(false);
  const [quality, setquality] = useState(2);
  const [format, setformat] = useState("png");
  const [customGrad, setcustomGrad] = useState([]);
  const [filename, setfilename] = useState("pixlab");
  const context = useAppContext();

  const { username, name, _id, profileImg, about, guest, planType } =
    context.sharedState;

  const [isPreset, setisPreset] = useState(false);
  const [preset, setpreset] = useState();

  const [isIOS, setIsIOS] = useState(false);
  const [isSafari, setIsSafari] = useState(false);
  const [showTemplates, setshowTemplates] = useState(false);
  const [showPresets, setshowPresets] = useState(false);
  const [showElements, setshowElements] = useState(false);
  useEffect(() => {
    if (window.innerWidth > 1000) {
      setshowAddBtn(false);
      setshowAddOpt(true);
    } else {
      setshowAddBtn(true);
      setshowAddOpt(true);
      setshowBasics(false);
      // setformat("webp")
    }

    const fn = Math.floor(Date.now());
    setfilename(`pixlab_${fn}`);

    const _isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const _isSafari = /^((?!chrome|android).)*safari/i.test(
      navigator.userAgent
    );

    setIsIOS(_isIOS);
    setIsSafari(_isSafari);
  }, []);

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
      aspectRatio: "1/1",
      backgroundColor: "#ffffff",
      bgtheme: "gradient",
      gradangle: 135,
      gradientIndex: 27,
      currentImg: 3
    }
  });

  useEffect(() => {
    if (designprops) {
      setcontent(designprops.fetch_design.content);
      setCanvasStyles(designprops.fetch_design.canvasStyles);
      setisPreset(true);
      setpreset(designprops.fetch_design);
      setfilename(designprops.fetch_design.title);
      setMainState({
        content: designprops.fetch_design.content,
        canvasStyles: designprops.fetch_design.canvasStyles
      });
    }
  }, [designprops]);

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

  useEffect(() => {
    if (!designprops) {
      setTimeout(() => {
        const localPreset = JSON.stringify(content);

        localStorage.setItem("localPreset", localPreset);
      }, 500);
    }
  }, [content]);

  useEffect(() => {
    if (!designprops) {
      setTimeout(() => {
        const localPresetStyles = JSON.stringify(canvasStyles);

        localStorage.setItem("localPresetStyles", localPresetStyles);
      }, 500);
    }
  }, [canvasStyles]);

  useEffect(() => {
    if (!designprops) {
      setTimeout(() => {
        const gcolor = JSON.stringify(gradientColor);

        localStorage.setItem("gradientColor", gcolor);
      }, 500);
    }
  }, [gradientColor]);

  useEffect(() => {
    if (
      currentTag == "image" ||
      currentTag == "text" ||
      currentTag == "qrocde" ||
      currentTag == "icon" ||
      currentTag == "code"
    ) {
      settab(3);
    } else {
      settab(0);
    }
  }, [currentTag]);

  const testdw = () => {
    setisVisible(true);
    setdownloading(true);

    const scale = quality;
    const node = document.getElementById("ss");

    const style = {
      transform: "scale(" + scale + ")",
      transformOrigin: "top left",
      width: node.offsetWidth + "px",
      height: node.offsetHeight + "px"
    };

    const param = {
      height: node.offsetHeight * scale,
      width: node.offsetWidth * scale,
      quality: 1,
      style
    };

    // Convert data URL to Blob
    // Convert data URL to Blob
    function dataURLtoBlob(dataurl) {
      // Decode the dataURL
      const binary = atob(dataurl.split(",")[1]);

      // Create 8-bit unsigned array
      const array = [];
      for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }

      // Return our Blob object
      return new Blob([new Uint8Array(array)], { type: "image/svg+xml" });
    }

    const generateImage = async () => {
      try {
        var dataUrl1;
        var dataUrl;

        try {
          console.log("test here");
          dataUrl1 = await domtoimage.toSvg(node, param);
          dataUrl = await domtoimage.toSvg(node, param);
          console.log("passed", dataUrl);
        } catch (error) {
          console.error(error);
        }

        // Check if user is using iOS Safari
        const isIOS =
          /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        const isSafari = /^((?!chrome|android).)*safari/i.test(
          navigator.userAgent
        );

        if (true) {
          console.log("ON SAFARI or IOS");
          try {
            console.log("1: Creating a new Image object");
            const image = new Image();

            console.log("2: Setting the source of the Image object");
            image.src = dataUrl;

            image.onload = function () {
              console.log("3: Image has loaded");

              console.log(
                "4: Creating a new canvas and drawing the image onto it"
              );
              let canvas = document.createElement("canvas");
              canvas.width = image.width;
              canvas.height = image.height;
              let context = canvas.getContext("2d");
              context.drawImage(image, 0, 0, image.width, image.height);

              console.log("5: Converting the canvas to a PNG");
              let pngDataUrl = canvas.toDataURL("image/png");

              console.log(
                "6: Converting the PNG data URL to a blob and creating a blob URL"
              );
              fetch(pngDataUrl)
                .then((r) => r.blob())
                .then((blob) => {
                  console.log("7: Blob created");

                  let fileURL = URL.createObjectURL(blob);
                  console.log("8: Blob URL created");

                  console.log("9: Opening the blob URL in a new tab");
                  let downloadLink = document.createElement("a");
                  downloadLink.href = fileURL;
                  downloadLink.target = "_blank";
                  downloadLink.click();
                  console.log("10: Blob URL opened in a new tab");
                })
                .catch((error) => console.log("Error:", error));
            };
          } catch (error) {
            console.error("Error:", error);
          }
        } else {
          // Convert data URL to Blob
          const downloadLink = document.createElement("a");

          downloadLink.download = `${filename}.${format}`;
          downloadLink.href = dataUrl;
          downloadLink.click();
          updateanalytics();
        }
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
          progress: undefined
        });
      }
    };

    setTimeout(generateImage, 0);
  };

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
          height: divRef.current.offsetHeight + "px"
        }
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
              height: divRef.current.offsetHeight + "px"
            }
          })
          .then(async (data) => {
            var a = document.createElement("A");
            a.href = data;
            a.download = `${filename}.${format}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            toast.success("Image exported!");
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
      height: node.offsetHeight + "px"
    };

    const param = {
      height: node.offsetHeight * scale,
      width: node.offsetWidth * scale,
      quality: 1,
      style
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

        // Check if user is using iOS Safari
        const isIOS =
          /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        const isSafari = /^((?!chrome|android).)*safari/i.test(
          navigator.userAgent
        );

        if (isIOS || isSafari) {
          saveImage();
          // console.log("ON SAFARI or IOS")
          // try {
          //   const blob = dataURLtoBlob(dataUrl);

          //   // Create File object from Blob
          //   const file = new File([blob], `${filename}.${format}`, { type: blob.type });

          //   const fileURL = URL.createObjectURL(file);

          //   const downloadLink = document.createElement('a');

          //   downloadLink.href = fileURL;
          //   downloadLink.click();
          // } catch (error) {
          //   console.log(error)
          // }
        } else {
          // Convert data URL to Blob
          const downloadLink = document.createElement("a");

          downloadLink.download = `${filename}.${format}`;
          downloadLink.href = dataUrl;
          downloadLink.click();
        }
      } catch (error) {
        console.error("Error capturing screenshot:", error);
        window.open(dataUrl, "_blank");
      } finally {
        updateanalytics();
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
          progress: undefined
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
          numWorkers: 5
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
    "translate(-50%,-50%) perspective(500px) rotateY(0deg) rotateX(0deg)"
  );

  const fakeTouch = useRef();

  useEffect(() => {
    if (!designprops) {
      const myArrayString = localStorage.getItem("localPreset");
      const myStyles = localStorage.getItem("localPresetStyles");
      const gradient_Color = localStorage.getItem("gradientColor");

      setTimeout(() => {
        if (myArrayString) {
          const myArray = JSON.parse(myArrayString);
          if (myArray && myArray.length > 0) {
            setcontent(myArray);
          }
        }

        if (myStyles) {
          const styles = JSON.parse(myStyles);
          if (styles) {
            setCanvasStyles(styles);
          }
        }

        if (gradient_Color) {
          const gc = JSON.parse(gradient_Color);
          if (gc) {
            setgradientColor(gc);

            const hexRegex = /#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/g;
            const rgbaRegex = /rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/g;
            const hexColors = gc.match(hexRegex) || [];
            const rgbaColors = gc.match(rgbaRegex) || [];

            let rgbaToHex = [];
            for (let i = 0; i < rgbaColors.length; i++) {
              const values = rgbaColors[i]
                .replace(/rgba?\(/, "")
                .replace(/\)/, "")
                .replace(/[\s+]/g, "")
                .split(",");
              const r = parseInt(values[0], 10).toString(16).padStart(2, "0");
              const g = parseInt(values[1], 10).toString(16).padStart(2, "0");
              const b = parseInt(values[2], 10).toString(16).padStart(2, "0");
              const hex = `#${r}${g}${b}`;
              rgbaToHex.push(hex);
            }
            const colors = [...hexColors, ...rgbaToHex];
            setcustomGrad(colors);
          }
        }
      }, 0);
    }
  }, []);

  useEffect(() => {
    const parentDiv = divRef.current;
    const width = parentDiv.clientWidth;
    const height = parentDiv.clientHeight;
    setCanvasWidth(width);
    setCanvasHeight(height);
  }, [canvasStyles.aspectRatio]);

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
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
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
    `linear-gradient(${canvasStyles.gradangle}deg, #ffffff, #ffffff)`
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
        [event.target.name]: Number(event.target.value)
      }
    }));
  };

  const handlePaste = (event) => {
    const items = (event.clipboardData || event.originalEvent.clipboardData)
      .items;
    for (let index in items) {
      const item = items[index];
      if (item.kind === "file") {
        const blob = item.getAsFile();
        const reader = new FileReader();
        reader.onload = function (event) {
          // setImageSrc(event.target.result);
          console.log(event.target.result);
          undoRedoFunc();

          setcontent([
            ...content,
            {
              photo: event.target.result,
              id: Date.now(),
              isDeleted: false,
              shadow: "0",
              scolor: "#1e1e1e",
              br: Math.ceil((16 / canvasWidth) * 100),
              frame: "none",
              size: 50,
              transform:
                "translate(-50%,-50%) perspective(500px) rotateY(0deg) rotateX(0deg)",
              component: "image",
              // position: { left: canvasWidth / 2, top: canvasHeight / 2 },
              position: { left: 50, top: 50 }
            }
          ]);

          setTimeout(() => {
            const element = document.getElementById("imgdiv");
            if (element) {
              const width = element.clientWidth;
              setmaxbr(width / 2);
            }
          }, 1000);
        };
        reader.readAsDataURL(blob);
      }
    }
  };

  function onDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(content);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    undoRedoFunc();

    setcontent(items);
    console.log(items);
  }

  useEffect(() => {
    setMainState({
      content: content,
      canvasStyles: canvasStyles
    });
  }, [content, canvasStyles]);

  function undoRedoFunc() {
    setUndoHistory((prevUndoHistory) => [...prevUndoHistory, mainState]);
    setRedoHistory([]);
  }

  async function savePreset() {
    // console.log(mainState)
    let newMainState = { ...mainState };
    newMainState.content = newMainState.content.map((content) => {
      if (
        content.component === "image" &&
        content.photo.startsWith("data:image/")
      ) {
        return {
          ...content,
          photo: "/ur_img_here.webp"
        };
      }
      return content;
    });
    // console.log(newMainState)
    try {
      const response = await fetch(`${host}/api/design/newdesign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: _id,
          title: filename,
          description: "",
          main: newMainState,
          category: "design"
        })
      });
      const json = await response.json();
      setpreset(json.design);
      setisPreset(true);

      return toast("Saved As Preset !", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function deletePreset() {
    try {
      const response = await fetch(`${host}/api/design/delete_preset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ designId: preset._id, userId: _id })
      });
      const json = await response.json();
      console.log(json);
      setisPreset(false);
      setpreset(null);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetch_design_presets() {
    const response = await fetch(`${host}/api/design/fetch_design_presets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: _id })
    });
    const json = await response.json();
    console.log(json);
    setdesignPresets(json.fetch_design_presets);
  }

  // TOP BAR CODE STARTS HERE
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [showdropdown, setshowdropdown] = useState(false);
  const [megaMenu, setmegaMenu] = useState(false);
  const router = useNavigate();
  const [showprof, setshowprof] = useState(false);

  const logout = () => {
    localStorage.removeItem("gvtoken");
    context.setsharedState({
      name: "",
      profileImg: "",
      username: "",
      about: "",
      _id: "",
      ratings: [],
      accountType: "",
      notificationToken: "",
      notificationSettings: "",
      notificationCount: "",
      links: [],
      testimonials: [],
      totalRating: 0,
      avgRating: 0,
      profileVisits: 0,
      uniqueProfileVisits: 0,
      referrers: [],
      totalLinkClicks: 0,
      darkModeProfile: false,
      guest: true
    });
    router("/");
  };
  return (
    <>
      <div style={{ zIndex: 999 }}>
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
        {showTemplates ? (
          <Drawer open={showTemplates} onOpenChange={setshowTemplates}>
            {/* <DrawerTrigger open >Open</DrawerTrigger> */}
            <DrawerContent>
              <DrawerHeader>
                {/* <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                  <DrawerDescription>This action cannot be undone.</DrawerDescription> */}
                <div className="w-full flex flex-row items-center justify-between rounded-xl p-2 text-xs font-medium border bg-gray-50 dark:bg-gray-800 dark:text-white">
                  <p
                    onClick={() => {
                      setshowPresets(false);
                    }}
                    className={`w-full text-center py-2 rounded-[10px] cursor-pointer ${
                      showTemplates && !showPresets
                        ? "shadow-md bg-white dark:bg-gray-700"
                        : ""
                    } font-semibold hover:bg-gray-100 dark:hover:bg-gray-600`}
                  >
                    Templates
                  </p>
                  <p
                    onClick={() => {
                      setshowPresets(true);
                      fetch_design_presets();
                    }}
                    className={`w-full text-center py-2 rounded-[10px] cursor-pointer ${
                      showPresets ? "shadow-md bg-white dark:bg-gray-700" : ""
                    } font-semibold hover:bg-gray-100 dark:hover:bg-gray-600 mx-1`}
                  >
                    Presets
                  </p>
                </div>

                <div
                  className="w-full md:w-[40%] mx-auto"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    flex: 1,
                    alignItems: "flex-start",
                    justifyContent: "center",
                    overflowY: "scroll",
                    maxHeight: "40vh",
                    paddingBottom: "16px"
                  }}
                >
                  {showTemplates &&
                    !showPresets &&
                    testArray.map((design, i) => {
                      return (
                        <img
                          key={i}
                          onClick={() => {
                            // if (!username || username === null) {
                            //   return setshowLoginModal(true)
                            // }

                            // if (planType !== "starter" && planType !== "lifetime") {
                            //   return setshowPremiumModal(true)
                            // }

                            setshowTemplates(false);
                            undoRedoFunc();
                            setCanvasStyles(design.canvasStyles);
                            setcontent(design.content);
                            setgradientColor(
                              gradients[design.canvasStyles.gradientIndex]
                            );
                          }}
                          className="w-[30%] "
                          style={{
                            margin: "4px"
                          }}
                          src={template_images[i]}
                          alt=""
                        />
                      );
                    })}

                  {showPresets && designPresets && designPresets.length > 0
                    ? designPresets.map((design, i) => {
                        return (
                          <>
                            {design.designCategory == "design" ? (
                              <div
                                onClick={() => {
                                  setshowTemplates(false);
                                  setcontent(design.content);
                                  setCanvasStyles(design.canvasStyles);
                                  setgradientColor(
                                    gradients[design.canvasStyles.gradientIndex]
                                  );
                                }}
                                key={i}
                                style={{
                                  width: "30%",
                                  aspectRatio: design.canvasStyles.aspectRatio,
                                  border: "1px solid rgb(80,80,80)",
                                  background:
                                    design.canvasStyles.bgtheme ===
                                      "gradient" ||
                                    design.canvasStyles.bgtheme === "solid"
                                      ? gradients[
                                          design.canvasStyles.gradientIndex
                                        ]
                                      : design.canvasStyles.bgtheme ===
                                          "image" && custombgImage === false
                                      ? `url(/test${design.canvasStyles.currentImg}.webp)`
                                      : design.canvasStyles.bgtheme ===
                                          "image" &&
                                        custombgImage &&
                                        bgImage?.name?.length > 0
                                      ? `url(${URL.createObjectURL(bgImage)})`
                                      : "",
                                  margin: "4px",
                                  position: "relative",
                                  overflow: "hidden"
                                  //  display: design.designCategory !== "design" ? "none" : ""
                                }}
                              >
                                {design.content.map((content, i) => {
                                  return content.component === "image" ? (
                                    <img
                                      key={i}
                                      src={content.photo}
                                      alt=""
                                      style={{
                                        width: `${content.size}%`,
                                        position: "absolute",
                                        top: `${content.position.top}%`,
                                        left: `${content.position.left}%`,
                                        transform: content.transform
                                      }}
                                    />
                                  ) : content.component === "text" ? (
                                    <span
                                      style={{
                                        position: "absolute",
                                        top: `${content.position.top}%`,
                                        left: `${content.position.left}%`,
                                        // textShadow: content.shadow,
                                        lineHeight: 1.1,
                                        color: content.fontcolor,
                                        wordWrap: "break-word",
                                        whiteSpace: "pre-wrap",
                                        display: content.isDeleted
                                          ? "none"
                                          : "",
                                        textShadow: `${content.fontShadow}px ${content.fontShadow}px black`,
                                        fontWeight: content.bold
                                          ? "bold"
                                          : "normal",
                                        fontStyle: content.italic
                                          ? "italic"
                                          : "normal",
                                        textDecoration: content.underline
                                          ? "underline"
                                          : "none"
                                      }}
                                    >
                                      {content.txt}
                                    </span>
                                  ) : content.component == "qrcode" ? (
                                    <QRCode
                                      key={i}
                                      value={content.value}
                                      size={content.size}
                                      bgColor={content.background}
                                      fgColor={content.color}
                                      style={{
                                        position: "absolute",
                                        top: `${content.position.top}%`,
                                        left: `${content.position.left}%`
                                      }}
                                    />
                                  ) : (
                                    ""
                                  );
                                })}
                              </div>
                            ) : (
                              ""
                            )}
                          </>
                        );
                      })
                    : ""}
                </div>
              </DrawerHeader>
              <DrawerFooter>
                <DrawerClose>
                  <button className="text-xs font-semibold">Close</button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        ) : (
          ""
        )}

        {showElements ? (
          <Drawer open={showElements} onOpenChange={setshowElements}>
            <DrawerContent>
              <div
                className="w-full md:w-[40%] mx-auto"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  flex: 1,
                  alignItems: "flex-start",
                  justifyContent: "center",
                  overflowY: "scroll",
                  minHeight: "40vh",
                  paddingBottom: "16px"
                }}
              >
                <MaterialUIIcons
                  undoRedoFunc={undoRedoFunc}
                  setcontent={setcontent}
                  content={content}
                  setshowElements={setshowElements}
                ></MaterialUIIcons>
              </div>
              <DrawerFooter>
                <DrawerClose>
                  <button className="text-xs font-semibold">Close</button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        ) : (
          ""
        )}
      </div>
      {/* <nav
        style={{ zIndex: 999, borderBottom: "1px solid rgb(220,220,220)" }}
        className="bg-white   w-full sticky top-0 h-[56px]" >
      </nav> */}

      <div className="h-screen dark:text-white">
        <NavDesign
          format={format}
          handleDownload={handleDownload}
          handleDownloadGif={handleDownloadGif}
          isPreset={isPreset}
          deletePreset={deletePreset}
          savePreset={savePreset}
          canvasStyles={canvasStyles}
          setCanvasStyles={setCanvasStyles}
          divRef={divRef}
          setCanvasWidth={setCanvasWidth}
          setCanvasHeight={setCanvasHeight}
          undoRedoFunc={undoRedoFunc}
          undoHistory={undoHistory}
          redoHistory={redoHistory}
          setclicks={setclicks}
          clicks={clicks}
          setcontent={setcontent}
          setRedoHistory={setRedoHistory}
          setUndoHistory={setUndoHistory}
          mainState={mainState}
          settransform={settransform}
          setbr={setbr}
          setshadow={setshadow}
          setframe={setframe}
          setpdng={setpdng}
          setimg={setimg}
          setgradientColor={setgradientColor}
          setMainState={setMainState}
          setcustomGrad={setcustomGrad}
          designprops={designprops}
        />

        <div
          id="maindiv"
          className="flex flex-col sm:flex-row  overflow-auto bg-[#f5f5f5] dark:bg-[#141414]"
          style={{ minHeight: "calc(100vh - 56px)" }}
        >
          <AsideBarDesign
            setshowTemplates={setshowTemplates}
            undoRedoFunc={undoRedoFunc}
            setcontent={setcontent}
            content={content}
            canvasWidth={canvasWidth}
            imgref={imgref}
            setshowElements={setshowElements}
          />

          <div className="flex justify-center items-center py-4 w-full">
            <div
              id="ss"
              onPaste={handlePaste}
              className={`ssMain shadow-lg ${
                parseFloat(eval(canvasStyles.aspectRatio)) < 1
                  ? "md:w-2/6"
                  : "md:w-3/5"
              }`}
              onClick={() => {
                // console.log(currentActive)
                setcurrentActive("");
                document.body.style.overflow = "auto";

                // background - color: #e5e5f7;
                // opacity: 0.8;
                // background-image:  repeating-radial-gradient( circle at 0 0, transparent 0, #e5e5f7 10px ), repeating-linear-gradient( #444cf755, #444cf7 );
              }}
              ref={divRef}
              lg={parseFloat(eval(canvasStyles.aspectRatio)) < 1 ? 3 : 5}
              md={parseFloat(eval(canvasStyles.aspectRatio)) < 1 ? 3 : 6}
              xs={parseFloat(eval(canvasStyles.aspectRatio)) < 1 ? 1 : 1}
              style={{
                padding: `${pdng}rem`,
                margin: "0px",
                background:
                  canvasStyles.bgtheme === "gradient" ||
                  canvasStyles.bgtheme === "solid"
                    ? gradientColor
                    : canvasStyles.bgtheme === "image" &&
                      custombgImage === false
                    ? `url(/test${canvasStyles.currentImg}.webp)`
                    : canvasStyles.bgtheme === "image" &&
                      custombgImage &&
                      bgImage?.name?.length > 0
                    ? `url(${URL.createObjectURL(bgImage)})`
                    : "",
                position: "relative",
                backgroundSize: "contain",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                aspectRatio: canvasStyles.aspectRatio,

                filter: !modalIsOn
                  ? `brightness(${canvasStyles.canvasFilters.brightness}) contrast(${canvasStyles.canvasFilters.contrast}) grayscale(${canvasStyles.canvasFilters.grayscale}) blur(${canvasStyles.canvasFilters.blur}px) hue-rotate(${canvasStyles.canvasFilters.hueRotate}deg) invert(${canvasStyles.canvasFilters.invert})  opacity(${canvasStyles.canvasFilters.opacity}) saturate(${canvasStyles.canvasFilters.saturate}) sepia(${canvasStyles.canvasFilters.sepia})`
                  : "",
                overflow: "",
                opacity: dwGif ? opacity : 1
              }}
            >
              <input
                type="file"
                accept="image/webp,image/png, image/jpg, image/jpeg,image/jfif"
                style={{ display: "none" }}
                ref={imgref}
                onChange={(e) => {
                  const file = e.target.files[0];
                  const reader = new FileReader();

                  reader.onload = function (event) {
                    // Get the data URL from the reader
                    const dataURL = event.target.result;

                    // Add the object with the data URL to the content array
                    undoRedoFunc();
                    setcontent([
                      ...content,
                      {
                        photo: dataURL,
                        id: Date.now(),
                        isDeleted: false,
                        shadow: "20",
                        scolor: "#686767",
                        // br: Math.ceil((16 / canvasWidth) * 100),
                        br: 1,
                        frame: "none",
                        size: 50,
                        transform:
                          "translate(-50%,-50%) perspective(500px) rotateY(0deg) rotateX(0deg)",
                        component: "image",
                        // position: { left: canvasWidth / 2, top: canvasHeight / 2 },
                        position: { left: 50, top: 50 }
                      }
                    ]);

                    setTimeout(() => {
                      const element = document.getElementById("imgdiv");
                      if (element) {
                        const width = element.clientWidth;
                        setmaxbr(width / 2);
                      }
                    }, 100);
                  };

                  // Read the file as a data URL
                  reader.readAsDataURL(file);
                }}
              />
              {content.length > 0 ? (
                content.map((item, i) => {
                  return item.component === "image" ? (
                    <ImageComponent
                      dm={dm}
                      key={item.id}
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
                      setimg={setimg}
                      img={img}
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
                      clicks={clicks}
                    />
                  ) : item.component === "text" ? (
                    <Text
                      dm={dm}
                      key={item.id}
                      text={item}
                      setcurrentActive={setcurrentActive}
                      setcurrentTag={setcurrentTag}
                      currentActive={currentActive}
                      id={item.id}
                      undoRedoFunc={undoRedoFunc}
                      setcontent={setcontent}
                      content={content}
                      downloading={downloading}
                      index={i}
                      canvasHeight={canvasHeight}
                      canvasWidth={canvasWidth}
                    />
                  ) : item.component === "qrcode" ? (
                    <QrCode
                      dm={dm}
                      key={item.id}
                      qrcode={item}
                      setcurrentActive={setcurrentActive}
                      setcurrentTag={setcurrentTag}
                      currentActive={currentActive}
                      id={item.id}
                      undoRedoFunc={undoRedoFunc}
                      setcontent={setcontent}
                      content={content}
                      downloading={downloading}
                      canvasHeight={canvasHeight}
                      canvasWidth={canvasWidth}
                      index={i}
                    />
                  ) : item.component === "icon" ? (
                    <Icon
                      dm={dm}
                      key={item.id}
                      icon={item}
                      setcurrentActive={setcurrentActive}
                      setcurrentTag={setcurrentTag}
                      currentActive={currentActive}
                      id={item.id}
                      undoRedoFunc={undoRedoFunc}
                      setcontent={setcontent}
                      content={content}
                      downloading={downloading}
                      index={i}
                      canvasHeight={canvasHeight}
                      canvasWidth={canvasWidth}
                      iconName={item.value}
                    />
                  ) : item.component === "code" ? (
                    <Code
                      dm={dm}
                      key={item.id}
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
                      setimg={setimg}
                      img={img}
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
                      clicks={clicks}
                    />
                  ) : (
                    ""
                  );
                })
              ) : (
                <div className="flex justify-center">
                  <div
                    className="px-4 py-6 md:p-6 lg:h-[400px] lg:w-[400px] flex flex-col items-center justify-center cursor-pointer text-center bg-gray-100 text-black dark:bg-gray-900 dark:text-white rounded-xl border border-gray-300 dark:border-gray-600 hover:shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out"
                    onClick={() => {
                      imgref.current.click();
                    }}
                  >
                    <Image className="mt-2 mb-4" size={48} />
                    <p className="text-lg font-semibold">Add Your Image</p>
                    <div className="mt-2">
                      <span className="bg-gray-200 dark:bg-gray-700 dark:text-white text-black px-2 py-1 rounded-md text-sm font-medium">
                        Ctrl+V
                      </span>{" "}
                      to Paste
                    </div>
                  </div>
                </div>
              )}

              <Watermark
                dm={dm}
                showWatermark={showWatermark}
                setshowWatermark={setshowWatermark}
                setmodalIsOn={setmodalIsOn}
                setshowLoginModal={setshowLoginModal}
                setshowPremiumModal={setshowPremiumModal}
              />
            </div>
          </div>

          <EditOptionsDesign
            tab={tab}
            showWatermark={showWatermark}
            username={username}
            settab={settab}
            content={content}
            setcurrentActive={setcurrentActive}
            currentActive={currentActive}
            dm={dm}
            canvasStyles={canvasStyles}
            quality={quality}
            format={format}
            planType={planType}
            setshowLoginModal={setshowLoginModal}
            setshowPremiumModal={setshowPremiumModal}
            setquality={setquality}
            setformat={setformat}
            handleFilterChange={handleFilterChange}
            setfilename={setfilename}
            filename={filename}
            setCanvasStyles={setCanvasStyles}
            setbr={setbr}
            setshadow={setshadow}
            setframe={setframe}
            setpdng={setpdng}
            setcontent={setcontent}
            setMainState={setMainState}
            customGrad={customGrad}
            setcustomGrad={setcustomGrad}
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
            undoRedoFunc={undoRedoFunc}
            showExtra={showExtra}
            setshowExtra={setshowExtra}
            handleColorChange={handleColorChange}
            gradients={gradients}
            gradientColor={gradientColor}
            bgimgref={bgimgref}
            bgImage={bgImage}
            setbgImage={setbgImage}
            setcustombgImage={setcustombgImage}
            solidColors={solidColors}
            isIOS={isIOS}
            isSafari={isSafari}
            onDragEnd={onDragEnd}
            designprops={designprops}
            setimg={setimg}
            currentTag={currentTag}
            canvasWidth={canvasWidth}
            custombgImage={custombgImage}
          ></EditOptionsDesign>
        </div>
      </div>
    </>
  );
}
