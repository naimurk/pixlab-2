import domtoimage from "dom-to-image";
import { useRef, useState } from "react";
import { MdFileDownload, MdOutlineLensBlur } from "react-icons/md";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import HandyFreeTools from "../Tools/HandyFreeTools";
import Footer from "../../Components/shared/footer/Footer";
const BlurImage = () => {
  const [blur, setBlur] = useState(0);
  const [img, setImg] = useState("");
  const [downloading, setDownloading] = useState(false);
  const imgRef = useRef();
  const divRef = useRef();
  const [showBlurModal, setShowBlurModal] = useState(false);
  const [crop, setCrop] = useState({ aspect: 16 / 9 });
  const [image, setImage] = useState(null);
  const [blurDensity, setBlurDensity] = useState(10);
  const [reverseBlur, setReverseBlur] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    const node = document.getElementById("ss");

    const generateImage = async () => {
      try {
        const dataUrl = await domtoimage.toPng(node, {
          quality: 1,
          width: node.offsetWidth * 2,
          height: node.offsetHeight * 2,
          style: {
            transform: "scale(2)",
            transformOrigin: "top left",
            width: node.offsetWidth + "px",
            height: node.offsetHeight + "px",
          },
        });
        const downloadLink = document.createElement("a");
        downloadLink.download = `pixlab_${Date.now()}.png`;
        downloadLink.href = dataUrl;
        downloadLink.click();
      } catch (error) {
        console.error("Error capturing screenshot:", error);
      } finally {
        setDownloading(false);
      }
    };

    generateImage();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImg(e.target.files[0]);
    }
  };

  const blurImageNow = () => {
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(image, 0, 0);

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    if (reverseBlur) {
      ctx.filter = `blur(${Number(blurDensity)}px)`;
      ctx.drawImage(image, 0, 0);
    }

    const selectedCanvas = document.createElement("canvas");
    selectedCanvas.width = crop.width * scaleX;
    selectedCanvas.height = crop.height * scaleY;
    const selectedCtx = selectedCanvas.getContext("2d");

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

    if (!reverseBlur) {
      selectedCtx.filter = `blur(${Number(blurDensity)}px)`;
      for (let i = 0; i < 3; i++) {
        selectedCtx.drawImage(selectedCanvas, 0, 0);
      }
    }

    const imageData = selectedCtx.getImageData(
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    ctx.putImageData(imageData, crop.x * scaleX, crop.y * scaleY);

    const base64Image = canvas.toDataURL("image/png");
    setImg(base64Image);
    setShowBlurModal(false);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Blur & Redact Image Tool
        </h1>

        <div className="flex flex-col items-center space-y-4 w-full max-w-md">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={imgRef}
            onChange={handleFileChange}
          />

          <div className="flex space-x-2">
            <button
              onClick={handleDownload}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
              disabled={!img}
            >
              Save <MdFileDownload className="ml-2" />
            </button>
            {img && (
              <button
                onClick={() => setShowBlurModal(true)}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center"
              >
                Blur & Redact <MdOutlineLensBlur className="ml-2" />
              </button>
            )}
          </div>

          <div
            ref={divRef}
            onClick={() => imgRef.current.click()}
            className="mx-auto border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
          >
            {img ? (
              <img
                id="ss"
                src={typeof img === "string" ? img : URL.createObjectURL(img)}
                alt="Uploaded image"
                className="max-w-full"
                style={{ filter: `blur(${blur}px)` }}
              />
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                Click to upload or drag and drop your image here
              </p>
            )}
          </div>

          <div className="w-full">
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
              Blur: {blur}px
            </label>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={blur}
              onChange={(e) => setBlur(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        {showBlurModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 overflow-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-auto">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                Blur & Redact Image
              </h2>
              <ReactCrop
                crop={crop}
                onChange={setCrop}
                className="max-w-full mb-4"
              >
                <img
                  src={typeof img === "string" ? img : URL.createObjectURL(img)}
                  onLoad={(e) => setImage(e.target)}
                  alt="Image to blur"
                />
              </ReactCrop>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                  Blur Density: {blurDensity}px
                </label>
                <input
                  type="range"
                  min="3"
                  max="30"
                  value={blurDensity}
                  onChange={(e) => setBlurDensity(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="mb-4">
                <label className="flex items-center text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={reverseBlur}
                    onChange={() => setReverseBlur(!reverseBlur)}
                    className="mr-2"
                  />
                  Reverse Blur (blurs everything except the selected part)
                </label>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowBlurModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={blurImageNow}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Apply Blur
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <section className="bg-white dark:bg-gray-800 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
            About the Blur Image Tool
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Our Blur Image Tool allows you to easily add a creative touch to
            your images by blurring the entire image or specific parts of it.
            Whether you&apos;re looking to create a focal point, protect
            sensitive information, or just add an artistic effect, our tool
            provides a simple and effective solution.
          </p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Key Features:
          </h3>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6">
            <li>Upload any image and apply a blur effect</li>
            <li>Adjust blur intensity for the entire image</li>
            <li>Select specific areas to blur or keep in focus</li>
            <li>Reverse blur option for creative effects</li>
            <li>Easy-to-use interface with real-time preview</li>
            <li>Download your blurred image in high quality</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300">
            Whether you&apos;re a professional designer or just looking to
            enhance your social media posts, our Blur Image Tool provides the
            flexibility and ease of use you need to create stunning visual
            effects.
          </p>
        </div>
      </section>

      <div className="mt-8">
        <HandyFreeTools toolsTitle={"You might also like"} />
      </div>

      <Footer />
    </>
  );
};

export default BlurImage;
