import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlineRetweet } from "react-icons/ai";
import {
  MdDelete,
  MdOutlineCrop,
  MdOutlineHighlight,
  MdOutlineLensBlur,
} from "react-icons/md";
import CropImage from "../Options/CropImage";
import BlurImage from "../Options/BlurImage";
import HighlightImage from "../Options/HighlightImage";
import CropImageModal from "../Modals/CropImageModal";
import BlurImageModal from "../Modals/BlurImageModal";
import HighlightImageModal from "../Modals/HighlightImageModal";

const ImageComponent = ({
  dm,
  clicks,
  photo,
  isDeleted,
  canvasWidth,
  canvasHeight,
  setimg,
  id,
  img,
  currentActive,
  setcurrentActive,
  item,
  setcurrentTag,
  downloading,
  setcontent,
  content,
  index,
  setmodalIsOn,
  undoRedoFunc,
}) => {
  const imgDivRef = useRef();
  const [subdivPosition, setSubdivPosition] = useState({ left: 0, top: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [showcropModal, setshowcropModal] = useState(false);
  const [showBlurModal, setshowBlurModal] = useState(false);
  const [showHighlight, setshowHighlight] = useState(false);

  const imgref = useRef();

  useEffect(() => {
    if (item.position) {
      setSubdivPosition({
        left: (parseFloat(item.position.left) / 100) * canvasWidth,
        top: (parseFloat(item.position.top) / 100) * canvasHeight,
      });
    }
  }, [canvasWidth, canvasHeight]);

  useEffect(() => {
    if (item.position) {
      setSubdivPosition({
        left: (parseFloat(item.position.left) / 100) * canvasWidth,
        top: (parseFloat(item.position.top) / 100) * canvasHeight,
      });
    }
  }, [clicks]);

  const onSubdivMouseDown = (e) => {
    e.preventDefault();
    document.body.style.overflow = "hidden";
    setIsDragging(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
  };

  const onSubdivMouseMove = (e) => {
    e.preventDefault();

    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    setSubdivPosition((prevState) => ({
      left: prevState.left + deltaX,
      top: prevState.top + deltaY,
    }));
    setStartX(e.clientX);
    setStartY(e.clientY);
  };

  const onSubdivMouseUp = (e) => {
    e.preventDefault();
    document.body.style.overflow = "auto";
    setIsDragging(false);
    const newArr = [...content];
    newArr[index] = {
      ...item,
      position: {
        top: (subdivPosition.top / canvasHeight) * 100,
        left: (subdivPosition.left / canvasWidth) * 100,
      },
    }; // update the shadow property of the selected item
    undoRedoFunc();
    setcontent(newArr); // update the state with the new array
  };

  const onSubdivTouchStart = (e) => {
    // e.preventDefault();
    if (currentActive !== id) return;
    document.body.style.overflow = "hidden";

    setIsDragging(true);
    const touch = e.touches[0];
    setStartX(touch.clientX);
    setStartY(touch.clientY);
  };

  const onSubdivTouchMove = (e) => {
    // e.preventDefault();
    if (!isDragging) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - startX;
    const deltaY = touch.clientY - startY;
    setSubdivPosition((prevState) => ({
      left: prevState.left + deltaX,
      top: prevState.top + deltaY,
    }));
    setStartX(touch.clientX);
    setStartY(touch.clientY);
  };

  const onSubdivTouchEnd = (e) => {
    // e.preventDefault();
    document.body.style.overflow = "auto";
    setIsDragging(false);
    const newArr = [...content];
    newArr[index] = {
      ...item,
      position: {
        top: (subdivPosition.top / canvasHeight) * 100,
        left: (subdivPosition.left / canvasWidth) * 100,
      },
    }; // update the shadow property of the selected item
    undoRedoFunc();
    setcontent(newArr); // update the state with the new array
  };

  useEffect(() => {
    if (!showBlurModal && !showcropModal && !showHighlight && setmodalIsOn) {
      setmodalIsOn(false);
    } else {
      if (setmodalIsOn) {
        setmodalIsOn(true);
      }
    }
  }, [showBlurModal, showcropModal, showHighlight]);

  return (
    <>
      <div
        id="imgdiv"
        onClick={(e) => {
          e.stopPropagation();

          if (currentActive === id) {
            setcurrentActive("");
          } else {
            setcurrentActive(id);
            setcurrentTag("image");
          }
        }}
        style={{
          display: isDeleted ? "none" : "grid",
          borderRadius: `${(item.br / 100) * canvasWidth}px`,
          boxShadow:
            item.frame !== "mobile-1" &&
            item.frame !== "mobile-2" &&
            item.frame !== "mobile-3" &&
            item.frame !== "mobile-4" &&
            item.frame !== "mobile-5" &&
            item.frame !== "mobile-6" &&
            item.frame !== "watch-white" &&
            item.frame !== "watch-black" &&
            item.frame !== "monitor-black" &&
            item.frame !== "monitor-white" &&
            item.frame !== "laptop-white" &&
            item.frame !== "laptop-black" &&
            item.frame !== "macbook"
              ? `0 ${item.shadow > 0 ? "4px" : 0} ${item.shadow}px ${
                  item.shadow > 0 ? "0px" : "0px"
                } ${item.scolor}`
              : "",

          maxWidth: "100%",
          position: "absolute",
          transform: item.transform,
          left: subdivPosition.left,
          top: subdivPosition.top,
          width: `${item.size}%`,
        }}
        ref={imgDivRef}
        onTouchStart={onSubdivTouchStart}
        onTouchMove={onSubdivTouchMove}
        onTouchEnd={onSubdivTouchEnd}
        onMouseDown={onSubdivMouseDown}
        onMouseMove={onSubdivMouseMove}
        onMouseUp={onSubdivMouseUp}
      >
        {item.frame !== "none" ? "" : ""}
        {item.frame === "macOS-Dark" ? (
          <>
            <div
              style={{
                width: "100%",
                position: "relative",
                background: "#333",
                borderRadius:
                  item.frame === "none"
                    ? `${(item.br / 100) * canvasWidth}px`
                    : `${(item.br / 100) * canvasWidth}px ${
                        (item.br / 100) * canvasWidth
                      }px 0 0`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  padding: "8px 12px",
                }}
              >
                <span
                  style={{
                    height: "6px",
                    width: "6px",
                    borderRadius: "50%",
                    marginRight: "5px",
                    backgroundColor: "#ff5f56",
                  }}
                ></span>
                <span
                  style={{
                    height: "6px",
                    width: "6px",
                    borderRadius: "50%",
                    marginRight: "5px",
                    backgroundColor: "#ffbd2e",
                  }}
                ></span>
                <span
                  style={{
                    height: "6px",
                    width: "6px",
                    borderRadius: "50%",
                    marginRight: "5px",
                    backgroundColor: "#27c93f",
                  }}
                ></span>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        {item.frame === "macOS-Light" ? (
          <>
            <div
              style={{
                width: "100%",
                position: "relative",
                background: "#eee",
                borderRadius:
                  item.frame === "none"
                    ? `${(item.br / 100) * canvasWidth}px`
                    : `${(item.br / 100) * canvasWidth}px ${
                        (item.br / 100) * canvasWidth
                      }px 0 0`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  padding: "8px 12px",
                }}
              >
                <span
                  style={{
                    height: "6px",
                    width: "6px",
                    borderRadius: "50%",
                    marginRight: "5px",
                    backgroundColor: "#ff5f56",
                  }}
                ></span>
                <span
                  style={{
                    height: "6px",
                    width: "6px",
                    borderRadius: "50%",
                    marginRight: "5px",
                    backgroundColor: "#ffbd2e",
                  }}
                ></span>
                <span
                  style={{
                    height: "6px",
                    width: "6px",
                    borderRadius: "50%",
                    marginRight: "5px",
                    backgroundColor: "#27c93f",
                  }}
                ></span>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        {item.frame === "macOS-black" ? (
          <>
            <div
              style={{
                width: "100%",
                position: "relative",
                background: "black",
                borderRadius:
                  item.frame === "none"
                    ? `${(item.br / 100) * canvasWidth}px`
                    : `${(item.br / 100) * canvasWidth}px ${
                        (item.br / 100) * canvasWidth
                      }px 0 0`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  padding: "8px 12px",
                }}
              >
                <span
                  style={{
                    height: "6px",
                    width: "6px",
                    borderRadius: "50%",
                    marginRight: "5px",
                    backgroundColor: "#ff5f56",
                  }}
                ></span>
                <span
                  style={{
                    height: "6px",
                    width: "6px",
                    borderRadius: "50%",
                    marginRight: "5px",
                    backgroundColor: "#ffbd2e",
                  }}
                ></span>
                <span
                  style={{
                    height: "6px",
                    width: "6px",
                    borderRadius: "50%",
                    marginRight: "5px",
                    backgroundColor: "#27c93f",
                  }}
                ></span>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        {item.frame === "macOS-white" ? (
          <>
            <div
              style={{
                width: "100%",
                position: "relative",
                background: "white",
                borderRadius:
                  item.frame === "none"
                    ? `${(item.br / 100) * canvasWidth}px`
                    : `${(item.br / 100) * canvasWidth}px ${
                        (item.br / 100) * canvasWidth
                      }px 0 0`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  padding: "8px 12px",
                }}
              >
                <span
                  style={{
                    height: "6px",
                    width: "6px",
                    borderRadius: "50%",
                    marginRight: "5px",
                    backgroundColor: "#ff5f56",
                  }}
                ></span>
                <span
                  style={{
                    height: "6px",
                    width: "6px",
                    borderRadius: "50%",
                    marginRight: "5px",
                    backgroundColor: "#ffbd2e",
                  }}
                ></span>
                <span
                  style={{
                    height: "6px",
                    width: "6px",
                    borderRadius: "50%",
                    marginRight: "5px",
                    backgroundColor: "#27c93f",
                  }}
                ></span>
              </div>
            </div>
          </>
        ) : (
          ""
        )}

        {item.frame == "mobile-1" ? (
          <>
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "0.465",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                zIndex: 50,
              }}
            >
              <div
                className="abcd"
                style={{
                  borderRadius:
                    item.frame !== "macOS-Dark" &&
                    item.frame !== "macOS-Light" &&
                    item.frame !== "macOS-black" &&
                    item.frame !== "macOS-white"
                      ? `${(item.br / 100) * canvasWidth}px`
                      : `0 0 ${(item.br / 100) * canvasWidth}px ${
                          (item.br / 100) * canvasWidth
                        }px`,
                  border:
                    item.frame !== "none" &&
                    item.frame !== "macOS-Dark" &&
                    item.frame !== "macOS-Light" &&
                    item.frame !== "macOS-black" &&
                    item.frame !== "macOS-white"
                      ? `5px solid ${item.frame}`
                      : "none",

                  position: "relative",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 2,
                  width: "91%",
                  height: "96%",
                  boxShadow: `0 0px ${item.shadow}px ${
                    item.shadow > 0 ? "2px" : "0px"
                  }
                                                                    ${
                                                                      item.scolor
                                                                    }`,
                  // borderRadius: "1rem",
                  background: dm ? "black" : "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  className="abcd"
                  src={photo?.name ? URL.createObjectURL(photo) : photo}
                  style={{
                    zIndex: 2,
                    width: "100%",
                  }}
                ></img>
              </div>
              <div
                style={{
                  position: "absolute",
                  backgroundImage: "url(/mob-1.png)",
                  width: "100%",
                  aspectRatio: "0.465",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  zIndex: 50,
                  top: 0,
                  overflow: "hidden",
                }}
              ></div>
            </div>
          </>
        ) : (
          ""
        )}

        {item.frame == "mobile-3" ? (
          <>
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "0.5",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                zIndex: 50,
              }}
            >
              <div
                className="abcd"
                style={{
                  borderRadius:
                    item.frame !== "macOS-Dark" &&
                    item.frame !== "macOS-Light" &&
                    item.frame !== "macOS-black" &&
                    item.frame !== "macOS-white"
                      ? `${(item.br / 100) * canvasWidth}px`
                      : `0 0 ${(item.br / 100) * canvasWidth}px ${
                          (item.br / 100) * canvasWidth
                        }px`,
                  border:
                    item.frame !== "none" &&
                    item.frame !== "macOS-Dark" &&
                    item.frame !== "macOS-Light" &&
                    item.frame !== "macOS-black" &&
                    item.frame !== "macOS-white"
                      ? `5px solid ${item.frame}`
                      : "none",

                  position: "relative",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 2,
                  width: "88%",
                  height: "94%",
                  boxShadow: `0 0px ${item.shadow}px ${
                    item.shadow > 0 ? "2px" : "0px"
                  }
                                                                    ${
                                                                      item.scolor
                                                                    }`,
                  // borderRadius: "1rem",
                  background: "black",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  className="abcd"
                  src={photo?.name ? URL.createObjectURL(photo) : photo}
                  style={{
                    width: "100%",
                  }}
                ></img>
              </div>
              <div
                style={{
                  position: "absolute",
                  backgroundImage: "url(/mob-3.png)",
                  width: "100%",
                  aspectRatio: "0.5",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  zIndex: 50,
                  top: 0,
                  overflow: "hidden",
                }}
              ></div>
            </div>
          </>
        ) : (
          ""
        )}

        {item.frame == "mobile-2" ? (
          <>
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "0.458",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  backgroundImage: "url(/galaxy-s8.webp)",
                  width: "100%",
                  aspectRatio: "0.458",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  top: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  className="abcd"
                  src={photo?.name ? URL.createObjectURL(photo) : photo}
                  style={{
                    maxWidth: "95%",
                    zIndex: 1,
                    // position: "relative",
                    maxHeight: "100%",
                    position: "relative",
                  }}
                ></img>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        {item.frame == "mobile-4" ? (
          <>
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "0.493",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  backgroundImage: "url(/iphone-14-pro.webp)",
                  width: "100%",
                  aspectRatio: "0.493",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  top: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  className="abcd"
                  src={photo?.name ? URL.createObjectURL(photo) : photo}
                  style={{
                    maxWidth: "88%",
                    zIndex: 1,
                    // position: "relative",
                    maxHeight: "93%",
                    position: "relative",
                  }}
                ></img>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        {item.frame == "mobile-5" ? (
          <>
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "0.493",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  backgroundImage: "url(/iphone_x.webp)",
                  width: "100%",
                  aspectRatio: "0.493",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  top: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  className="abcd"
                  src={photo?.name ? URL.createObjectURL(photo) : photo}
                  style={{
                    maxWidth: "88%",
                    zIndex: 1,
                    // position: "relative",
                    maxHeight: "93%",
                    position: "relative",
                    borderRadius: `${(item.br / 100) * canvasWidth}px    `,
                  }}
                ></img>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        {item.frame == "mobile-6" ? (
          <>
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "0.5625",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                zIndex: 50,
              }}
            >
              <img
                className="abcd"
                src={photo?.name ? URL.createObjectURL(photo) : photo}
                style={{
                  borderRadius:
                    item.frame !== "macOS-Dark" &&
                    item.frame !== "macOS-Light" &&
                    item.frame !== "macOS-black" &&
                    item.frame !== "macOS-white"
                      ? `${(item.br / 100) * canvasWidth}px`
                      : `0 0 ${(item.br / 100) * canvasWidth}px ${
                          (item.br / 100) * canvasWidth
                        }px`,
                  border:
                    item.frame !== "none" &&
                    item.frame !== "macOS-Dark" &&
                    item.frame !== "macOS-Light" &&
                    item.frame !== "macOS-black" &&
                    item.frame !== "macOS-white"
                      ? `5px solid ${item.frame}`
                      : "none",

                  position: "relative",
                  top: "48%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 2,
                  width: "91%",
                  height: "84%",
                  boxShadow: `0 0px ${item.shadow}px ${
                    item.shadow > 0 ? "2px" : "0px"
                  }
                                                                    ${
                                                                      item.scolor
                                                                    }`,
                  // borderRadius: "0",
                }}
              ></img>
              <div
                style={{
                  position: "absolute",
                  backgroundImage: "url(/7.png)",
                  width: "100%",
                  aspectRatio: "0.5625",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  zIndex: 50,
                  top: 0,
                  overflow: "hidden",
                }}
              ></div>
            </div>
          </>
        ) : (
          ""
        )}

        {item.frame == "watch-white" ? (
          <>
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "1",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                zIndex: 50,
              }}
            >
              <div
                className="abcd"
                style={{
                  borderRadius:
                    item.frame !== "macOS-Dark" &&
                    item.frame !== "macOS-Light" &&
                    item.frame !== "macOS-black" &&
                    item.frame !== "macOS-white"
                      ? `${(item.br / 100) * canvasWidth}px`
                      : `0 0 ${(item.br / 100) * canvasWidth}px ${
                          (item.br / 100) * canvasWidth
                        }px`,
                  border:
                    item.frame !== "none" &&
                    item.frame !== "macOS-Dark" &&
                    item.frame !== "macOS-Light" &&
                    item.frame !== "macOS-black" &&
                    item.frame !== "macOS-white"
                      ? `5px solid ${item.frame}`
                      : "none",

                  position: "relative",
                  top: "50%",
                  left: "49%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 2,
                  width: "63%",
                  height: "68%",
                  boxShadow: `0 0px ${item.shadow}px ${
                    item.shadow > 0 ? "2px" : "0px"
                  }
                                                                    ${
                                                                      item.scolor
                                                                    }`,
                  // borderRadius: "0.5rem",
                  background: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  className="abcd"
                  src={photo?.name ? URL.createObjectURL(photo) : photo}
                  style={{
                    width: "100%",
                  }}
                ></img>
              </div>

              <div
                style={{
                  position: "absolute",
                  backgroundImage: "url(/watch-white.png)",
                  width: "100%",
                  aspectRatio: "1",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  zIndex: 50,
                  top: 0,
                  overflow: "hidden",
                }}
              ></div>
            </div>
          </>
        ) : (
          ""
        )}
        {item.frame == "watch-black" ? (
          <>
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "1",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                zIndex: 50,
              }}
            >
              <div
                className="abcd"
                style={{
                  // width: "100%",
                  borderRadius:
                    item.frame !== "macOS-Dark" &&
                    item.frame !== "macOS-Light" &&
                    item.frame !== "macOS-black" &&
                    item.frame !== "macOS-white"
                      ? `${(item.br / 100) * canvasWidth}px`
                      : `0 0 ${(item.br / 100) * canvasWidth}px ${
                          (item.br / 100) * canvasWidth
                        }px`,
                        // borderRadius: "0.5rem",
                  border:
                    item.frame !== "none" &&
                    item.frame !== "macOS-Dark" &&
                    item.frame !== "macOS-Light" &&
                    item.frame !== "macOS-black" &&
                    item.frame !== "macOS-white"
                      ? `5px solid ${item.frame}`
                      : "none",

                  position: "relative",
                  top: "50%",
                  left: "49%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 2,
                  width: "63%",
                  height: "68%",
                  boxShadow: `0 0px ${item.shadow}px ${
                    item.shadow > 0 ? "2px" : "0px"
                  }
                                                                    ${
                                                                      item.scolor
                                                                    }`,

                  background: "black",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  className="abcd"
                  src={photo?.name ? URL.createObjectURL(photo) : photo}
                  style={{
                    width: "100%",
                  }}
                ></img>
              </div>
              <div
                style={{
                  position: "absolute",
                  backgroundImage: "url(/watch-black.png)",
                  width: "100%",
                  aspectRatio: "1",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  zIndex: 50,
                  top: 0,
                  overflow: "hidden",
                }}
              ></div>
            </div>
          </>
        ) : (
          ""
        )}
        {item.frame == "monitor-white" ? (
          <>
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "1",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                zIndex: 50,
              }}
            >
              <div
                className="abcd"
                style={{
                  borderRadius:
                    item.frame !== "macOS-Dark" &&
                    item.frame !== "macOS-Light" &&
                    item.frame !== "macOS-black" &&
                    item.frame !== "macOS-white"
                      ? `${(item.br / 100) * canvasWidth}px`
                      : `0 0 ${(item.br / 100) * canvasWidth}px ${
                          (item.br / 100) * canvasWidth
                        }px`,
                  border:
                    item.frame !== "none" &&
                    item.frame !== "macOS-Dark" &&
                    item.frame !== "macOS-Light" &&
                    item.frame !== "macOS-black" &&
                    item.frame !== "macOS-white"
                      ? `5px solid ${item.frame}`
                      : "none",

                  position: "relative",
                  top: "40%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 2,
                  width: "85%",
                  height: "48%",
                  boxShadow: `0 0px ${item.shadow}px ${
                    item.shadow > 0 ? "2px" : "0px"
                  }
                                                                    ${
                                                                      item.scolor
                                                                    }`,
                  // borderRadius: "0rem",
                  background: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  className="abcd"
                  src={photo?.name ? URL.createObjectURL(photo) : photo}
                  style={{
                    width: "100%",
                  }}
                ></img>
              </div>
              <div
                style={{
                  position: "absolute",
                  backgroundImage: "url(/monitor-white.png)",
                  width: "100%",
                  aspectRatio: "1",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  zIndex: 50,
                  top: 0,
                  overflow: "hidden",
                }}
              ></div>
            </div>
          </>
        ) : (
          ""
        )}
        {item.frame == "monitor-black" ? (
          <>
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "1",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                zIndex: 50,
              }}
            >
              <div
                className="abcd"
                style={{
                  borderRadius:
                    item.frame !== "macOS-Dark" &&
                    item.frame !== "macOS-Light" &&
                    item.frame !== "macOS-black" &&
                    item.frame !== "macOS-white"
                      ? `${(item.br / 100) * canvasWidth}px`
                      : `0 0 ${(item.br / 100) * canvasWidth}px ${
                          (item.br / 100) * canvasWidth
                        }px`,
                  border:
                    item.frame !== "none" &&
                    item.frame !== "macOS-Dark" &&
                    item.frame !== "macOS-Light" &&
                    item.frame !== "macOS-black" &&
                    item.frame !== "macOS-white"
                      ? `5px solid ${item.frame}`
                      : "none",

                  position: "relative",
                  top: "40%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 2,
                  width: "85%",
                  height: "48%",
                  boxShadow: `0 0px ${item.shadow}px ${
                    item.shadow > 0 ? "2px" : "0px"
                  }
                                                                    ${
                                                                      item.scolor
                                                                    }`,
                  // borderRadius: "0rem",
                  background: "black",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  className="abcd"
                  src={photo?.name ? URL.createObjectURL(photo) : photo}
                  style={{
                    width: "100%",
                  }}
                ></img>
              </div>

              <div
                style={{
                  position: "absolute",
                  backgroundImage: "url(/monitor-black.png)",
                  width: "100%",
                  aspectRatio: "1",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  zIndex: 50,
                  top: 0,
                  overflow: "hidden",
                }}
              ></div>
            </div>
          </>
        ) : (
          ""
        )}
        {item.frame == "macbook" ? (
          <>
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "1.76",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  backgroundImage: "url(/macbook.webp)",
                  width: "100%",
                  aspectRatio: "1.76",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  top: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  className="abcd"
                  src={photo?.name ? URL.createObjectURL(photo) : photo}
                  style={{
                    maxWidth: "75%",
                    zIndex: 1,
                    // position: "relative",
                    maxHeight: "84%",
                    position: "relative",
                  }}
                ></img>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        {item.frame == "laptop-black" ? (
          <>
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "1",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                zIndex: 50,
              }}
            >
              <div
                className="abcd"
                style={{
                  borderRadius:
                    item.frame !== "macOS-Dark" &&
                    item.frame !== "macOS-Light" &&
                    item.frame !== "macOS-black" &&
                    item.frame !== "macOS-white"
                      ? `${(item.br / 100) * canvasWidth}px`
                      : `0 0 ${(item.br / 100) * canvasWidth}px ${
                          (item.br / 100) * canvasWidth
                        }px`,
                  border:
                    item.frame !== "none" &&
                    item.frame !== "macOS-Dark" &&
                    item.frame !== "macOS-Light" &&
                    item.frame !== "macOS-black" &&
                    item.frame !== "macOS-white"
                      ? `5px solid ${item.frame}`
                      : "none",

                  position: "relative",
                  top: "47.5%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 2,
                  width: "85%",
                  height: "48%",
                  boxShadow: `0 0px ${item.shadow}px ${
                    item.shadow > 0 ? "2px" : "0px"
                  }
                                                                    ${
                                                                      item.scolor
                                                                    }`,
                  // borderRadius: "0rem",
                  background: "black",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  className="abcd"
                  src={photo?.name ? URL.createObjectURL(photo) : photo}
                  style={{
                    width: "100%",
                  }}
                ></img>
              </div>

              <div
                style={{
                  position: "absolute",
                  backgroundImage: "url(/laptop-black.png)",
                  width: "100%",
                  aspectRatio: "1",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  zIndex: 50,
                  top: 0,
                  overflow: "hidden",
                }}
              ></div>
            </div>
          </>
        ) : (
          ""
        )}
        {item.frame == "laptop-white" ? (
          <>
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "1",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                zIndex: 50,
              }}
            >
              <div
                className="abcd"
                src={photo?.name ? URL.createObjectURL(photo) : photo}
                style={{
                  borderRadius:
                    item.frame !== "macOS-Dark" &&
                    item.frame !== "macOS-Light" &&
                    item.frame !== "macOS-black" &&
                    item.frame !== "macOS-white"
                      ? `${(item.br / 100) * canvasWidth}px`
                      : `0 0 ${(item.br / 100) * canvasWidth}px ${
                          (item.br / 100) * canvasWidth
                        }px`,
                  border:
                    item.frame !== "none" &&
                    item.frame !== "macOS-Dark" &&
                    item.frame !== "macOS-Light" &&
                    item.frame !== "macOS-black" &&
                    item.frame !== "macOS-white"
                      ? `5px solid ${item.frame}`
                      : "none",

                  position: "relative",
                  top: "47.5%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 2,
                  width: "85%",
                  height: "48%",
                  boxShadow: `0 0px ${item.shadow}px ${
                    item.shadow > 0 ? "2px" : "0px"
                  }
                                                                    ${
                                                                      item.scolor
                                                                    }`,
                  // borderRadius: "0rem",
                  background: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  className="abcd"
                  src={photo?.name ? URL.createObjectURL(photo) : photo}
                  style={{
                    width: "100%",
                  }}
                ></img>
              </div>

              <div
                style={{
                  position: "absolute",
                  backgroundImage: "url(/laptop-white.png)",
                  width: "100%",
                  aspectRatio: "1",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  zIndex: 50,
                  top: 0,
                  overflow: "hidden",
                }}
              ></div>
            </div>
          </>
        ) : (
          ""
        )}

        {item.frame === "stacked" ? (
          <>
            <img
              className="abcd"
              src={photo?.name ? URL.createObjectURL(photo) : photo}
              style={{
                width: "100%",
                borderRadius:
                  item.frame !== "macOS-Dark" &&
                  item.frame !== "macOS-Light" &&
                  item.frame !== "macOS-black" &&
                  item.frame !== "macOS-white"
                    ? `${(item.br / 100) * canvasWidth}px`
                    : `0 0 ${(item.br / 100) * canvasWidth}px ${
                        (item.br / 100) * canvasWidth
                      }px`,
                border:
                  item.frame !== "none" &&
                  item.frame !== "macOS-Dark" &&
                  item.frame !== "macOS-Light" &&
                  item.frame !== "macOS-black" &&
                  item.frame !== "macOS-white"
                    ? `5px solid ${item.frame}`
                    : "none",
                position: "absolute",
                top: "-6%",
                zIndex: "-1",
                transform: "scale(0.95)",
              }}
            ></img>
            <img
              className="abcd"
              src={photo?.name ? URL.createObjectURL(photo) : photo}
              style={{
                width: "100%",
                borderRadius:
                  item.frame !== "macOS-Dark" &&
                  item.frame !== "macOS-Light" &&
                  item.frame !== "macOS-black" &&
                  item.frame !== "macOS-white"
                    ? `${(item.br / 100) * canvasWidth}px`
                    : `0 0 ${(item.br / 100) * canvasWidth}px ${
                        (item.br / 100) * canvasWidth
                      }px`,
                border:
                  item.frame !== "none" &&
                  item.frame !== "macOS-Dark" &&
                  item.frame !== "macOS-Light" &&
                  item.frame !== "macOS-black" &&
                  item.frame !== "macOS-white"
                    ? `5px solid ${item.frame}`
                    : "none",
                position: "absolute",
                top: "-12%",
                zIndex: "-2",
                transform: "scale(0.9)",
                opacity: "0.8",
              }}
            ></img>
          </>
        ) : (
          ""
        )}

        {item.frame !== "mobile-1" &&
        item.frame !== "mobile-2" &&
        item.frame !== "mobile-3" &&
        item.frame !== "mobile-4" &&
        item.frame !== "mobile-5" &&
        item.frame !== "mobile-6" &&
        item.frame !== "watch-white" &&
        item.frame !== "watch-black" &&
        item.frame !== "monitor-black" &&
        item.frame !== "monitor-white" &&
        item.frame !== "laptop-white" &&
        item.frame !== "laptop-black" &&
        item.frame !== "macbook" ? (
          <>
            <img
              className="abcd"
              src={photo?.name ? URL.createObjectURL(photo) : photo}
              style={{
                width: "100%",
                borderRadius:
                  item.frame !== "macOS-Dark" &&
                  item.frame !== "macOS-Light" &&
                  item.frame !== "macOS-black" &&
                  item.frame !== "macOS-white"
                    ? `${(item.br / 100) * canvasWidth}px`
                    : `0 0 ${(item.br / 100) * canvasWidth}px ${
                        (item.br / 100) * canvasWidth
                      }px`,
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

                borderBottom:
                  item.frame === "photograph" ? "24px solid white" : "",
              }}
            ></img>
          </>
        ) : (
          ""
        )}

        {currentActive === id && !downloading ? (
          <div
            style={{
              position: "absolute",
              top:
                item.position.top > 70
                  ? "0%"
                  : item.position.top > 50
                  ? "50%"
                  : "101%",
              left: 0,
              backgroundColor: dm ? "rgb(20,20,20)" : "whitesmoke",
              color: dm ? "white" : "black",
              display: "flex",
              justifyContent: "space-between",
              padding: "4px 16px",
              zIndex: 999999,
              borderRadius: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                margin: "4px 16px 0 0",
              }}
              onClick={() => imgref.current.click()}
            >
              <AiOutlineRetweet />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                margin: "4px 16px 0 0",
              }}
              onClick={() => {
                setshowcropModal(true);
              }}
            >
              <MdOutlineCrop />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                margin: "4px 16px 0 0",
              }}
              onClick={() => {
                setshowBlurModal(true);
              }}
            >
              <MdOutlineLensBlur />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                margin: "4px 16px 0 0",
              }}
              onClick={() => {
                setshowHighlight(true);
              }}
            >
              <MdOutlineHighlight />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                margin: "4px 16px 0 0",
              }}
              onClick={() => {
                let temparr = [];
                for (let p = 0; p < content.length; p++) {
                  if (content[p].id === id) {
                    continue;
                  } else {
                    temparr.push(content[p]);
                  }
                }
                undoRedoFunc();
                setcontent(temparr);
              }}
            >
              <MdDelete />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                margin: "4px 0 0 0",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setcurrentActive("");
              }}
            >
              <AiOutlineClose />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      <input
        type="file"
        accept="image/png, image/jpg, image/jpeg,image/jfif"
        style={{ display: "none" }}
        ref={imgref}
        onChange={(e) => {
          let temparr = [];
          for (let p = 0; p < content.length; p++) {
            if (content[p].id === id) {
              let tempobj = {
                photo: e.target.files[0],
                id: content[p].id,
                isDeleted: false,
                shadow: content[p].shadow,
                scolor: content[p].scolor,
                br: content[p].br,
                frame: content[p].frame,
                size: content[p].size,
                transform: content[p].transform,
                component: "image",
                position: content[p].position,
              };
              temparr.push(tempobj);
            } else {
              temparr.push(content[p]);
            }
          }
          undoRedoFunc();
          setcontent(temparr);
        }}
      />

      {showcropModal ? (
        <>
          <CropImageModal
            showcropModal={showcropModal}
            setshowcropModal={setshowcropModal}
          >
            <CropImage
              _img={photo}
              setshowcropModal={setshowcropModal}
              setcontent={setcontent}
              undoRedoFunc={undoRedoFunc}
              id={id}
              content={content}
            />
          </CropImageModal>
        </>
      ) : (
        ""
      )}
      {showBlurModal ? (
        <>
          <BlurImageModal
            showBlurModal={showBlurModal}
            setshowBlurModal={setshowBlurModal}
          >
            <BlurImage
              _img={photo}
              setshowBlurModal={setshowBlurModal}
              setcontent={setcontent}
              undoRedoFunc={undoRedoFunc}
              id={id}
              content={content}
              dm={dm}
            />
          </BlurImageModal>
        </>
      ) : (
        ""
      )}
      {showHighlight ? (
        <>
          <HighlightImageModal
            showHighlight={showHighlight}
            setshowHighlight={setshowHighlight}
          >
            <HighlightImage
              _img={photo}
              setshowHighlight={setshowHighlight}
              setcontent={setcontent}
              undoRedoFunc={undoRedoFunc}
              id={id}
              content={content}
              dm={dm}
            />
          </HighlightImageModal>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default ImageComponent;
