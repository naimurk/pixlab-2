import { host } from '@/host'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

const YoutubeShot = ({ item, index, handleChange, handleImageChange, content, setcontent }) => {
    const imgref = useRef()

    const [heart, setheart] = useState(true)
    const [retweet, setretweet] = useState(true)


    const [yt, setYt] = useState()

    function youtubeLinkToEmbed(link) {
        const youtubeIdRegex =
            /^(?:(?:https|http):\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be).*(?<=\/|v\/|u\/|embed\/|shorts\/|watch\?v=)(?<!\/user\/)(?<id>[\w\-]{11})(?=\?|&|$)/;

        return link.match(youtubeIdRegex)?.groups?.id || false;
    }


    async function getYTFunc() {
        // Extract the yt ID from the URL
        const videoId = youtubeLinkToEmbed(item.title);
        console.log(videoId)


        // Use the yt ID in your fetch request
        if (videoId) {
            const response = await fetch(`${host}/api/templates/yt-screenshot`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ videoId }), // Pass the yt ID in the request body
            });

            const json = await response.json();
            console.log(json)
            setYt(json)

            const newArr = [...content];
            newArr[0] = { ...content[0], show: true };
            setcontent(newArr);
        } else {
            return toast.warn('Oops something went wrong, make sure you are using correct URL', {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }


    return (
        <>
            {
                item.show ?
                    <div style={{
                        backgroundColor: item.background, fontFamily: "sans-serif", color: item.color,

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
                        {
                            yt.snippet.thumbnails.high.url ?
                                <Thumbnail imageUrl={yt.snippet.thumbnails.maxres.url} ></Thumbnail>
                                : ""
                        }

                    </div>
                    :
                    <div className='bg-white dark:bg-black p-4 rounded-lg min-w-[300px]' >
                        <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter URL here</label>

                        <input
                            name='title'
                            onChange={(e) => handleChange(e, item, index)}
                            placeholder='Paste youtube video URL here'
                            type="text" id="default-input" className="bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-gray-100 text-sm rounded-lg block w-full p-2.5 mb-4 " />


                        <button onClick={getYTFunc} className='text-sm bg-[#121212] text-white font-semibold px-4 py-1 rounded-md ' >Get thumbnail</button>
                    </div>
            }

        </>


    )
}

export default YoutubeShot


export function Thumbnail({ imageUrl }) {
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
            <img ref={imgRef} alt="thumbnail" />
        </div>
    );
}
