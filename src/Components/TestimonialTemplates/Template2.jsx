import React, { useState } from 'react'
import { FaExternalLinkAlt, FaFacebook, FaLinkedin, FaProductHunt, FaReddit, FaRegStar, FaStar, FaTwitter } from 'react-icons/fa'
import TextareaAutosize from 'react-textarea-autosize';

const Template2 = ({dm, color, backColor, profileImg, description, title, platform, setprofileImgFunc, setdescription, settitle, review, setreview ,showStars}) => {

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


        <div style={{ display: "flex", flexDirection: "column", backgroundColor: backColor, padding: "16px", fontFamily: "sans-serif", }} >

            <TextareaAutosize value={review} onChange={(e) => setreview(e.target.value)} style={{ fontSize: "16px", marginTop: "8px", whiteSpace: 'pre-wrap', wordBreak: "break-word", background: "transparent", border: "none", outline: "none", color: color, resize: "none" }} >
            </TextareaAutosize>

            <div style={{ margin: 0, display: showStars?'flex':'none', flexDirection: 'row', alignItems: "center", marginTop: "14px",justifyContent:"center" }}>
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


            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", marginTop: "16px" }} >
                <div style={{ display: "flex", alignItems: "center", }} >
                    {
                        profileImg?.name?.length > 0 ?
                            <img src={URL.createObjectURL(profileImg)} onClick={setprofileImgFunc} style={{ width: '44px', height: "44px", borderRadius: "50%" }} ></img>
                            :
                            <img src='/Elon.jpg' onClick={setprofileImgFunc} style={{ width: '44px', height: "44px", borderRadius: "50%" }} ></img>

                    }
                    <div style={{ marginLeft: "8px",display: "flex", flexDirection: "column", justifyContent: "center",alignItems:"center",maxHeight:"44px" }} >
                        

                        <input value={title} onChange={(e) => settitle(e.target.value)} style={{ margin: "0px", fontSize: "16px", fontWeight: "600", outline: "none", border: "none", background: "transparent", color: color, display: "inline-block", boxSizing: "border-box", width: "100%",padding:0 }} ></input>
                        <input value={description} onChange={(e) => setdescription(e.target.value)} style={{ margin: "0px", fontSize: "14px", whiteSpace: 'pre-wrap', wordBreak: "break-word", outline: "none", border: "none", background: "transparent", color: color, display: "inline-block", width: "100%",padding:0 }} >
                        </input>
                    </div>
                </div>
                <div style={{ cursor: "pointer", marginLeft: "8px" }} >
                    {platform === "twitter" ?
                        <FaTwitter  color='#26a7de' size={20} />

                        : ""}
                    {platform === "ph" ?
                        <span style={{ backgroundcolor:dm? "white":"black", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "none" }} >
                            <FaProductHunt  color='#DE5425' size={24} />
                        </span>
                        : ""}
                    {platform === "reddit" ?
                        <span style={{ backgroundcolor:dm? "white":"black", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "none" }} >
                            <FaReddit  color='#ff4500' size={24} />
                        </span>
                        : ""
                    }

                    {platform === "facebook" ?
                        <span style={{ backgroundcolor:dm? "white":"black", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "none" }} >
                            <FaFacebook  color='#3b5998' size={24} />
                        </span>
                        : ""
                    }
                    {platform === "linkedin" ?
                        <span style={{ backgroundcolor:dm? "white":"black", borderRadius: "", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "none" }} >
                            <FaLinkedin  color='#0A66C2' size={24} />
                        </span>
                        : ""
                    }
                    {
                        platform === "" && link?.length > 0 ?
                            <FaExternalLinkAlt  />
                            : ""
                    }
                </div>
            </div>
        </div>
    )
}

export default Template2