import React, { useRef } from 'react'
import { Image } from 'lucide-react'
import Iphone15Blue from './devices/Iphone15Blue'
import MacBookPro from './devices/MacBookPro'

const ScreenShotMockup = ({ item, handleImageChange, index }) => {
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
                            item.photo ?
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
                                :
                                <div className="flex justify-center w-full "  >
                                    <div
                                        className="px-4 py-6 md:p-6 md:h-[400px] md:w-[400px] flex flex-col items-center justify-center cursor-pointer text-center bg-gray-100 text-black dark:bg-gray-900 dark:text-white rounded-inherit border border-gray-300 dark:border-gray-600 hover:shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out"

                                    >
                                        <Image className="mt-2 mb-4" size={48} />
                                        <p className="text-lg font-semibold">Add Your Image</p>
                                        <div className="mt-2">
                                            <span className="bg-gray-200 dark:bg-gray-700 dark:text-white text-black px-2 py-1 rounded-md text-sm font-medium">
                                                Ctrl+V
                                            </span>{" "}
                                            to Paste
                                        </div>
                                    </div>
                                </div>

                }
            </div>
        </>
    )
}

export default ScreenShotMockup