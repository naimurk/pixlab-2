import { host } from '@/host'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

const RedditToShot = ({ item, index, handleChange, handleImageChange, content, setcontent }) => {
    const imgref = useRef()

    const [reddit, setreddit] = useState()

    const [isComment, setisComment] = useState(false)


    function getRedditId(url) {
        const commentMatch = url.match(/\/comments\/([^\/]+)/);
        const postMatch = url.match(/\/s\/([^\/]+)/);

        return commentMatch ? commentMatch[1] : postMatch ? postMatch[1] : null;
    }
    async function handleSubmit(input) {
        console.log(input)


        try {

            if (input === "comment") {
                const commentUrl = item.title;
                const matchy = commentUrl.match(/(\/comments\/[^\/]+\/[^\/]+\/)([^\/\?]+)/);
                if (matchy) {

                } else {
                    return (
                        toast.error('Oops! Something went wrong ', {
                            position: "top-left",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        })
                    )
                }
                const commentId = matchy[2];
                console.log(commentId); // Output: "j69y58y"
                const response = await fetch(`${host}/api/templates/reddit-comment`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ commentId }),
                });
                const json = await response.json();
                console.log(json)
                setisComment(true)
                setreddit(json)
                const newArr = [...content];
                newArr[0] = { ...content[0], show: true };
                setcontent(newArr);
            } else {
                const postId = getRedditId(item.title);
                const response = await fetch(`${host}/api/templates/reddit-post`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ postId }),
                });
                const json = await response.json();
                setisComment(false)
                console.log(json)

                setreddit(json)

                const newArr = [...content];
                newArr[0] = { ...content[0], show: true };
                setcontent(newArr);

            }
        } catch (error) {
            console.error(error)
            return (
                toast.error('Oops! Something went wrong ', {
                    position: "top-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
            )
        }

    }


    return (
        <>
            {
                item.show ?
                    <div style={{
                        backgroundColor: item.background, padding: "16px", fontFamily: "sans-serif", color: item.color,

                        borderRadius: item.frame !== "macOS-Dark" && item.frame !== "macOS-Light" && item.frame !== "macOS-black" && item.frame !== "macOS-white" ? `${item.br}px` : "",
                        border:
                            item.frame === "photograph" ? "8px solid white" :
                                item.frame === "arc-dark" ? "6px solid rgb(0,0,0,0.5)" :
                                    item.frame === "arc-light" ? "6px solid rgb(255,255,255,0.5)" :
                                        item.frame !== "none" && item.frame !== "macOS-Dark" && item.frame !== "macOS-Light" && item.frame !== "macOS-black" && item.frame !== "macOS-white" ? `5px solid ${item.frame}`
                                            : "none",
                        borderBottom: item.frame === "photograph" ? "24px solid white" : "",

                        overflow: "hidden",
                        width: "100%"
                    }} >
                        <input name='photo' type="file" accept="image/png, image/jpg, image/jpeg,image/jfif" style={{ display: 'none' }} ref={imgref}
                            onChange={(e) => handleImageChange(e, item, index)}
                        />
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }} >
                            <div style={{ display: "flex", alignItems: "center", }} >
                                {
                                    item.photo?.name?.length > 0 ?
                                        <img src={URL.createObjectURL(item.photo)} onClick={() => imgref.current.click()} style={{ width: '40px', height: "40px", borderRadius: "50%" }} ></img>
                                        :


                                        <ProfileImage imageUrl={reddit?.profileImg} imgref={imgref} ></ProfileImage>

                                }
                                <div style={{ marginLeft: "12px", display: "flex", flexDirection: "column", justifyContent: "center", maxHeight: "40px", height: "15px", }} >
                                    <div style={{ display: "flex", alignItems: "center" }} >

                                        <span contentEditable={true}
                                            value={item.title} name='title'

                                            onChange={(e) => handleChange(e, item, index)} style={{ marginBottom: "0px", fontSize: "15px", fontWeight: "600", outline: "none", border: "none", background: "transparent", display: "inline-block", boxSizing: "border-box", width: "100%", height: "21px" }} >{reddit.username}</span>

                                    </div>

                                </div>
                            </div>
                            <div>
                                <img className='h-8 w-8' src="https://upload.wikimedia.org/wikipedia/en/thumb/b/bd/Reddit_Logo_Icon.svg/220px-Reddit_Logo_Icon.svg.png" alt="" />
                            </div>
                        </div>

                        {
                            isComment ?
                                <Comment comment={reddit.comment.body} ></Comment>
                                : <Post title={reddit.title} description={reddit.description} images={reddit.images} ></Post>
                        }

                    </div>
                    :
                    <div className='bg-white dark:bg-black p-4 rounded-lg min-w-[300px]' >
                        <input
                            name='title'
                            onChange={(e) => handleChange(e, item, index)}
                            placeholder='Paste reddit URL here'
                            type="text" id="default-input" className="bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-gray-100 text-sm rounded-lg block w-full p-2.5 mb-4  " />
                        <p className='text-xs ml my-4' >
                            Note : Use browser urls
                        </p>

                        <button onClick={() => { handleSubmit("post") }} className='text-sm bg-[#121212] text-white font-semibold px-4 py-1 rounded-md  mr-2' >Get post</button>
                        <button onClick={() => { handleSubmit("comment") }} className='text-sm bg-[#121212] text-white font-semibold px-4 py-1 rounded-md ' >Get comment</button>

                    </div>
            }

        </>


    )
}

export default RedditToShot








export function Comment({ comment }) {
    function parseComment(comment) {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const urls = comment.match(urlRegex);
        const text = comment.replace(urlRegex, '').trim();
        const imageUrls = urls ? urls.filter(url => url.includes('preview.redd.it')) : [];
        return { text, imageUrls };
    }

    const { text, imageUrls } = parseComment(comment);

    return (
        <div style={{ padding: "4px" }} >
            {
                text && text.length > 0 ?
                    <p contentEditable style={{
                        outline: 'none',
                        border: 'none',
                        margin: '12px 0 0 0',
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        wordWrap: "break-word",
                        width: "100%"
                    }} >{text}</p>
                    : ""
            }
            {imageUrls.map((url, index) => (
                <CommentImage key={index} imageUrl={url} />
            ))}
        </div>
    );
}

export function Post({ title, description, images }) {

    return (
        <div style={{ padding: "4px" }} >
            {
                title && title.length > 0 ?
                    <h3 className='text-2xl font-solid' contentEditable style={{
                        outline: 'none',
                        border: 'none',
                        margin: '12px 0 0 0',
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        wordWrap: "break-word",
                        width: "100%"
                    }} >{title}</h3>
                    : ""
            }
            {
                description && description.length > 0 ?
                    <p contentEditable style={{
                        outline: 'none',
                        border: 'none',
                        margin: '12px 0 0 0',
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        wordWrap: "break-word",
                        width: "100%"
                    }} >{description}</p>
                    : ""
            }
            {images && images[0]?.source?.url ? (
                <>
                    <CommentImage imageUrl={images[0].source.url} />
                </>
            ) : null}


        </div>
    );
}




export function CommentImage({ imageUrl }) {
    const imgRef = useRef();

    useEffect(() => {
        const encodedImageUrl = encodeURIComponent(imageUrl);
        fetch(`/api/templates/image?imageUrl=${encodedImageUrl}`)
            .then(response => response.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                imgRef.current.src = url;
            });
    }, [imageUrl]);

    return (
        <div>
            <img ref={imgRef} style={{ marginTop: "8px" }} alt="Comment" />
        </div>
    );
}



export function ProfileImage({ imageUrl, imgref }) {
    const imgRef = useRef();

    useEffect(() => {
        const encodedImageUrl = encodeURIComponent(imageUrl);
        fetch(`/api/templates/image?imageUrl=${encodedImageUrl}`)
            .then(response => response.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                imgRef.current.src = url;
            });
    }, [imageUrl]);

    return (
        <img ref={imgRef} onClick={() => {
            imgref.current.click()
        }} style={{ width: '40px', height: "40px", borderRadius: "50%" }} ></img>
    );
}
