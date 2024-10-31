import React, { useState } from 'react'
import { toast } from 'react-toastify';

const BlurImageModal = ({ showBlurModal, setshowBlurModal, product , children}) => {
    const [shareType, setshareType] = useState("image")
    return (
        <>

            <div
                id="staticModal"
                data-modal-backdrop="static"
                tabindex="-1"
                aria-hidden="true"
                className={`fixed top-0 left-0 right-0 z-50 ${showBlurModal ? "" : "hidden"
                    }  w-full p-1 overflow-x-hidden h-screen md:inset-0  overscroll-y-auto bg-gray-900 bg-opacity-50  flex flex-col `}
                    style={{zIndex:999}}
            >


                <div className="relative min-w-[90%] md:min-w-[50%] md:w-[40%] m-auto  " >


                    <div className="relative bg-white rounded-lg shadow   ">
                        <div className="flex items-center justify-between p-4 border-b rounded-t ">
                            <h5 className="text-lg font-medium">
                                Crop Image
                            </h5>
                            <button
                                onClick={() => setshowBlurModal(false)}
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center  "
                                data-modal-hide="staticModal"
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        <div className=" p-4 " style={{ display: shareType === "image" ? "" : "none" }}>
                          {children}
                        </div>


                       
                    </div>
                </div>
            </div>
        </>

    )
}
export default BlurImageModal
