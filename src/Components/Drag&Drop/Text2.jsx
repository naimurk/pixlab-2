import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineDrag } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

const Text = ({
  dm,
  currentActive,
  setcurrentActive,
  id,
  text,
  setcurrentTag,
  setcontent,
  content,
  downloading,
  index,
  canvasWidth,
  canvasHeight,
  undoRedoFunc,
}) => {
  const [textDragging, settextDragging] = useState(false);
  const [textPosition, settextPosition] = useState({ left: 0, top: 0 });
  const [textStartX, settextStartX] = useState(0);
  const [textStartY, settextStartY] = useState(0);
  const [dnone, setdnone] = useState(false);
  const [t, sett] = useState("Text");

  useEffect(() => {
    if (text.position) {
      settextPosition({
        left: (parseFloat(text.position.left) / 100) * canvasWidth,
        top: (parseFloat(text.position.top) / 100) * canvasHeight,
      });
    }
  }, [text.position, canvasWidth, canvasHeight]);

  useEffect(() => {
    sett(text.txt);
  }, []);

  const onTextMouseDown = (e) => {
    document.body.style.overflow = "hidden";
    settextDragging(true);
    settextStartX(e.clientX);
    settextStartY(e.clientY);
  };

  const onTextMouseMove = (e) => {
    if (!textDragging) return;
    const deltaX = e.clientX - textStartX;
    const deltaY = e.clientY - textStartY;
    settextPosition((prevState) => ({
      left: prevState.left + deltaX,
      top: prevState.top + deltaY,
    }));
    settextStartX(e.clientX);
    settextStartY(e.clientY);
  };

  const onTextMouseUp = () => {
    document.body.style.overflow = "auto";
    settextDragging(false);
    const newArr = [...content];
    newArr[index] = {
      ...text,
      position: {
        top: (textPosition.top / canvasHeight) * 100,
        left: (textPosition.left / canvasWidth) * 100,
      },
    }; // update the shadow property of the selected item
    undoRedoFunc();
    setcontent(newArr); // update the state with the new array
  };

  const onSubdivTouchStart = (e) => {
    e.preventDefault();
    if (currentActive !== id) return;
    document.body.style.overflow = "hidden";
    settextDragging(true);
    const touch = e.touches[0];
    settextStartX(touch.clientX);
    settextStartY(touch.clientY);
  };

  const onSubdivTouchMove = (e) => {
    if (!textDragging) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - textStartX;
    const deltaY = touch.clientY - textStartY;
    settextPosition((prevState) => ({
      left: prevState.left + deltaX,
      top: prevState.top + deltaY,
    }));
    settextStartX(touch.clientX);
    settextStartY(touch.clientY);
  };

  const onSubdivTouchEnd = () => {
    document.body.style.overflow = "auto";
    settextDragging(false);

    const newArr = [...content];
    newArr[index] = {
      ...text,
      position: {
        top: (textPosition.top / canvasHeight) * 100,
        left: (textPosition.left / canvasWidth) * 100,
      },
    }; // update the shadow property of the selected item
    undoRedoFunc();
    setcontent(newArr); // update the state with the new array
  };

  useEffect(() => {
    if (currentActive !== id) {
      settextDragging(false);
    }
  }, [currentActive]);

  const handleChange = (event) => {
    const newText = event.target.innerText;
    let temparr = [];
    for (let p = 0; p < content.length; p++) {
      if (content[p].id === id) {
        let tempobj = {
          id: content[p].id,
          isDeleted: false,
          shadow: content[p].shadow,
          scolor: content[p].scolor,
          br: content[p].br,
          frame: content[p].frame,
          fontSize: content[p].fontSize,
          fontShadow: content[p].fontShadow,
          bold: content[p].bold,
          italic: content[p].italic,
          underline: content[p].underline,
          fontFamily: content[p].fontFamily,
          fontcolor: content[p].fontcolor,
          transform: content[p].transform,
          component: content[p].component,
          position: content[p].position,
          txt: newText,
        };
        temparr.push(tempobj);
      } else {
        temparr.push(content[p]);
      }
    }
    undoRedoFunc();
    setcontent(temparr);
  };

  return (
    <span
      onClick={(e) => {
        e.stopPropagation();
        setcurrentActive(id);
        setcurrentTag("text");
      }}
      style={{
        position: "absolute",
        left: textPosition.left,
        top: textPosition.top,
      }}
      onTouchStart={onSubdivTouchStart}
      onTouchMove={onSubdivTouchMove}
      onTouchEnd={onSubdivTouchEnd}
      onMouseDown={onTextMouseDown}
      onMouseMove={onTextMouseMove}
      onMouseUp={onTextMouseUp}
    >
      <span
        className={text?.fontFamily ? text.fontFamily : ""}
        onInput={handleChange}
        contentEditable={true}
        style={{
          fontSize: `${(text.fontSize / 100) * canvasWidth}px`,
          // textShadow: text.shadow,
          lineHeight: 1.1,
          color: text.fontcolor,
          wordWrap: "break-word",
          whiteSpace: "pre-wrap",
          display: text.isDeleted ? "none" : "",
          textShadow: `${text.fontShadow}px ${text.fontShadow}px black`,
          fontWeight: text.bold ? "bold" : "normal",
          fontStyle: text.italic ? "italic" : "normal",
          textDecoration: text.underline ? "underline" : "none",
        }}
      >
        {t}
      </span>

      <div
        style={{
          position: "absolute",
          top: text.position.top > 70 ? "-110%" : "110%",
          left: 0,
          backgroundColor: dm ? "rgb(20,20,20)" : "whitesmoke",
          color: dm ? "white" : "black",
          display:
            currentActive && currentActive === id && !downloading
              ? "flex"
              : "none",
          justifyContent: "space-between",
          padding: "4px 16px",
          zIndex: 999999,
          borderRadius: "1rem",
          // zIndex: "999999",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            margin: "4px 16px 0 0",
          }}
          onClick={() => {
            try {
              setdnone(true);
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
            } catch (error) {
              console.log(error);
            }
          }}
        >
          <MdDelete size={16} />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "4px 16px 0 0",
            cursor: "move",
            ':hover': {
    cursor: "pointer"
  }
          }}
        >
          <AiOutlineDrag size={16} />
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
          <AiOutlineClose size={16} />
        </div>
      </div>
    </span>
  );
};

export default Text;
