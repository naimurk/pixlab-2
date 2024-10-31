import { useRef, useState } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { BsBookmark, BsChat, BsThreeDots } from "react-icons/bs";
import { FiShare } from "react-icons/fi";
import { GoVerified } from "react-icons/go";

const FakeTweet = ({ item, index, handleChange, handleImageChange }) => {
  const imgref = useRef();

  const [heart, setheart] = useState(true);
  const [retweet, setretweet] = useState(true);
  return (
    <div
      style={{
        backgroundColor: item.darkMode ? "black" : "white",
        padding: "16px",
        fontFamily: "sans-serif",
        color: item.darkMode ? "white" : "black",

        borderRadius:
          item.frame !== "macOS-Dark" &&
          item.frame !== "macOS-Light" &&
          item.frame !== "macOS-black" &&
          item.frame !== "macOS-white"
            ? `${item.br}px`
            : "",
        border:
          item.frame === "photograph"
            ? "8px solid white"
            : item.frame === "arc-dark"
            ? "6px solid rgb(0,0,0,0.5)"
            : item.frame === "arc-light"
            ? "6px solid rgb(255,255,255,0.5)"
            : item.frame !== "none" &&
              item.frame !== "macOS-Dark" &&
              item.frame !== "macOS-Light" &&
              item.frame !== "macOS-black" &&
              item.frame !== "macOS-white"
            ? `5px solid ${item.frame}`
            : "none",
        borderBottom: item.frame === "photograph" ? "24px solid white" : "",

        overflow: "hidden"
      }}
    >
      <input
        name="photo"
        type="file"
        accept="image/png, image/jpg, image/jpeg,image/jfif"
        style={{ display: "none" }}
        ref={imgref}
        onChange={(e) => handleImageChange(e, item, index)}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%"
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {item.photo?.name?.length > 0 ? (
            <img
              src={URL.createObjectURL(item.photo)}
              onClick={() => imgref.current.click()}
              style={{ width: "48px", height: "48px", borderRadius: "50%" }}
            ></img>
          ) : (
            <img
              src="/Elon.jpg"
              onClick={() => {
                imgref.current.click();
              }}
              style={{ width: "48px", height: "48px", borderRadius: "50%" }}
            ></img>
          )}
          <div
            style={{
              marginLeft: "12px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              maxHeight: "40px",
              height: "15px"
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <span
                contentEditable={true}
                value={item.title}
                name="title"
                onChange={(e) => handleChange(e, item, index)}
                style={{
                  marginBottom: "0px",
                  fontSize: "15px",
                  fontWeight: "600",
                  outline: "none",
                  border: "none",
                  background: "transparent",
                  color: item.darkMode ? "white" : "black",
                  display: "inline-block",
                  boxSizing: "border-box",
                  width: "100%",
                  height: "21px"
                }}
              >
                Elon Musk
              </span>
              <GoVerified
                color="rgb(29, 155, 240)"
                size={18}
                style={{ height: "20px", marginLeft: "1px" }}
              ></GoVerified>
            </div>
            <span
              contentEditable={true}
              value={item.subtitle}
              name="subtitle"
              onChange={(e) => handleChange(e, item, index)}
              style={{
                marginBottom: "0px",
                fontSize: "14px",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                outline: "none",
                border: "none",
                background: "transparent",
                color: item.darkMode ? "white" : "black",
                display: "inline-block",
                width: "100%",
                // color: "#536471"
              }}
            >
              @elonmusk
            </span>
          </div>
        </div>
        <div>
          <BsThreeDots color="rgb(83, 100, 113)" />
        </div>
      </div>

      <p
        contentEditable={true}
        style={{ outline: "none", border: "none", margin: "8px 0" }}
      >
        pixlab is the best tool for creating image mockups
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center"
        }}
      >
        <BsChat size={18} color="#536471" />
        <AiOutlineRetweet
          onClick={() => setretweet(!retweet)}
          size={20}
          color={retweet ? "rgb(0, 186, 124)" : "#536471"}
        />
        {heart ? (
          <AiFillHeart
            onClick={() => setheart(!heart)}
            size={20}
            color="rgb(249, 24, 128)"
          />
        ) : (
          <AiOutlineHeart
            onClick={() => setheart(!heart)}
            size={20}
            color="#536471"
          />
        )}
        <BsBookmark size={16} color="#536471" />
        <FiShare size={18} color="#536471" />
      </div>
    </div>
  );
};

export default FakeTweet;
