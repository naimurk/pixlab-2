import gifshot from "gifshot";
import React, { useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { AiOutlineClose } from "react-icons/ai";
import { MdFileDownload, MdPermMedia } from "react-icons/md";
import { toast } from "react-toastify";
import HandyFreeTools from "../Tools/HandyFreeTools";
import Footer from "../../Components/shared/footer/Footer";
const GifGenerator = () => {
  const [images, setImages] = useState([]);
  const [gifDuration, setGifDuration] = useState(2000);
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [sizeMultiplier, setSizeMultiplier] = useState(1);
  const imgRef = useRef(null);

  const handleUpload = (e) => {
    const files = e.target.files;
    const imageUrls = [];
    for (let i = 0; i < files.length; i++) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files[i]);
      fileReader.onload = (e) => {
        imageUrls.push({ id: i.toString(), url: e.target.result });
        if (imageUrls.length === files.length) {
          setImages(imageUrls);
        }
      };
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setImages(items);
  };

  const handleGenerateGif = () => {
    if (images.length === 0) return;

    const firstImage = new Image();
    firstImage.src = images[0].url;

    firstImage.onload = () => {
      let gifWidth = firstImage.width * sizeMultiplier;
      let gifHeight = firstImage.height * sizeMultiplier;

      if (aspectRatio !== "auto") {
        const [widthRatio, heightRatio] = aspectRatio.split(":").map(Number);
        gifWidth = firstImage.width * sizeMultiplier;
        gifHeight = (gifWidth * heightRatio) / widthRatio;
      }

      gifshot.createGIF(
        {
          images: images.map((image) => image.url),
          interval: gifDuration / images.length / 1000,
          numWorkers: 2,
          gifWidth: gifWidth,
          gifHeight: gifHeight,
        },
        function (obj) {
          if (!obj.error) {
            const link = document.createElement("a");
            link.href = obj.image;
            let d = new Date();
            let ds = d.toString();
            link.download = `animation ${ds}.gif`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            toast("Downloaded! Share pixlab With Others", {
              position: "top-left",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        }
      );
    };
  };

  const removePhoto = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <>
      <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            GIF Generator
          </h1>

          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Upload Images
              </h2>
              <input
                ref={imgRef}
                type="file"
                multiple
                onChange={handleUpload}
                className="hidden"
                accept="image/*"
              />
              <div
                onClick={() => imgRef.current.click()}
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
              >
                {images.length > 0 ? (
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="images" direction="horizontal">
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="flex overflow-x-auto"
                        >
                          {images.map((image, index) => (
                            <Draggable
                              key={image.id}
                              draggableId={image.id}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="relative mr-2"
                                >
                                  <button
                                    onClick={() => removePhoto(index)}
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                  >
                                    <AiOutlineClose size={16} />
                                  </button>
                                  <img
                                    src={image.url}
                                    alt=""
                                    className="w-24 h-24 object-cover"
                                  />
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                ) : (
                  <div className="flex flex-col items-center">
                    <MdPermMedia size={50} className="text-gray-400 mb-2" />
                    <p className="text-gray-500 dark:text-gray-400">
                      Click to upload or drag and drop your images here
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-4 sm:mb-0">
                <label
                  htmlFor="gifDuration"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  GIF Duration:
                </label>
                <select
                  id="gifDuration"
                  value={gifDuration}
                  onChange={(e) => setGifDuration(Number(e.target.value))}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value={1000}>1 Second</option>
                  <option value={2000}>2 Seconds</option>
                  <option value={3000}>3 Seconds</option>
                  <option value={4000}>4 Seconds</option>
                  <option value={5000}>5 Seconds</option>
                </select>
              </div>

              <div className="mb-4 sm:mb-0">
                <label
                  htmlFor="aspectRatio"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Aspect Ratio:
                </label>
                <select
                  id="aspectRatio"
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="auto">Auto</option>
                  <option value="1:1">1:1 (Square)</option>
                  <option value="4:3">4:3</option>
                  <option value="16:9">16:9</option>
                  <option value="3:2">3:2</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="sizeMultiplier"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Size Multiplier:
                </label>
                <select
                  id="sizeMultiplier"
                  value={sizeMultiplier}
                  onChange={(e) => setSizeMultiplier(Number(e.target.value))}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value={1}>1x</option>
                  <option value={2}>2x</option>
                  <option value={3}>3x</option>
                  <option value={4}>4x</option>
                  <option value={5}>5x</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleGenerateGif}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
              >
                Generate GIF{" "}
                <MdFileDownload className="inline-block ml-2" size={20} />
              </button>
            </div>
          </div>
        </div>
      </main>

      <div className="mt-8">
        <HandyFreeTools toolsTitle={"You might also like"} />
      </div>

      <Footer />
    </>
  );
};

export default GifGenerator;
