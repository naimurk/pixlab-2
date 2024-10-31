import React, { useRef } from 'react'
import Iphone15Blue from './devices/Iphone15Blue'
import MacBookPro from './devices/MacBookPro'

const DeviceMockupShot = ({ item, handleImageChange, index, content, setcontent, undoRedoFunc, setCanvasStyles }) => {
    const imgref = useRef()

    return (
        <>
            <input name='photo' type="file" accept="image/png, image/jpg, image/jpeg,image/jfif" style={{ display: 'none' }} ref={imgref}
                onChange={(e) => handleImageChange(e, item, index, true)}
            />
            <div onClick={() => imgref.current.click()}>
                {
                    item.frame === "iphone-15-pro" ?
                        <Iphone15Blue item={item} ></Iphone15Blue>


                        :
                        item.frame === "macbook-pro" ?
                            <MacBookPro item={item} ></MacBookPro>
                            :
                            <img src={item.photo ? item.photo : "/FeatureGraphic.webp"} style={{
                                width: "100%",
                                borderRadius: item.frame !== "macOS-Dark" && item.frame !== "macOS-Light" && item.frame !== "macOS-black" && item.frame !== "macOS-white" ? `${item.br}px` : "",
                                border:
                                    item.frame === "photograph" ? "8px solid white" :
                                        item.frame === "arc-dark" ? "6px solid rgb(0,0,0,0.5)" :
                                            item.frame === "arc-light" ? "6px solid rgb(255,255,255,0.5)" :
                                                item.frame !== "none" && item.frame !== "macOS-Dark" && item.frame !== "macOS-Light" && item.frame !== "macOS-black" && item.frame !== "macOS-white" ? `5px solid ${item.frame}`
                                                    : "none",
                                borderBottom: item.frame === "photograph" ? "24px solid white" : "",

                                overflow: "hidden",
                            }} alt="" />

                }
            </div>

        </>


    )
}

export default DeviceMockupShot