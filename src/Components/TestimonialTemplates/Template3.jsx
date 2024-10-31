import React, { useState } from 'react'
import {  FaRegStar, FaStar } from 'react-icons/fa'
import TextareaAutosize from 'react-textarea-autosize';

const Template3 = ({dm, color, backColor, profileImg, description, title, platform, setprofileImgFunc, setdescription, settitle, review, setreview, showStars }) => {

    const [starRating, setstarRating] = useState(5)
    const stars = Array(5).fill(0)
    const [hoverValue, setHoverValue] = useState(undefined);

    const handleMouseOver = newHoverValue => {
        setHoverValue(newHoverValue)
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }

    const handleClick = (value) => {
        setstarRating(value)
    }

    return (


        <div style={{ display: "flex", flexDirection: "column", backgroundColor: backColor, padding: "16px", fontFamily: "sans-serif", cursor: "pointer", }} >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "column", }} >

                {
                    profileImg?.name?.length > 0 ?
                        <img src={URL.createObjectURL(profileImg)} onClick={setprofileImgFunc} style={{ width: '100%', borderRadius: "4px" }}  ></img>
                        :
                        <img src='/Elon.jpg' onClick={setprofileImgFunc} style={{ width: '100%', borderRadius: "4px" }} ></img>

                }

                <input placeholder="Name eg: John Doe" value={title} onChange={(e) => settitle(e.target.value)} style={{ marginBottom: "0px", fontSize: "16 px", fontWeight: "600", outline: "none", border: "none", background: "transparent", color: color, display: "inline-block", boxSizing: "border-box", width: "100%", marginTop: "8px", textAlign: "center" }} ></input>
                <input placeholder="Bio eg: Engineer" value={description} onChange={(e) => setdescription(e.target.value)} style={{ marginBottom: "0px", fontSize: "14px", whiteSpace: 'pre-wrap', wordBreak: "break-word", outline: "none", border: "none", background: "transparent", color: color, display: "inline-block", width: "100%", textAlign: "center",fontWeight: "500", }} >
                </input>
            </div>
            <div style={{ margin: 0, display: showStars ? 'flex' : 'none', flexDirection: 'row', alignItems: "center", marginTop: "4px", justifyContent: "center" }}>
                {stars.map((_, index) => {
                    return (
                        <>
                            {
                                (hoverValue || starRating) > index ?
                                    <FaStar
                                        key={index}
                                        size={18}
                                        onClick={() => { return (handleClick(index + 1)) }}
                                        onMouseOver={() => handleMouseOver(index + 1)}
                                        onMouseLeave={handleMouseLeave}
                                        color='orange'

                                        style={{
                                            margin: "0 4px 0 0",
                                            cursor: "pointer",
                                            padding: '0rem'
                                        }}
                                    /> :
                                    <FaRegStar
                                        key={index}
                                        size={18}
                                        onClick={() => { return (handleClick(index + 1)) }}
                                        onMouseOver={() => handleMouseOver(index + 1)}
                                        onMouseLeave={handleMouseLeave}
                                        color='gray'

                                        style={{
                                            margin: "0 4px 0 0",
                                            cursor: "pointer",
                                            padding: '0rem'
                                        }}
                                    />

                            }

                        </>
                    )
                })}
            </div>

            <TextareaAutosize minRows={1} placeholder="Review eg: I like this product" value={review} onChange={(e) => setreview(e.target.value)} style={{ fontSize: "14px", marginTop: "8px", whiteSpace: 'pre-wrap', wordBreak: "break-word", background: "transparent", border: "none", outline: "none", color: color, resize: "none" }} >
            </TextareaAutosize>
        </div>




    )
}

export default Template3