import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineDrag } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { html } from "@codemirror/lang-html";
import { java } from "@codemirror/lang-java";
import { css } from "@codemirror/lang-css";
import { cpp } from "@codemirror/lang-cpp";
import { php } from "@codemirror/lang-php";
import { wast } from "@codemirror/lang-wast";
import { json } from "@codemirror/lang-json";
import { markdown } from "@codemirror/lang-markdown";
import { rust } from "@codemirror/lang-rust";
import { sql } from "@codemirror/lang-sql";
import { xml } from "@codemirror/lang-xml";

import { okaidia } from "@uiw/codemirror-theme-okaidia";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { darcula } from "@uiw/codemirror-theme-darcula";
import { androidstudio } from "@uiw/codemirror-theme-androidstudio";
import { atomone } from "@uiw/codemirror-theme-atomone";
import { sublime } from "@uiw/codemirror-theme-sublime";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import { tokyoNightStorm } from "@uiw/codemirror-theme-tokyo-night-storm";
import { material } from "@uiw/codemirror-theme-material";
import { abcdef } from "@uiw/codemirror-theme-abcdef";
import { aura } from "@uiw/codemirror-theme-aura";
import { githubLight, githubDark } from "@uiw/codemirror-theme-github";
import { nord } from "@uiw/codemirror-theme-nord";
import { tomorrowNightBlue } from "@uiw/codemirror-theme-tomorrow-night-blue";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

const LANGUAGES = {
  javascript: [javascript({ jsx: true })],
  html: [html()],
  python: [python()],
  java: [java()],
  css: [css()],
  cpp: [cpp()],
  json: [json()],
  markdown: [markdown()],
  rust: [rust()],
  sql: [sql()],
  xml: [xml()],
  wast: [wast()],
  php: [php()]
  // Add more languages and their extensions here
};

const Code = ({
  dm,
  currentActive,
  setcurrentActive,
  id,
  item,
  setcurrentTag,
  setcontent,
  content,
  downloading,
  index,
  canvasWidth,
  canvasHeight,
  undoRedoFunc
}) => {
  const [textDragging, settextDragging] = useState(false);
  const [textPosition, settextPosition] = useState({ left: 0, top: 0 });
  const [textStartX, settextStartX] = useState(0);
  const [textStartY, settextStartY] = useState(0);
  const [dnone, setdnone] = useState(false);
  const [t, sett] = useState("Code");

  useEffect(() => {
    if (item.position) {
      settextPosition({
        left: (parseFloat(item.position.left) / 100) * canvasWidth,
        top: (parseFloat(item.position.top) / 100) * canvasHeight
      });
    }
  }, [item.position, canvasWidth, canvasHeight]);

  useEffect(() => {
    sett(item.txt);
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
      top: prevState.top + deltaY
    }));
    settextStartX(e.clientX);
    settextStartY(e.clientY);
  };

  const onTextMouseUp = () => {
    document.body.style.overflow = "auto";

    settextDragging(false);

    const newArr = [...content];
    newArr[index] = {
      ...item,
      position: {
        top: (textPosition.top / canvasHeight) * 100,
        left: (textPosition.left / canvasWidth) * 100
      }
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
      top: prevState.top + deltaY
    }));
    settextStartX(touch.clientX);
    settextStartY(touch.clientY);
  };

  const onSubdivTouchEnd = () => {
    document.body.style.overflow = "auto";
    settextDragging(false);

    const newArr = [...content];
    newArr[index] = {
      ...item,
      position: {
        top: (textPosition.top / canvasHeight) * 100,
        left: (textPosition.left / canvasWidth) * 100
      }
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
          fontShadow: content[p].fontShadow,
          bold: content[p].bold,
          italic: content[p].italic,
          underline: content[p].underline,
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
    <div
      onClick={(e) => {
        e.stopPropagation();
        setcurrentActive(id);
        setcurrentTag("code");
      }}
      style={{
        display: "flex",
        flexDirection: "column",
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
          item.frame !== "laptop-black"
            ? `0 0px ${item.shadow}px ${item.shadow > 0 ? "2px" : "0px"} ${
                item.scolor
              }`
            : "",

        maxWidth: "100%",
        position: "absolute",
        // left: `${(subdivPosition.left / canvasWidth) * 100}% `,
        // top: `${(subdivPosition.top / canvasHeight) * 100}%`,
        transform: item.transform,
        left: textPosition.left,
        top: textPosition.top,
        width: `${item.size}%`
        // overflow:"hidden"
      }}
      onTouchStart={onSubdivTouchStart}
      onTouchMove={onSubdivTouchMove}
      onTouchEnd={onSubdivTouchEnd}
      onMouseDown={onTextMouseDown}
      onMouseMove={onTextMouseMove}
      onMouseUp={onTextMouseUp}
    >
      {item.frame !== "none" ? "" : ""}
      {item.frame === "macOS-Dark" ? (
        <img
          src="/macOS-dark.jfif"
          style={{
            width: "100%",
            height: "auto",
            borderRadius:
              item.frame === "none"
                ? `${(item.br / 100) * canvasWidth}px`
                : `${(item.br / 100) * canvasWidth}px ${
                    (item.br / 100) * canvasWidth
                  }px 0 0`
          }}
          alt=""
        />
      ) : (
        ""
      )}
      {item.frame === "macOS-Light" ? (
        <img
          src="/macOS-light.jfif"
          style={{
            width: "100%",
            height: "auto",
            borderRadius:
              item.frame === "none"
                ? `${(item.br / 100) * canvasWidth}px`
                : `${(item.br / 100) * canvasWidth}px ${
                    (item.br / 100) * canvasWidth
                  }px 0 0`
          }}
          alt=""
        />
      ) : (
        ""
      )}
      {item.frame === "macOS-black" ? (
        <img
          src="/macOS-black.png"
          style={{
            width: "100%",
            height: "auto",
            borderRadius:
              item.frame === "none"
                ? `${(item.br / 100) * canvasWidth}px`
                : `${(item.br / 100) * canvasWidth}px ${
                    (item.br / 100) * canvasWidth
                  }px 0 0`
          }}
          alt=""
        />
      ) : (
        ""
      )}
      {item.frame === "macOS-white" ? (
        <img
          src="/macOS-white.png"
          style={{
            width: "100%",
            height: "auto",
            borderRadius:
              item.frame === "none"
                ? `${(item.br / 100) * canvasWidth}px`
                : `${(item.br / 100) * canvasWidth}px ${
                    (item.br / 100) * canvasWidth
                  }px 0 0`
          }}
          alt=""
        />
      ) : (
        ""
      )}

      <CodeMirror
        onClick={(e) => {
          e.stopPropagation();
          setcurrentActive(id);
          setcurrentTag("code");
        }}
        value={item.code}
        theme={
          item.codetheme == "okaidia"
            ? okaidia
            : item.codetheme == "androidstudio"
            ? androidstudio
            : item.codetheme == "atomone"
            ? atomone
            : item.codetheme == "darcula"
            ? darcula
            : item.codetheme == "sublime"
            ? sublime
            : item.codetheme == "tokyoNight"
            ? tokyoNight
            : item.codetheme == "tokyoNightStorm"
            ? tokyoNightStorm
            : item.codetheme == "material"
            ? material
            : item.codetheme == "dracula"
            ? dracula
            : item.codetheme == "githubDark"
            ? githubDark
            : item.codetheme == "githubLight"
            ? githubLight
            : item.codetheme == "nord"
            ? nord
            : item.codetheme == "aura"
            ? aura
            : item.codetheme == "abcdef"
            ? abcdef
            : item.codetheme == "tomorrowNightBlue"
            ? tomorrowNightBlue
            : item.codetheme == "vscodeDark"
            ? vscodeDark
            : githubDark
        }
        extensions={LANGUAGES[item.lang] || []}
        basicSetup={{
          lineNumbers: item.lineNo,
          foldGutter: false,
          indentOnInput: true
        }}
        onChange={(e) => {
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
                transform: content[p].transform,
                component: content[p].component,
                position: content[p].position,
                code: e,
                codetheme: content[p].codetheme,
                lang: content[p].lang,
                lineNo: content[p].lineNo,
                size: content[p].size
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
        }}
        style={{
          overflow: "hidden",
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
              : "none"
        }}
      />

      <div
        style={{
          position: "absolute",
          top: item.position.top > 70 ? "-10%" : "101%",
          left:
            // item.position.left > 70 ? "-40%":
            // item.position.left > 50 ? "-30%":
            // item.position.left < 20 ? "100%":
            // item.position.left < 40 ? "50%":
            0,
          backgroundColor: dm ? "rgb(20,20,20)" : "whitesmoke",
          color: dm ? "white" : "black",
          display:
            currentActive && currentActive === id && !downloading
              ? "flex"
              : "none",
          justifyContent: "space-between",
          padding: "4px 16px",
          zIndex: 999999,
          borderRadius: "1rem"
          // zIndex: "999999",
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
              for (let p = 0; p < content.length; p++) {
                // console.log(content);
                // console.log(content[p].id);
                if (content[p].id === id) {
                  continue;
                } else {
                  temparr.push(content[p]);
                }
              }
              // console.log(temparr);
              // console.log(id);
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
            ":hover": {
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
            margin: "4px 0 0 0"
          }}
          onClick={(e) => {
            e.stopPropagation();
            setcurrentActive("");
          }}
        >
          <AiOutlineClose size={16} />
        </div>
      </div>
    </div>
  );
};

export default Code;
