import React, { useRef, useState } from "react";
import {
  FaExternalLinkAlt,
  FaFacebook,
  FaLinkedin,
  FaProductHunt,
  FaReddit,
  FaRegStar,
  FaStar,
  FaTwitter,
} from "react-icons/fa";
import TextareaAutosize from "react-textarea-autosize";

const Template1 = ({
  dm,
  color,
  platform,
  item,
  handleChange,
  index,
  handleImageChange,
}) => {
  const imgref = useRef();

  const [starRating, setstarRating] = useState(5);
  const stars = Array(5).fill(0);
  const [hoverValue, setHoverValue] = useState(undefined);

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const handleClick = (value) => {
    setstarRating(value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: item.background,
        padding: "16px",
        fontFamily: "sans-serif",
        width: "100%",
        color: item.color,

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

        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", height: "44px" }}>
          {item.photo?.name?.length > 0 ? (
            <img
              src={URL.createObjectURL(item.photo)}
              onClick={() => imgref.current.click()}
              style={{ width: "44px", height: "44px", borderRadius: "50%" }}
            ></img>
          ) : (
            <img
              src="/Elon.jpg"
              onClick={() => {
                imgref.current.click();
              }}
              style={{ width: "44px", height: "44px", borderRadius: "50%" }}
            ></img>
          )}
          <div
            style={{
              marginLeft: "8px",
              maxHeight: "44px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <input
              value={item.title}
              name="title"
              onChange={(e) => handleChange(e, item, index)}
              style={{
                padding: 0,
                margin: "0px",
                fontSize: "16px",
                fontWeight: "600",
                outline: "none",
                border: "none",
                background: "transparent",
                color: color,
                display: "inline-block",
                boxSizing: "border-box",
                width: "100%",
              }}
            ></input>
            <input
              value={item.subtitle}
              name="subtitle"
              onChange={(e) => handleChange(e, item, index)}
              style={{
                padding: 0,
                margin: "0px",
                fontSize: "14px",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                outline: "none",
                border: "none",
                background: "transparent",
                color: item.color,
                display: "inline-block",
                width: "100%",
              }}
            ></input>
          </div>
        </div>
        <div style={{ cursor: "pointer" }}>
          {platform === "twitter" ? (
            <FaTwitter color="#26a7de" size={20} />
          ) : (
            ""
          )}
          {platform === "ph" ? (
            <FaProductHunt
              style={{
                backgroundcolor: dm ? "white" : "black",
                padding: 0,
                margin: 0,
                borderRadius: "50%",
              }}
              color="#DE5425"
              size={24}
            />
          ) : (
            ""
          )}
          {platform === "reddit" ? (
            <FaReddit
              style={{
                backgroundcolor: dm ? "white" : "black",
                padding: 0,
                margin: 0,
                borderRadius: "50%",
              }}
              color="#ff4500"
              size={24}
            />
          ) : (
            ""
          )}

          {platform === "facebook" ? (
            <FaFacebook
              style={{
                backgroundcolor: dm ? "white" : "black",
                padding: 0,
                margin: 0,
                borderRadius: "50%",
              }}
              color="#3b5998"
              size={24}
            />
          ) : (
            ""
          )}

          {platform === "linkedin" ? (
            <FaLinkedin
              color="#0A66C2"
              style={{
                backgroundcolor: dm ? "white" : "black",
                padding: 0,
                margin: 0,
              }}
              size={24}
            />
          ) : (
            // </span>
            ""
          )}
          {platform === "" && link?.length > 0 ? <FaExternalLinkAlt /> : ""}
        </div>
      </div>
      <div
        style={{
          margin: 0,
          display: true ? "flex" : "none",
          flexDirection: "row",
          alignItems: "center",
          marginTop: "14px",
        }}
      >
        {stars.map((_, index) => {
          return (
            <>
              {(hoverValue || starRating) > index ? (
                <FaStar
                  key={index}
                  size={18}
                  onClick={() => {
                    return handleClick(index + 1);
                  }}
                  onMouseOver={() => handleMouseOver(index + 1)}
                  onMouseLeave={handleMouseLeave}
                  color="orange"
                  style={{
                    margin: "0 4px 0 0",
                    cursor: "pointer",
                    padding: "0rem",
                  }}
                />
              ) : (
                <FaRegStar
                  key={index}
                  size={18}
                  onClick={() => {
                    return handleClick(index + 1);
                  }}
                  onMouseOver={() => handleMouseOver(index + 1)}
                  onMouseLeave={handleMouseLeave}
                  color="gray"
                  style={{
                    margin: "0 4px 0 0",
                    cursor: "pointer",
                    padding: "0rem",
                  }}
                />
              )}
            </>
          );
        })}
      </div>

      <TextareaAutosize
        value={item.description}
        name="description"
        onChange={(e) => handleChange(e, item, index)}
        style={{
          fontSize: "14px",
          marginTop: "8px",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          background: "transparent",
          border: "none",
          outline: "none",
          color: color,
          resize: "none",
        }}
      ></TextareaAutosize>

      <input
        name="photo"
        type="file"
        accept="image/png, image/jpg, image/jpeg,image/jfif"
        style={{ display: "none" }}
        ref={imgref}
        onChange={(e) => handleImageChange(e, item, index)}
      />
    </div>
  );
};

export default Template1;
