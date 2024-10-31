import React from "react";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ showLoginModal, setshowLoginModal }) => {
  const router = useNavigate();
  return (
    <>
      <div
        id="staticModal"
        data-modal-backdrop="static"
        tabindex="-1"
        aria-hidden="true"
        className={`fixed top-0 left-0 right-0 z-50 ${
          showLoginModal ? "" : "hidden"
        }  w-full p-1 overflow-x-hidden h-screen md:inset-0  overscroll-y-auto bg-gray-900 bg-opacity-50  flex flex-col `}
        style={{ zIndex: 999 }}
      >
        <div className="relative min-w-[90%] md:min-w-[400px] m-auto   ">
          <div className="relative bg-white rounded-lg shadow pb-4   ">
            <div className="flex items-center justify-between p-4 border-b rounded-t ">
              <h5 className="text-lg font-medium text-black">
                Sign Up / Login
              </h5>
              <button
                onClick={() => setshowLoginModal(false)}
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

            <h5
              className="text-lg text-center font-bold mt-2"
              style={{ color: "black", textAlign: "center" }}
            >
              Login / Sign Up to access <br /> all the features
            </h5>
            <div
              style={{
                margin: "16px 0",
                padding: "16px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                onClick={() => router("/signup")}
                style={{ background: "teal", color: "white" }}
                className="font-semibold px-4 py-1 rounded-full"
              >
                Sign Up
              </button>
            </div>
            <p style={{ margin: "0", color: "gray", textAlign: "center" }}>
              It doesn&apos;t even take a minute ⌚{" "}
            </p>
            <p style={{ margin: "0", color: "gray", textAlign: "center" }}>
              Sign Up Now !
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
