import { host } from "@/host";
import domtoimage from "dom-to-image";
import { useRef, useState } from "react";
import { MdFileDownload, MdSearch } from "react-icons/md";
import { toast } from "react-toastify";
import HandyFreeTools from "../Tools/HandyFreeTools";
import Footer from "../../Components/shared/footer/Footer";
const GoogleSuggestion = () => {
  const [downloading, setDownloading] = useState(false);
  const divRef = useRef();

  const handleDownload = () => {
    setDownloading(true);
    const node = document.getElementById("ss");
    const scale = 2;
    const style = {
      transform: `scale(${scale})`,
      transformOrigin: "top left",
      width: `${node.offsetWidth}px`,
      height: `${node.offsetHeight}px`,
    };
    const param = {
      height: node.offsetHeight * scale,
      width: node.offsetWidth * scale,
      quality: 1,
      style,
    };

    domtoimage
      .toPng(node, param)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `pixlab ${new Date().toString()}.png`;
        link.href = dataUrl;
        link.click();
        updateAnalytics();
        toast("Downloaded! Share pixlab With Others", {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        console.error("Error capturing screenshot:", error);
        toast.error("Error downloading image. Please try again.");
      })
      .finally(() => {
        setDownloading(false);
      });
  };

  async function updateAnalytics() {
    try {
      const response = await fetch(`${host}/api/update-analytics`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      await response.json();
    } catch (error) {
      console.error("Error updating analytics:", error);
    }
  }

  return (
    <>
      <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            pixlab Google Suggestion Generator
          </h1>

          <div
            id="ss"
            ref={divRef}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8"
          >
            <img src="/google.png" alt="Google Logo" className="mx-auto mb-6" />
            <div className="google_suggestion min-w-[40vw] p-4 rounded-2xl shadow-lg">
              <div className="flex items-center border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
                <MdSearch size={24} className="text-gray-400 mr-2" />
                <div
                  contentEditable={true}
                  className="w-full outline-none dark:text-white"
                  suppressContentEditableWarning={true}
                >
                  Fake google suggestions
                </div>
                {!downloading && (
                  <button
                    onClick={handleDownload}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md flex items-center text-sm hover:bg-blue-600 transition-colors"
                  >
                    Save <MdFileDownload size={20} className="ml-1" />
                  </button>
                )}
              </div>

              {[
                "write your own suggestions",
                "and have fun",
                "and share it with anyone",
                "and check if they believe it",
                "if you like",
                "this feature",
                "tell your friends",
                "about pixlab",
              ].map((suggestion, index) => (
                <div key={index} className="flex items-center pb-2">
                  <MdSearch size={24} className="text-gray-400 mr-2" />
                  <div
                    contentEditable={true}
                    className="w-full outline-none dark:text-white"
                    suppressContentEditableWarning={true}
                  >
                    {suggestion}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <section className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              About pixlab Google Suggestion Generator
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              pixlab&apos;s Google Suggestion Generator is a fun and creative
              tool that allows you to create fake Google search suggestion
              screenshots. Whether you&apos;re looking to make a joke, create a
              meme, or generate engaging social media content, our tool makes it
              quick and easy.
            </p>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Key Features:
            </h3>
            <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300">
              <li>Realistic Google search interface</li>
              <li>Fully editable suggestions</li>
              <li>One-click download of your creation</li>
              <li>Dark mode support</li>
              <li>Mobile-friendly design</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              To use the tool, simply edit the suggestions to your liking, then
              click the Save button to download your creation. Share your
              hilarious or thought-provoking fake Google suggestions with
              friends or on social media and enjoy the reactions!
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
};

export default GoogleSuggestion;
