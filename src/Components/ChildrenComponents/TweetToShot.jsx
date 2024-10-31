import { host } from '@/host'
import  { useRef, useState } from 'react'
import { GoVerified } from 'react-icons/go'
import { toast } from 'react-toastify'

const TweetToShot = ({ item, index, handleChange, handleImageChange, content, setcontent }) => {
    const imgref = useRef()
    const [tweet, settweet] = useState()

    async function getTweetFunc() {
        // Extract the tweet ID from the URL
        const url = item.title;
        const regex = /status\/(\d+)/;
        const match = url.match(regex);
        const tweetId = match ? match[1] : null;

        // Use the tweet ID in your fetch request
        if (tweetId) {
            const response = await fetch(`${host}/api/templates/tweet-screenshot`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tweetId }), // Pass the tweet ID in the request body
            });

            const json = await response.json();
            // console.log(json)
            settweet(json.tweet)

            const newArr = [...content];
            newArr[0] = { ...content[0], show: true };
            setcontent(newArr);
        }else{
            return toast.warn('Oops something went wrong, make sure you are using correct URL', {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });        }
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
                                        <img src={URL.createObjectURL(item.photo)} onClick={() => imgref.current.click()} style={{ width: '48px', height: "48px", borderRadius: "50%" }} ></img>
                                        :
                                        <img src={tweet.user.profile_image_url_https} onClick={() => {
                                            imgref.current.click()
                                        }} style={{ width: '48px', height: "48px", borderRadius: "50%" }} ></img>

                                }
                                <div style={{ marginLeft: "12px", display: "flex", flexDirection: "column", justifyContent: "center", maxHeight: "40px", height: "15px", }} >
                                    <div style={{ display: "flex", alignItems: "center" }} >

                                        <span contentEditable={true}
                                            value={item.title} name='title'

                                            onChange={(e) => handleChange(e, item, index)} style={{ marginBottom: "0px", fontSize: "15px", fontWeight: "600", outline: "none", border: "none", background: "transparent", display: "inline-block", boxSizing: "border-box", width: "100%", height: "21px" }} >{tweet.user.name}</span>
                                        {
                                            tweet.user.is_blue_verified ?
                                                <GoVerified color='rgb(29, 155, 240)' size={18} style={{ height: "20px", marginLeft: "1px" }} ></GoVerified> : ""
                                        }

                                    </div>
                                    <span contentEditable={true}
                                        value={item.subtitle} name='subtitle'

                                        onChange={(e) => handleChange(e, item, index)}
                                        style={{ marginBottom: "0px", fontSize: "14px", whiteSpace: 'pre-wrap', wordBreak: "break-word", outline: "none", border: "none", background: "transparent", color: item.darkMode ? 'white' : "black", display: "inline-block", width: "100%" }} >{tweet.user.screen_name}
                                    </span>
                                </div>
                            </div>
                            <div>
                                {/* <BsThreeDots color='rgb(83, 100, 113)' /> */}
                                <img className='h-8 w-8' src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_2012_logo.svg/640px-Twitter_2012_logo.svg.png" alt="" />
                            </div>
                        </div>

                        <p contentEditable style={{
                            outline: 'none',
                            border: 'none',
                            margin: '8px 0',
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                            wordWrap: "break-word",
                            width: "100%"
                        }}>
                            {tweet.text}
                        </p>
                        {
                            tweet?.mediaDetails && tweet?.mediaDetails[0]?.media_url_https ?
                                <img src={tweet.mediaDetails[0].media_url_https} style={{ width: "100%" }} alt="" />
                                : ""
                        }

                    </div>
                    :
                    <div className='bg-white dark:bg-black p-4 rounded-lg min-w-[300px]' >
                        <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter tweet 𝕏 here</label>

                        <input
                            name='title'
                            onChange={(e) => handleChange(e, item, index)}
                            placeholder='Paste tweet URL here'
                            type="text" id="default-input" className="bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-gray-100 text-sm rounded-lg block w-full p-2.5 mb-4 " />


                        <button onClick={getTweetFunc} className='text-sm bg-[#121212] text-white font-semibold px-4 py-1 rounded-md ' >Get tweet</button>
                    </div>
            }

        </>


    )
}

export default TweetToShot