import { useRef, useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { FaRegComment } from "react-icons/fa";

const InstaPost = ({ darkMode, item }) => {
    const [username, setUsername] = useState("username");
    const profileImgRef = useRef()
    const postImgRef = useRef()

    const [profileImage, setProfileImage] = useState("/logo.png")
    const [postImage, setpostImage] = useState("/test9.webp")
    const [liked, setliked] = useState(true)
    return (
        <div
            className="post-container"
            style={{
                backgroundColor: darkMode ? "#000" : "#fff",
                color: darkMode ? "#fff" : "#000",
                width: '100%',
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
        >
            <div className="post-header">
                <img
                    src={profileImage}
                    alt="User Profile"
                    className="user-profile"
                    contentEditable={true}
                    onClick={() => profileImgRef.current.click()}
                    style={{ cursor: "pointer" }}
                />
                <h2
                    className="username"
                    contentEditable={true}
                    style={{ margin: 0, border: "none", outline: "none" }}
                >
                    username
                </h2>
            </div>
            <div className="post-image">
                <img src={postImage} alt="Post Image"
                    onClick={() => postImgRef.current.click()}
                    style={{ cursor: "pointer" }}
                />
            </div>
            <div className="post-footer">
                <div className="icons">
                    <AiOutlineHeart onClick={() => setliked(!liked)} size={24} style={{ marginRight: "16px", display: liked ? "none" : "" }}></AiOutlineHeart>
                    <AiFillHeart onClick={() => setliked(!liked)} size={24} color="red" style={{ marginRight: "16px", display: !liked ? "none" : "" }}></AiFillHeart>
                    <FaRegComment size={20} style={{ marginRight: "16px" }}></FaRegComment>
                    <IoPaperPlaneOutline size={22} style={{ marginRight: "16px" }}></IoPaperPlaneOutline>
                </div>
                <div className="likes" style={{ fontSize: "14px" }}  ><span contentEditable={true} style={{ margin: 0, border: "none", outline: "none" }} >123</span> likes</div>
                <div className="caption">
                    <strong style={{ margin: 0, border: "none", outline: "none" }} contentEditable={true}>{username}</strong>{" "}
                    <span
                        contentEditable={true}
                        style={{ margin: 0, border: "none", outline: "none" }}

                    >
                        Caption goes here #hashtag
                    </span>
                </div>

                <div className="time" contentEditable style={{ color: "gray", fontSize: "12px", margin: 0, border: "none", outline: "none" }}  >2 hours ago</div>
            </div>

            <input type="file" accept="image/png, image/jpg, image/jpeg,image/jfif" style={{ display: 'none' }} ref={profileImgRef}
                onChange={(e) => {
                    setProfileImage(URL.createObjectURL(e.target.files[0]))

                }}
            />

            <input type="file" accept="image/png, image/jpg, image/jpeg,image/jfif" style={{ display: 'none' }} ref={postImgRef}
                onChange={(e) => {
                    setpostImage(URL.createObjectURL(e.target.files[0]))
                }}
            />
        </div>
    )
}

export default InstaPost