import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../context";

const Watermark = ({
  showWatermark,
  setshowWatermark,
  setmodalIsOn,
  dm,
  setshowLoginModal,
  setshowPremiumModal
}) => {
  const [showWatermarkOptions, setshowWatermarkOptions] = useState(false);
  const [showCredit, setshowCredit] = useState(true);
  const [credit, setcredit] = useState("pixlab");
  const [logo, setlogo] = useState("");
  const logoref = useRef();
  const [mode, setmode] = useState("glassy");
  const context = useAppContext();
  const { username, planType } = context.sharedState;

  useEffect(() => {
    console.log(showWatermark);
    if (!showWatermark) {
      setshowCredit(false);
    } else {
      setshowCredit(true);
    }
  }, [showWatermark]);

  return (
    <>
      <div
        onClick={() => {
          setshowWatermarkOptions(!showWatermarkOptions);
        }}
        className="wm"
        style={{
          position: "absolute",
          bottom: "8px",
          right: "8px",
          background:
            mode === "dark"
              ? "black"
              : mode === "light"
              ? "white"
              : mode === "glassy"
              ? "rgba(0, 0, 0, 0.3)"
              : "black",
          padding: "2px 8px",
          fontWeight: "500",
          color:
            mode === "dark"
              ? "white"
              : mode === "light"
              ? "black"
              : mode === "glassy"
              ? "white"
              : "white",
          borderRadius: "4px",
          zIndex: 1,
          cursor: "pointer",
          userSelect: "none",
          display: showCredit ? "flex" : "none",
          alignItems: "center"
        }}
      >
        {credit}
      </div>

      <div
        onMouseLeave={() => setshowWatermarkOptions(false)}
        style={{
          position: "absolute",
          bottom: "36px",
          right: "8px",
          background: "black",
          fontSize: "12px",
          padding: "2px 8px",
          fontWeight: "500",
          color: "white",
          borderRadius: "8px",
          zIndex: 9999999,
          cursor: "pointer",
          userSelect: "none",
          display: showWatermarkOptions ? "" : "none",
          alignItems: "center",
          border: "2px solid silver",
          // padding: "8px"
        }}
      >
        <label className="inline-flex items-center my-4  cursor-pointer">
          <input
            checked={showCredit}
            onChange={() => {
              if (!username) {
                setshowLoginModal(true);
              } else if (planType === "free") {
                setshowPremiumModal(true);
              } else {
                setshowCredit(!showCredit);
                setshowWatermarkOptions(false);
                setshowWatermark(!showWatermark);
              }
            }}
            id="showWatermark"
            type="checkbox"
            value=""
            className="sr-only peer"
          />
          <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all  peer-checked:bg-teal-600"></div>
          <span className="ms-3 text-sm font-medium text-white ">
            Show Watermark
          </span>
        </label>
        <div style={{ display: "flex", alignItems: "center", margin: "8px 0" }}>
          <span
            onClick={() => {
              setmode("dark");
            }}
            style={{
              background: mode !== "dark" ? "black" : "white",
              color: mode === "dark" ? "black" : "white",
              borderRadius: "6px",
              padding: "2px 8px",
              border: "1px solid gray",
              marginRight: "8px"
            }}
          >
            Dark
          </span>
          <span
            onClick={() => {
              setmode("light");
            }}
            style={{
              background: mode !== "light" ? "black" : "white",
              color: mode === "light" ? "black" : "white",
              borderRadius: "6px",
              padding: "2px 8px",
              border: "1px solid gray",
              marginRight: "8px"
            }}
          >
            Light
          </span>
          <span
            onClick={() => {
              setmode("glassy");
            }}
            style={{
              background: mode !== "glassy" ? "black" : "white",
              color: mode === "glassy" ? "black" : "white",
              borderRadius: "6px",
              padding: "2px 8px",
              border: "1px solid gray",
              marginRight: "8px"
            }}
          >
            Glassy
          </span>
        </div>
        <div
          style={{
            display: showCredit ? "flex" : "none",
            alignItems: "center",
            marginTop: "4px"
          }}
        >
          {showCredit ? (
            <input
              className="bg-gray-800 p-1 text-sm mt-2"
              placeholder="Made By John 🔥"
              value={credit}
              onChange={(e) => {
                if (username && username !== null) {
                  if (planType !== "starter" && planType !== "lifetime") {
                    setshowCredit(true);
                    setmodalIsOn(true);

                    return setshowPremiumModal(true);
                  }
                  setcredit(e.target.value);
                  if (showWatermark.text) {
                    setshowWatermark({
                      ...showWatermark,
                      text: e.target.value
                    });
                  }
                } else {
                  setshowLoginModal(true);
                }
              }}
              style={{ color: true ? "white" : "black", fontSize: "14px" }}
            />
          ) : (
            ""
          )}

          <input
            type="file"
            accept="image/png, image/jpg, image/jpeg,image/jfif"
            style={{ display: "none" }}
            ref={logoref}
            onChange={(e) => {
              setlogo(e.target.files[0]);
              if (showWatermark.text) {
                setshowWatermark({ ...showWatermark, logo: e.target.files[0] });
              }
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Watermark;
