import React, { useRef, useState } from "react";
import { MdFileDownload, MdFileUpload } from "react-icons/md";
import { toast } from "react-toastify";
import HandyFreeTools from "../Tools/HandyFreeTools";
import Footer from "../../Components/shared/footer/Footer";
export default function ImageResizer() {
  const [image, setImage] = useState(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setImage(img);
          setWidth(img.width);
          setHeight(img.height);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleResize = () => {
    if (image && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0, width, height);
    }
  };

  const handleDownload = () => {
    handleResize();
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL();
      const link = document.createElement("a");
      link.download = `resized-image-${new Date().toISOString()}.png`;
      link.href = dataUrl;
      link.click();
      toast.success("Image downloaded successfully", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            Image Resizer
          </h1>

          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <div className="mb-6">
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
              <div
                onClick={() => fileInputRef.current.click()}
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
              >
                {image ? (
                  <img
                    src={image.src}
                    alt="Uploaded image"
                    className="max-w-full h-auto mx-auto"
                  />
                ) : (
                  <div className="text-gray-500 dark:text-gray-400">
                    <MdFileUpload className="mx-auto text-4xl mb-2" />
                    <p>Click to upload or drag and drop your image here</p>
                  </div>
                )}
              </div>
            </div>

            {image && (
              <>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="width"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Width (px)
                    </label>
                    <input
                      type="number"
                      id="width"
                      value={width}
                      onChange={(e) => setWidth(Number(e.target.value))}
                      className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="height"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Height (px)
                    </label>
                    <input
                      type="number"
                      id="height"
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={handleDownload}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Download Resized Image <MdFileDownload className="ml-2" />
                  </button>
                </div>
              </>
            )}
            <canvas ref={canvasRef} className="hidden" />
          </div>

          <section className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              About Image Resizer
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Our Image Resizer tool allows you to upload an image and resize it
              to any width and height in pixels. Whether you need to adjust
              images for web use, social media, or print, this tool provides an
              easy and effective way to get the perfect size.
            </p>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Key Features:
            </h3>
            <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300">
              <li>Upload images in various formats</li>
              <li>Specify exact width and height in pixels</li>
              <li>Real-time image resizing</li>
              <li>Download the resized image in PNG format</li>
              <li>Dark mode support for comfortable use</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              Start by uploading your image and setting the desired dimensions.
              The tool will resize the image, allowing you to download it
              quickly and easily. Perfect for optimizing images for any purpose!
            </p>
          </section>
        </div>
      </main>

      <div className="mt-8">
        <HandyFreeTools toolsTitle={"You might also like"} />
      </div>

      <Footer />
    </>
  );
}
