import React, { useState } from "react";
import { HexAlphaColorPicker } from "react-colorful";
import { MdContentCopy } from "react-icons/md";
import { toast } from "react-toastify";
import HandyFreeTools from "../Tools/HandyFreeTools";
import Footer from "../../Components/shared/footer/Footer";
export default function ColorPicker() {
  const [color, setColor] = useState("#aabbcc");
  const [inputValue, setInputValue] = useState(color);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    if (/^#([0-9A-F]{3}){1,2}$/i.test(value)) {
      setColor(value);
    }
  };

  const handleCopyClick = (value) => {
    navigator.clipboard.writeText(value);
    toast.success("Copied", {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const hexToRgb = (hex) => {
    // Remove the hash at the start if it's there
    hex = hex.replace(/^#/, "");

    let r,
      g,
      b,
      a = 1;

    if (hex.length === 6) {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    } else if (hex.length === 8) {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
      a = parseInt(hex.substring(6, 8), 16) / 255;
    } else {
      return null; // Invalid format
    }

    if (a === 1) {
      return `rgb(${r}, ${g}, ${b})`;
    } else {
      return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
    }
  };

  return (
    <>
      <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            Color Picker
          </h1>

          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <div className="mb-6">
              <HexAlphaColorPicker
                color={color}
                onChange={setColor}
                className="mx-auto"
              />
            </div>

            <div className="mb-4">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div className="flex justify-center space-x-4">
              <button
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => handleCopyClick(color)}
              >
                Copy Hex <MdContentCopy className="ml-2" />
              </button>
              <button
                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                onClick={() => handleCopyClick(hexToRgb(color))}
              >
                Copy RGB <MdContentCopy className="ml-2" />
              </button>
            </div>
          </div>

          <section className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              About Color Picker
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Our Color Picker tool allows you to easily select and experiment
              with colors for your design projects. Whether you&apos;re a web
              designer, graphic artist, or just someone who loves playing with
              colors, our tool provides an intuitive interface for finding the
              perfect shade.
            </p>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Key Features:
            </h3>
            <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300">
              <li>
                Interactive color picker with hue, saturation, and lightness
                controls
              </li>
              <li>Real-time color preview</li>
              <li>Hex and RGB color code support</li>
              <li>Easy copy-to-clipboard functionality</li>
              <li>
                Dark mode support for comfortable use in low-light environments
              </li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              Start by selecting your color using the picker, then copy either
              the Hex or RGB value to use in your projects. It&apos;s that
              simple to find and use the perfect color!
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
