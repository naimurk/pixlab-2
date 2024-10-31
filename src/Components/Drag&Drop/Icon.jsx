import React, { useEffect, useState } from 'react'
import { AiOutlineClose, AiOutlineDrag } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import * as MdIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';

const Icon = ({dm, currentActive, setcurrentActive, id, icon, setcurrentTag, setcontent, content, downloading, index, canvasWidth, canvasHeight, iconName,undoRedoFunc }) => {

    const [iconDragging, seticonDragging] = useState(false)
    const [iconPosition, seticonPosition] = useState({ left: 0, top: 0 });
    const [iconStartX, seticonStartX] = useState(0)
    const [iconStartY, seticonStartY] = useState(0)
    const [dnone, setdnone] = useState(false)

    useEffect(() => {
        if (icon.position) {
            seticonPosition({
                left: (parseFloat(icon.position.left) / 100) * canvasWidth,
                top: (parseFloat(icon.position.top) / 100) * canvasHeight
            })
        }
    }, [icon.position,canvasWidth, canvasHeight])

    const oniconMouseDown = (e) => {
        document.body.style.overflow = 'hidden';
        seticonDragging(true);
        seticonStartX(e.clientX);
        seticonStartY(e.clientY);
    };

    const oniconMouseMove = (e) => {
        if (!iconDragging) return;
        const deltaX = e.clientX - iconStartX;
        const deltaY = e.clientY - iconStartY;
        seticonPosition((prevState) => ({
            left: prevState.left + deltaX,
            top: prevState.top + deltaY,
        }));
        seticonStartX(e.clientX);
        seticonStartY(e.clientY);
    };

    const oniconMouseUp = () => {
        document.body.style.overflow = 'auto';

        seticonDragging(false);


        const newArr = [...content];
        newArr[index] = {
            ...icon, position: {
                top: (iconPosition.top / canvasHeight) * 100,
                left: (iconPosition.left / canvasWidth) * 100,
            }
        }; // update the shadow property of the selected item
        undoRedoFunc()
        setcontent(newArr); // update the state with the new array
    };


    const onSubdivTouchStart = (e) => {
        if (currentActive !== id) return;

        e.preventDefault();
        document.body.style.overflow = 'hidden';
        seticonDragging(true);
        const touch = e.touches[0];
        seticonStartX(touch.clientX);
        seticonStartY(touch.clientY);
    };

    const onSubdivTouchMove = (e) => {
        if (!iconDragging) return;
        const touch = e.touches[0];
        const deltaX = touch.clientX - iconStartX;
        const deltaY = touch.clientY - iconStartY;
        seticonPosition((prevState) => ({
            left: prevState.left + deltaX,
            top: prevState.top + deltaY,
        }));
        seticonStartX(touch.clientX);
        seticonStartY(touch.clientY);
    };

    const onSubdivTouchEnd = () => {
        document.body.style.overflow = 'auto';
        seticonDragging(false);

        const newArr = [...content];
        newArr[index] = {
            ...icon, position: {
                top: (iconPosition.top / canvasHeight) * 100,
                left: (iconPosition.left / canvasWidth) * 100,
            }
        }; // update the shadow property of the selected item
        undoRedoFunc()
        setcontent(newArr); // update the state with the new array
    };

    useEffect(() => {

        if (currentActive !== id) {
            seticonDragging(false)
        }
    }, [currentActive])

    const handleChange = (event) => {
        const newicon = event.target.innericon;
        // console.log(newicon);

        let temparr = []
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
                    txt: newicon,


                }
                temparr.push(tempobj)
            } else {
                temparr.push(content[p])
            }

        }
        // console.log(temparr);
        // console.log(id);
        undoRedoFunc()
        setcontent(temparr)
    };

    return (

        <span onInput={handleChange} onClick={(e) => {
            e.stopPropagation()
            setcurrentActive(id)
            setcurrentTag("icon")
        }} style={{
            position: 'absolute',
            left: iconPosition.left,
            top: iconPosition.top,
            // background:"black",

            // padding: "0 8px",
            // fontSize: `${icon.fontSize}px`,
            fontFamily: icon.fontFamily,
            iconShadow: icon.shadow,
            lineHeight: 1.1,
            color: icon.fontcolor,
            wordWrap: "break-word",
            whiteSpace: "pre-wrap",
            display: icon.isDeleted ? "none" : "",
            transform: `rotate(${icon.transform}deg)`,
            cursor: "default",
            width: `${icon.size}%`,
            border: currentActive == id ? `1px solid ${icon.fontcolor}` : "none"

        }}
            onTouchStart={onSubdivTouchStart}
            onTouchMove={onSubdivTouchMove}
            onTouchEnd={onSubdivTouchEnd}


            onMouseDown={oniconMouseDown}
            onMouseMove={oniconMouseMove}
            onMouseUp={oniconMouseUp}>

            {
                React.createElement(iconName.startsWith('Md') ? MdIcons[iconName] : FaIcons[iconName], {
                    // size:  icon.size,
                    size: "100%",
                    color: icon.fontcolor,
                })
            }




            <div style={{ position: "absolute",
                                    top:
                                    icon.position.top > 70 ? "-50%":
                                    icon.position.top > 50 ? "50%":


                                    "110%", left:
                                    // icon.position.left > 70 ? "-50%":
                                    // icon.position.left > 50 ? "-50%":
                                    // icon.position.left < 20 ? "100%":
                                    // icon.position.left < 40 ? "50%":
                                    0
                                    ,
            backgroundColor:dm? "rgb(20,20,20)":"whitesmoke", color: dm ? "white" : "black", display: currentActive && currentActive === id && !downloading ? "flex" : "none", justifyContent: 'space-between', padding: "4px 16px", zIndex: 999999, borderRadius: "1rem" }} >

                <div style={{ display: "flex", alignItems: "center", cursor: "pointer", margin: "4px 16px 0 0" }} onClick={() => {
                    try {
                        setdnone(true)
                        let temparr = []
                        for (let p = 0; p < content.length; p++) {

                            // console.log(content);
                            // console.log(content[p].id);
                            if (content[p].id === id) {
                                // let tempobj = {
                                //     id: content[p].id,
                                //     isDeleted: true,
                                //     shadow: content[p].shadow,
                                //     scolor: content[p].scolor,
                                //     br: content[p].br,
                                //     frame: content[p].frame,
                                //     fontSize: content[p].fontSize,
                                //     fontFamily: content[p].fontFamily,
                                //     fontcolor: content[p].fontcolor,
                                //     transform: content[p].transform,
                                //     txt: content[p].txt,
                                //     component: content[p].component,
                                //     position: content[p].position,
                                //     value: content[p].value,
                                // }
                                // temparr.push(tempobj)

                                continue

                            } else {
                                temparr.push(content[p])
                            }

                        }
                        // console.log(temparr);
                        // console.log(id);
                        undoRedoFunc()
                        setcontent(temparr)
                    } catch (error) {
                        console.log(error);
                    }

                }} >
                    <MdDelete size={16} />
                </div>

                <div style={{ display: "flex", alignItems: "center", margin: "4px 16px 0 0",cursor:"move" }}  >
                    <AiOutlineDrag size={16} />
                </div>
                <div style={{ display: "flex", alignItems: "center", cursor: "pointer", margin: "4px 0 0 0" }} onClick={(e) => {
                    e.stopPropagation()
                    setcurrentActive("")
                }} >
                    <AiOutlineClose size={16} />
                </div>

            </div>


        </span>
    )
}

export default Icon


