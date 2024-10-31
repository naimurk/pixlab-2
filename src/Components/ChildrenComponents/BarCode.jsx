import React from 'react'
import Barcode from '../Drag&Drop/Barcode'

const BarCode = ({  backColor, color, title, item }) => {
    return (
        <div style={{
            borderRadius: item.frame !== "macOS-Dark" && item.frame !== "macOS-Light" && item.frame !== "macOS-black" && item.frame !== "macOS-white" ? `${item.br}px` : "",
            border:
                item.frame === "photograph" ? "8px solid white" :
                    item.frame === "arc-dark" ? "6px solid rgb(0,0,0,0.5)" :
                        item.frame === "arc-light" ? "6px solid rgb(255,255,255,0.5)" :
                            item.frame !== "none" && item.frame !== "macOS-Dark" && item.frame !== "macOS-Light" && item.frame !== "macOS-black" && item.frame !== "macOS-white" ? `5px solid ${item.frame}`
                                : "none",
            borderBottom: item.frame === "photograph" ? "24px solid white" : "",

            overflow: "hidden",
        }} >

            <Barcode
                title={title}
                value={title}
                bgColor={backColor}
                fgColor={color}
            ></Barcode>
        </div>
    )
}

export default BarCode