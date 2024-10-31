import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineDrag } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import QRCode from "react-qr-code";

const QrCode = ({
  dm,
  currentActive,
  setcurrentActive,
  id,
  qrcode,
  setcurrentTag,
  setcontent,
  content,
  downloading,
  canvasWidth,
  canvasHeight,
  index,
  undoRedoFunc
}) => {
  const [qrDragging, setqrDragging] = useState(false);
  const [qrPosition, setqrPosition] = useState({ left: 0, top: 0 });
  const [qrStartX, setqrStartX] = useState(0);
  const [qrStartY, setqrStartY] = useState(0);
  const [dnone, setdnone] = useState(false);

  useEffect(() => {
    if (qrcode.position) {
      setqrPosition({
        left: (parseFloat(qrcode.position.left) / 100) * canvasWidth,
        top: (parseFloat(qrcode.position.top) / 100) * canvasHeight
      });
    }
  }, [qrcode.position, canvasWidth, canvasHeight]);
  const onTextMouseDown = (e) => {
    document.body.style.overflow = "hidden";
    setqrDragging(true);
    setqrStartX(e.clientX);
    setqrStartY(e.clientY);
  };

  const onTextMouseMove = (e) => {
    if (!qrDragging) return;
    const deltaX = e.clientX - qrStartX;
    const deltaY = e.clientY - qrStartY;
    setqrPosition((prevState) => ({
      left: prevState.left + deltaX,
      top: prevState.top + deltaY
    }));
    setqrStartX(e.clientX);
    setqrStartY(e.clientY);
  };

  const onTextMouseUp = () => {
    document.body.style.overflow = "auto";

    setqrDragging(false);
    // console.log((qrPosition.top / canvasHeight) * 100)
    const newArr = [...content];
    newArr[index] = {
      ...qrcode,
      position: {
        top: (qrPosition.top / canvasHeight) * 100,
        left: (qrPosition.left / canvasWidth) * 100
      }
    }; // update the shadow property of the selected qrcode
    undoRedoFunc();
    setcontent(newArr); // update the state with the new array
  };

  const onSubdivTouchStart = (e) => {
    if (currentActive !== id) return;

    e.preventDefault();
    document.body.style.overflow = "hidden";
    setqrDragging(true);
    const touch = e.touches[0];
    setqrStartX(touch.clientX);
    setqrStartY(touch.clientY);
  };

  const onSubdivTouchMove = (e) => {
    if (!qrDragging) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - qrStartX;
    const deltaY = touch.clientY - qrStartY;
    setqrPosition((prevState) => ({
      left: prevState.left + deltaX,
      top: prevState.top + deltaY
    }));
    setqrStartX(touch.clientX);
    setqrStartY(touch.clientY);
  };

  const onSubdivTouchEnd = () => {
    document.body.style.overflow = "auto";
    setqrDragging(false);

    const newArr = [...content];
    newArr[index] = {
      ...qrcode,
      position: {
        top: (qrPosition.top / canvasHeight) * 100,
        left: (qrPosition.left / canvasWidth) * 100
      }
    }; // update the shadow property of the selected qrcode
    undoRedoFunc();
    setcontent(newArr); // update the state with the new array
  };

  useEffect(() => {
    if (currentActive !== id) {
      setqrDragging(false);
    }
  }, [currentActive]);

  const handleChange = (event) => {
    const newText = event.target.innerText;
    // console.log(newText);

    let temparr = [];
    for (let p = 0; p < content.length; p++) {
      // console.log(content);
      // console.log(content[p].id);
      if (content[p].id === id) {
        let tempobj = {
          id: content[p].id,
          isDeleted: false,
          shadow: content[p].shadow,
          scolor: content[p].scolor,
          br: content[p].br,
          frame: content[p].frame,
          fontSize: content[p].fontSize,
          fontFamily: content[p].fontFamily,
          fontcolor: content[p].fontcolor,
          transform: content[p].transform,
          component: content[p].component,
          position: content[p].position,
          txt: newText
        };
        temparr.push(tempobj);
      } else {
        temparr.push(content[p]);
      }
    }
    // console.log(temparr);
    // console.log(id);
    undoRedoFunc();
    setcontent(temparr);
  };

  return (
    <span
      onInput={handleChange}
      onClick={(e) => {
        e.stopPropagation();
        setcurrentActive(id);
        setcurrentTag("qrcode");
      }}
      // contentEditable={true}
      style={{
        position: "absolute",
        left: qrPosition.left,
        top: qrPosition.top,
        // padding: "0 8px",
        lineHeight: 1.1,
        color: qrcode.fontcolor,
        wordWrap: "break-word",
        whiteSpace: "pre-wrap",
        // wordWrap: "break-word",
        // whiteSpace: "pre-wrap",
        wordBreak: "break-all",
        overflowWrap: "break-word", // add this property
        border:
        qrcode.frame !== "none" &&
          qrcode.frame !== "macOS-Dark" &&
          qrcode.frame !== "macOS-Light" &&
          qrcode.frame !== "macOS-black" &&
          qrcode.frame !== "macOS-white"
          ? `5px solid ${qrcode.frame}`
          : "none",
        backgroundColor: qrcode.background || "transparent",
        flexDirection: "column",
        alignItems: "center",
        // display: "inline-block",
        display: qrcode.isDeleted ? "none" : "flex",

        boxShadow: `0 0px ${qrcode.shadow}px ${
          qrcode.shadow > 0 ? "2px" : "0px"
        } ${qrcode.scolor}`,
        cursor: "default",
        outline: "none",
        width: `${qrcode.size}%`
      }}
      onTouchStart={onSubdivTouchStart}
      onTouchMove={onSubdivTouchMove}
      onTouchEnd={onSubdivTouchEnd}
      onMouseDown={onTextMouseDown}
      onMouseMove={onTextMouseMove}
      onMouseUp={onTextMouseUp}
    >
      {qrcode.frame === "macOS-Dark" ? (
        <img
          src="/macOS-dark.jfif"
          style={{
            width: `100%`,
            height: "auto",
            borderRadius:
              qrcode.frame === "none"
                ? `${qrcode.br}px`
                : `${qrcode.br}px ${qrcode.br}px 0 0`
          }}
          alt=""
        />
      ) : (
        ""
      )}
      {qrcode.frame === "macOS-Light" ? (
        <img
          src="/macOS-light.jfif"
          style={{
            width: `100%`,
            height: "auto",
            borderRadius:
              qrcode.frame === "none"
                ? `${qrcode.br}px`
                : `${qrcode.br}px ${qrcode.br}px 0 0`
          }}
          alt=""
        />
      ) : (
        ""
      )}
      {qrcode.frame === "macOS-black" ? (
        <img
          src="/macOS-black.png"
          style={{
            width: `100%`,
            height: "auto",
            borderRadius:
              qrcode.frame === "none"
                ? `${qrcode.br}px`
                : `${qrcode.br}px ${qrcode.br}px 0 0`
          }}
          alt=""
        />
      ) : (
        ""
      )}
      {qrcode.frame === "macOS-white" ? (
        <img
          src="/macOS-white.png"
          style={{
            width: `100%`,
            height: "auto",
            borderRadius:
              qrcode.frame === "none"
                ? `${qrcode.br}px`
                : `${qrcode.br}px ${qrcode.br}px 0 0`
          }}
          alt=""
        />
      ) : (
        ""
      )}

      <QRCode
        title={qrcode.value}
        value={qrcode.value}
        bgColor={qrcode.background}
        fgColor={qrcode.color}
        style={{
          height: "auto",
          maxWidth: "100%",
          width: "100%",
          padding: qrcode.size < 21 ? "2px" : qrcode.size < 100 ? "8px" : "12px"
        }}
      />

      <div
        style={{
          position: "absolute",

          top: qrcode.position.top > 70 ? "-50%" : "100%",
          left: 0,
          backgroundColor: dm ? "rgb(20,20,20)" : "whitesmoke",
          color: dm ? "white" : "black",
          display:
            currentActive && currentActive === id && !downloading
              ? "flex"
              : "none",
          justifyContent: "space-between",
          padding: "4px 16px",
          borderRadius: "1rem",
          zIndex: 999999,
          // zIndex: "999999",
          marginTop: "4px"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            margin: "4px 16px 0 0"
          }}
          onClick={() => {
            try {
              setdnone(true);
              let temparr = [];
              console.log(content.length);
              for (let p = 0; p < content.length; p++) {
                if (content[p].id === id) {
                  continue;
                } else {
                  temparr.push(content[p]);
                }
              }

              undoRedoFunc();
              setcontent(temparr);
            } catch (error) {
              console.log(error);
            }
          }}
        >
          <MdDelete size={14} />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "4px 16px 0 0",
            cursor: "move",
            ":hover": {
              cursor: "pointer"
            }
          }}
        >
          <AiOutlineDrag size={14} />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            margin: "4px 0 0 0"
          }}
          onClick={(e) => {
            e.stopPropagation();
            setcurrentActive("");
          }}
        >
          <AiOutlineClose size={14} />
        </div>
      </div>
    </span>
  );
};

export default QrCode;
