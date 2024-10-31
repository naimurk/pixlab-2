import React from 'react'
import QRCode from 'react-qr-code'

const QRChild = ({ backColor, color, item }) => {
    return (
        <QRCode
            title={item.title}
            value={item.title}
            bgColor={backColor}
            fgColor={color}
            style={{
                height: "auto", maxWidth: "100%", width: "100%",
                padding: item.size < 21 ? "2px" : item.size < 100 ? "8px" : "12px",
                background: backColor,

                borderRadius: item.frame !== "macOS-Dark" && item.frame !== "macOS-Light" && item.frame !== "macOS-black" && item.frame !== "macOS-white" ? `${item.br}px` : "",

                border:
                    item.frame === "photograph" ? "8px solid white" :
                        item.frame === "arc-dark" ? "6px solid rgb(0,0,0,0.5)" :
                            item.frame === "arc-light" ? "6px solid rgb(255,255,255,0.5)" :
                                item.frame !== "none" && item.frame !== "macOS-Dark" && item.frame !== "macOS-Light" && item.frame !== "macOS-black" && item.frame !== "macOS-white" ? `5px solid ${item.frame}`
                                    : "none",
                borderBottom: item.frame === "photograph" ? "24px solid white" : "",

                overflow: "hidden",
            }}

        // size={size}
        />
    )
}

export default QRChild