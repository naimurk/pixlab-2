import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import HandyFreeTools from "../Tools/HandyFreeTools";
import Footer from "../../Components/shared/footer/Footer";
export default function ImageColorPicker() {
  const [colorFormat, setColorFormat] = useState("hex");
  const [palette, setPalette] = useState([]);
  const [image, setImage] = useState(null);
  const [paletteSize, setPaletteSize] = useState(10);
  const [excludeDarkLight, setExcludeDarkLight] = useState(true);
  const [dominantColor, setDominantColor] = useState(null);
  const canvasRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (image && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      const { colors, dominant } = extractColorsFromCanvas(
        ctx,
        image.width,
        image.height,
        colorFormat,
        paletteSize,
        excludeDarkLight
      );
      setPalette(colors);
      setDominantColor(dominant);
    }
  }, [image, colorFormat, paletteSize, excludeDarkLight]);

  const extractColorsFromCanvas = (
    ctx,
    width,
    height,
    format,
    size,
    excludeDarkLight
  ) => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const colorMap = {};
    const step = Math.max(1, Math.floor((width * height) / 20000));

    for (let i = 0; i < data.length; i += 4 * step) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      if (a < 128) continue;

      if (excludeDarkLight) {
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        if (brightness < 30 || brightness > 225) continue;
      }

      const quantizedColor = quantizeColor(r, g, b);
      const color = formatColor(
        quantizedColor.r,
        quantizedColor.g,
        quantizedColor.b,
        format
      );
      colorMap[color] = (colorMap[color] || 0) + 1;
    }

    const sortedColors = Object.entries(colorMap).sort((a, b) => b[1] - a[1]);

    const dominantColor = sortedColors[0][0];

    const finalPalette = [];
    for (const [color, _] of sortedColors) {
      if (isColorDifferentEnough(color, finalPalette, format)) {
        finalPalette.push(color);
      }
      if (finalPalette.length >= size) break;
    }

    return { colors: finalPalette, dominant: dominantColor };
  };

  const quantizeColor = (r, g, b) => {
    const factor = 16; // Reduced quantization factor for more color variety
    return {
      r: Math.round(r / factor) * factor,
      g: Math.round(g / factor) * factor,
      b: Math.round(b / factor) * factor,
    };
  };

  const isColorDifferentEnough = (color, palette, format) => {
    const threshold = 25; // Slightly reduced threshold for more color variety
    for (const existingColor of palette) {
      if (calculateColorDifference(color, existingColor, format) < threshold) {
        return false;
      }
    }
    return true;
  };

  const calculateColorDifference = (color1, color2, format) => {
    const rgb1 = format === "hex" ? hexToRgb(color1) : parseRgb(color1);
    const rgb2 = format === "hex" ? hexToRgb(color2) : parseRgb(color2);

    // Using CIEDE2000 color difference formula for better perceptual difference
    const lab1 = rgbToLab(rgb1.r, rgb1.g, rgb1.b);
    const lab2 = rgbToLab(rgb2.r, rgb2.g, rgb2.b);
    return deltaE(lab1, lab2);
  };

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const parseRgb = (rgb) => {
    const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return match
      ? {
          r: parseInt(match[1]),
          g: parseInt(match[2]),
          b: parseInt(match[3]),
        }
      : null;
  };

  const formatColor = (r, g, b, format) => {
    if (format === "hex") {
      return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }
    return `rgb(${r},${g},${b})`;
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setImage(img);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleImageChange = () => {
    if (inputRef.current) {
      inputRef.current.click(); // Trigger the file input click
    }
  };

  const rgbToLab = (r, g, b) => {
    // Convert RGB to XYZ
    let x = r * 0.4124 + g * 0.3576 + b * 0.1805;
    let y = r * 0.2126 + g * 0.7152 + b * 0.0722;
    let z = r * 0.0193 + g * 0.1192 + b * 0.9505;

    // Normalize for D65 white point
    x /= 95.047;
    y /= 100.0;
    z /= 108.883;

    x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
    y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
    z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;

    return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
  };

  const deltaE = (lab1, lab2) => {
    const [L1, a1, b1] = lab1;
    const [L2, a2, b2] = lab2;
    const dL = L2 - L1;
    const da = a2 - a1;
    const db = b2 - b1;
    const C1 = Math.sqrt(a1 * a1 + b1 * b1);
    const C2 = Math.sqrt(a2 * a2 + b2 * b2);
    const dC = C2 - C1;
    const dH = Math.sqrt(da * da + db * db - dC * dC);
    const sL = 1;
    const sC = 1 + 0.045 * C1;
    const sH = 1 + 0.015 * C1;
    return Math.sqrt(
      Math.pow(dL / sL, 2) + Math.pow(dC / sC, 2) + Math.pow(dH / sH, 2)
    );
  };

  return (
    <>
      <main className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            Image Color Picker
          </h1>

          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Upload an Image
              </h2>
              <input
                ref={inputRef} // Use the new ref for file input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
              <div
                onClick={handleImageChange}
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
              >
                {image ? (
                  <canvas
                    ref={canvasRef}
                    className="max-w-full h-auto mx-auto"
                  />
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    Click to upload or drag and drop your image here
                  </p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="paletteSize"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Palette Size: {paletteSize}
              </label>

              <input
                name="paletteSize"
                className="range  accent-gray-600"
                type="range"
                id="paletteSize"
                min="5"
                max="20"
                value={paletteSize}
                onChange={(e) => setPaletteSize(parseInt(e.target.value))}
              />
            </div>

            <div class="flex items-center">
              <label className="inline-flex items-center my-4  cursor-pointer relative">
                <input
                  checked={excludeDarkLight}
                  onChange={() => setExcludeDarkLight(!excludeDarkLight)}
                  id="showWatermark"
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                />
                <div className="relative w-9 h-5 bg-gray-200  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all  peer-checked:bg-teal-600"></div>
                <span className="ms-3 text-sm font-medium  ">
                  Exclude very dark and light colors
                </span>
              </label>
            </div>

            {dominantColor && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Dominant Color:
                </h3>
                <div
                  style={{ backgroundColor: dominantColor }}
                  className="w-16 h-16 rounded-md cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(color);
                    toast.success("Color copied to clipboard!", {
                      position: "top-left",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: false,
                      pauseOnHover: true,
                      draggable: true,
                      theme: "dark",
                    });
                  }}
                ></div>
                <span className="text-sm text-gray-600 dark:text-gray-400 mt-1 block">
                  {dominantColor}
                </span>
              </div>
            )}

            {palette.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Extracted Color Palette:
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {palette.map((color, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        style={{ backgroundColor: color }}
                        className="w-16 h-16 rounded-md cursor-pointer transition-transform hover:scale-110"
                        onClick={() => {
                          navigator.clipboard.writeText(color);
                          toast.success("Color copied to clipboard!", {
                            position: "top-left",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            theme: "dark",
                          });
                        }}
                      ></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {color}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center mb-6">
              <label
                htmlFor="colorFormat"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mr-3"
              >
                Color Format:
              </label>
              <select
                id="colorFormat"
                value={colorFormat}
                onChange={(e) => setColorFormat(e.target.value)}
                className="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="hex">HEX</option>
                <option value="rgb">RGB</option>
              </select>
            </div>

            <section className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                About the Color Picker
              </h2>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Our Color Picker tool allows you to easily extract colors from
                your images. Whether you&apos;re designing a website, creating
                digital art, or just picking the perfect color for a project,
                our tool provides a simple and effective way to get the exact
                color you need.
              </p>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Key Features:
              </h3>
              <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300">
                <li>
                  Upload any image and automatically generate a color palette
                </li>
                <li>Instant color extraction and display</li>
                <li>Multiple color formats (HEX, RGB)</li>
                <li>Easy color copying to clipboard</li>
                <li>Clean and intuitive interface</li>
                <li>Support for dark mode</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300">
                Simply upload your image, choose your desired color format, and
                click on any color in the palette to copy it to your clipboard.
                It&apos;s that easy!
              </p>
            </section>
          </div>
        </div>
      </main>

      <div className="mt-8">
        <HandyFreeTools toolsTitle={"You might also like"} />
      </div>

      <Footer />
    </>
  );
}
