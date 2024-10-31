import domtoimage from "dom-to-image";
import { useRef, useState } from "react";
import { MdFileDownload, MdOutlineCrop } from "react-icons/md";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import HandyFreeTools from "../Tools/HandyFreeTools";
import Footer from "../../Components/shared/footer/Footer";
const CropImageTool = () => {
  const [img, setImg] = useState("");
  const [downloading, setDownloading] = useState(false);
  const imgRef = useRef();
  const divRef = useRef();
  const [showCropModal, setShowCropModal] = useState(false);
  const [crop, setCrop] = useState({ aspect: 16 / 9 });
  const [image, setImage] = useState(null);

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
      setShowCropModal(true);
    }
  };

  const cropImageNow = () => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const base64Image = canvas.toDataURL("image/png");
    setImg(base64Image);
    setShowCropModal(false);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Crop Image Tool
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
                onClick={() => setShowCropModal(true)}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center"
              >
                Crop <MdOutlineCrop className="ml-2" />
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
                className="max-w-full "
              />
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                Click to upload or drag and drop your image here
              </p>
            )}
          </div>
        </div>

        {showCropModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 overflow-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-auto">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                Crop Image
              </h2>
              <ReactCrop
                crop={crop}
                onChange={setCrop}
                className="max-w-full mb-4"
              >
                <img
                  src={typeof img === "string" ? img : URL.createObjectURL(img)}
                  onLoad={(e) => setImage(e.target)}
                  alt="Image to crop"
                />
              </ReactCrop>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowCropModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={cropImageNow}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Apply Crop
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <section className="bg-white dark:bg-gray-800 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
            About the Crop Image Tool
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Our Crop Image Tool allows you to easily resize and crop your images
            with precision. Whether you&apos;re preparing images for social
            media posts, creating profile pictures, or just want to focus on a
            specific part of an image, our tool provides a simple and effective
            solution.
          </p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Key Features:
          </h3>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6">
            <li>Upload any image and crop it to your desired size</li>
            <li>Intuitive interface for easy selection of crop area</li>
            <li>Maintain aspect ratio or freely crop as needed</li>
            <li>Preview your crop in real-time</li>
            <li>Download your cropped image in high quality</li>
            <li>Perfect for social media posts, profile pictures, and more</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300">
            Whether you&apos;re a professional designer or just looking to
            enhance your personal photos, our Crop Image Tool provides the
            flexibility and ease of use you need to create perfectly sized
            images for any purpose.
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

export default CropImageTool;
