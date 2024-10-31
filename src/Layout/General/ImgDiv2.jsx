import React, { useRef } from "react";

const ImgDiv2 = ({
  isDeleted,
  id,
  currentActive,
  setcurrentActive,
  item,
  setcurrentTag,
  setcontent,
  content,
  undoRedoFunc,
  children,
}) => {
  const imgDivRef = useRef();

  const imgref = useRef();

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
          borderRadius: `${item.br}px`,

          boxShadow:
            item.frame !== "iphone-15-pro" && item.frame !== "macbook-pro"
              ? `0 ${item.shadow > 0 ? "4px" : 0} ${item.shadow}px ${
                  item.shadow > 0 ? "0px" : "0px"
                } ${item.scolor}`
              : "",

          position: "relative",
          transform: item.transform,
          overflow:
            item.frame === "iphone-15-pro" || item.frame === "macbook-pro"
              ? ""
              : "hidden",
          scale: item.scale,
          transition: "0.25s",
        }}
        ref={imgDivRef}
      >
        {item.frame === "macOS-black" ? (
          <>
            <div
              style={{
                width: "100%",
                position: "relative",
                background: "black",
                borderRadius:
                  item.frame === "none"
                    ? `${item.br}px`
                    : `${item.br}px ${item.br}px 0 0`,
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
                    ? `${item.br}px`
                    : `${item.br}px ${item.br}px 0 0`,
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

        {children}

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
    </>
  );
};

export default ImgDiv2;
