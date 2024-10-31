import { useEffect, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export default function BlurImage({
  _img,
  setshowBlurModal,
  content,
  id,
  setcontent,
  dm
}) {
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({ aspect: 16 / 9 });
  const [image, setImage] = useState(null);
  const [output, setOutput] = useState(null);
  const [blurDensity, setblurDensity] = useState(10);
  const [revereseBlur, setrevereseBlur] = useState(false);

  const [isIOS, setIsIOS] = useState(false);
  const [isSafari, setIsSafari] = useState(false);
  const [filename, setfilename] = useState("pixlab");

  useEffect(() => {
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
  const selectImage = (file) => {
    setSrc(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (_img.name) {
      setSrc(URL.createObjectURL(_img));
    } else if (_img) {
      setSrc(_img);
    }
  }, []);

  function onLoad(event) {
    const img = event.target;
    setImage(img);
  }

  const blurImageNow = () => {
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const ctx = canvas.getContext("2d");

    // Draw the original image on the canvas
    ctx.drawImage(image, 0, 0);

    // Calculate the scale factors
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    // Apply blur to the entire canvas if reverse blur is selected
    if (revereseBlur) {
      ctx.filter = `blur(${Number(blurDensity)}px)`;
      ctx.drawImage(image, 0, 0);
    }

    // Create a second canvas for the selected area
    const selectedCanvas = document.createElement("canvas");
    selectedCanvas.width = crop.width * scaleX;
    selectedCanvas.height = crop.height * scaleY;
    const selectedCtx = selectedCanvas.getContext("2d");

    // Draw the selected area of the original image onto the second canvas
    selectedCtx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    // Apply the blur filter to the selected area if reverse blur is not selected
    if (!revereseBlur) {
      selectedCtx.filter = `blur(${Number(blurDensity)}px)`;
      for (let i = 0; i < 3; i++) {
        // Apply blur 3 times
        selectedCtx.drawImage(selectedCanvas, 0, 0);
      }
    }

    // Get the pixel data from the second canvas
    const imageData = selectedCtx.getImageData(
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    // Put the pixel data onto the main canvas at the position of the selected area
    ctx.putImageData(imageData, crop.x * scaleX, crop.y * scaleY);

    // Converting to base64
    const base64Image = canvas.toDataURL("image/png");
    setOutput(base64Image);

    let arr = content.map((item) =>
      item.id === id
        ? {
            ...item,
            photo: base64Image
          }
        : item
    );

    setcontent(arr);
    setshowBlurModal(false);
  };

  return (
    <div className="App ">
      {src && (
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <ReactCrop
            style={{ width: "90%", margin: "0 auto" }}
            crop={crop}
            onChange={(c) => setCrop(c)}
          >
            <img onLoad={onLoad} src={src} />
          </ReactCrop>
        </div>
      )}
      <div
        style={{
          marginBottom: 0,
          fontWeight: "500",
          display: "flex",
          alignItems: "center",
          marginTop: "24px"
        }}
      >
        <span style={{ color: dm ? "black" : "black", marginRight: "8px" }}>
          Blur Density
        </span>

        <input
          className="range accent-gray-600"
          type="range"
          defaultValue={10}
          min="3"
          max="30"
          step="1"
          id="roundness"
          value={blurDensity}
          onChange={(e) => setblurDensity(e.target.value)}
        />
      </div>
      <div
        style={{
          color: dm ? "black" : "black",
          marginBottom: 0,
          fontWeight: "500",
          display: "flex",
          alignItems: "center",
          marginTop: "12px"
        }}
      >
        {/* <MDBSwitch style={{ color: dm ? "black" : "black" }} checked={revereseBlur}  id='revereseBlur' label='Reverse Blur (blurs everything except the selected part)' /> */}

        <div className="flex items-center">
          <input
            onChange={() => setrevereseBlur(!revereseBlur)}
            id="checked-checkbox"
            type="checkbox"
            value=""
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="checked-checkbox"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Reverse Blur (blurs everything except the selected part)
          </label>
        </div>
      </div>

      <button
        onClick={() => setshowBlurModal(false)}
        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mb-4 cursor-pointer mt-4 mr-4 "
      >
        Cancel
      </button>
      <button
        onClick={blurImageNow}
        className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mb-4 cursor-pointer mt-4 mr-4 "
      >
        Save changes
      </button>
    </div>
  );
}
