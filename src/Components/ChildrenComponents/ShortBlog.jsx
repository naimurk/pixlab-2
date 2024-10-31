import React, { useRef } from 'react'

const ShortBlog = ({ frame, br, shadow, transform, code, theme, language, lineNo, glassy, backColor, color, title, showQrLabel, qrlabel, item, handleImageChange , index}) => {
    const imgref = useRef()
    return (
        <div style={{ background: item.background, color: item.color, width:"100%" ,
        
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
            <input name='photo' type="file" accept="image/png, image/jpg, image/jpeg,image/jfif" style={{ display: 'none' }} ref={imgref}
                onChange={(e) => handleImageChange(e, item, index)}
            />
            <img onClick={() => imgref.current.click()} src={item.photo?.name?.length > 0 ? URL.createObjectURL(item.photo) : "/FeatureGraphic.webp"} style={{ width: "100%" }} alt="" />
            <div style={{ padding: '16px' }} >
                <h4 className='text-xl font-semibold' contentEditable={true} style={{ outline: 'none', border: 'none', margin: 0, marginBottom: '8px' }} >Captivating Title</h4>
                <p contentEditable={true} style={{ outline: 'none', border: 'none', margin: 0, marginBottom: '8px', opacity: "0.9" }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum est nobis voluptatibus reiciendis obcaecati asperiores culpa molestiae officia nam quo fugit id molestias quod laboriosam iusto, pariatur facere dolorum itaque at possimus veritatis? Aliquam quam, consectetur nobis nostrum ad maiores omnis sint aut mollitia inventore consequuntur, corrupti ut. Aperiam, rerum!
                </p>
            </div>
        </div>


    )
}

export default ShortBlog