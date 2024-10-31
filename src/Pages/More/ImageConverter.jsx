import domtoimage from "dom-to-image";
import React, { useEffect, useRef, useState } from "react";
import { MdFileDownload } from "react-icons/md";
import HandyFreeTools from "../Tools/HandyFreeTools";
import Footer from "../../Components/shared/footer/Footer";
export default function ImageConverter() {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const [imageData, setImageData] = useState(null);
  const [imageType, setImageType] = useState("webp");

  useEffect(() => {
    if (imageData && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.drawImage(imageData, 0, 0);
    }
  }, [imageData]);

  const handleImageUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setImageData(img);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleImageDownload = () => {
    const node = document.getElementById("image-preview");
    const conversionMethods = {
      png: domtoimage.toPng,
      jpeg: domtoimage.toJpeg,
      svg: domtoimage.toSvg,
      webp: convertImageToWebP,
    };

    conversionMethods[imageType](node).then((dataUrl) => {
      downloadImage(dataUrl, `image.${imageType}`);
    });
  };

  const convertImageToWebP = (node) => {
    return domtoimage.toPng(node).then((dataUrl) => {
      return new Promise((resolve) => {
        const image = new Image();
        image.src = dataUrl;
        image.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = image.naturalWidth;
          canvas.height = image.naturalHeight;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(image, 0, 0);
          canvas.toBlob((blob) => {
            resolve(URL.createObjectURL(blob));
          }, "image/webp");
        };
      });
    });
  };

  const downloadImage = (dataUrl, filename) => {
    const link = document.createElement("a");
    link.download = filename;
    link.href = dataUrl;
    link.click();
  };

  return (
    <>
      <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            Image Converter
          </h1>

          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Upload an Image
              </h2>
              <input
                ref={imgRef}
                type="file"
                onChange={handleImageUpload}
                className="hidden"
                accept="image/*"
              />
              <div
                onClick={() => imgRef.current.click()}
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors w-fit mx-auto"
              >
                {imageData ? (
                  <canvas
                    id="image-preview"
                    ref={canvasRef}
                    width={imageData.width}
                    height={imageData.height}
                    className="max-w-full"
                  />
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    Click to upload or drag and drop your image here
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-4 sm:mb-0">
                <label
                  htmlFor="imageType"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Convert To:
                </label>
                <select
                  id="imageType"
                  value={imageType}
                  onChange={(e) => setImageType(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="webp">WebP</option>
                  <option value="png">PNG</option>
                  <option value="jpeg">JPEG</option>
                  <option value="svg">SVG</option>
                </select>
              </div>
              <button
                onClick={handleImageDownload}
                disabled={!imageData}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Download <MdFileDownload className="ml-2" />
              </button>
            </div>
          </div>

          <section className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              About Image Converter
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Our Image Converter tool allows you to easily convert your images
              between different formats, including WebP, PNG, JPEG, and SVG.
              Whether you need to optimize your images for web use or ensure
              compatibility with various software, our converter has got you
              covered.
            </p>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Key Features:
            </h3>
            <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300">
              <li>Support for WebP, PNG, JPEG, and SVG formats</li>
              <li>Easy-to-use interface with drag-and-drop functionality</li>
              <li>Fast and efficient conversion process</li>
              <li>No file size limits</li>
              <li>
                Secure and private - your images are processed locally in your
                browser
              </li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              Start by uploading your image, select your desired output format,
              and click the download button. It&apos;s that simple to convert
              your images to the format you need!
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
