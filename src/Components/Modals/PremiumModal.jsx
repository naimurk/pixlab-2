import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context";
import { host } from "../../host";

const PremiumModal = ({ showPremiumModal, setshowPremiumModal, dm }) => {
  const router = useNavigate();

  const context = useAppContext();
  const { _id, planType, pSubscription, pCustomerId } = context.sharedState;
  const [showModal, setshowModal] = useState(false);
  const [processing, setprocessing] = useState(false);

  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    try {
      fetch(`${host}/api/payments/get_key`)
        .then((response) => response.json())
        .then((data) => setStripePromise(loadStripe(data.key)));
    } catch (error) {
      console.log(error);
    }
  }, []);

  async function handleBuyClick(plan) {
    const response = await fetch(`${host}/api/payments/checkout_sessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 1, currency: "usd", _id, plan: plan })
    });
    const data = await response.json();
    console.log(data);

    const stripe = await stripePromise;

    try {
      setprocessing(false);

      const result = await stripe.redirectToCheckout({
        sessionId: data.session.id
      });

      if (result.error) {
        console.log(result.error.message);
      } else {
        console.log("Payment succeeded!");
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <div
        id="staticModal"
        data-modal-backdrop="static"
        tabindex="-1"
        aria-hidden="true"
        className={`fixed top-0 left-0 right-0 z-50 ${
          showPremiumModal ? "" : "hidden"
        }  w-full p-1 overflow-x-hidden h-screen md:inset-0  overscroll-y-auto bg-gray-900 bg-opacity-50  flex flex-col `}
        style={{ zIndex: 999 }}
      >
        <div className="relative min-w-[90%] md:min-w-[400px] m-auto   ">
          <div className="relative bg-white rounded-lg shadow pb-4   ">
            <div className="flex items-center justify-between p-4 border-b rounded-t ">
              <h5 className="text-lg font-medium">
                <img
                  src="/crown.webp"
                  style={{
                    width: "40px",
                    margin: "0 auto",
                    borderRadius: "12px"
                  }}
                  alt=""
                />
              </h5>
              <button
                onClick={() => setshowPremiumModal(false)}
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
              style={{ color: "#404040" }}
            >
              Upgrade to PRO Plan and <br /> enjoy all{" "}
              <Link
                to={"/pricing"}
                style={{
                  background: "whitesmoke",
                  borderBottom: "1px solid black"
                }}
              >
                premium features
              </Link>{" "}
            </h5>

            <h6 className="font-semibold my-4 text-center font-sans text-black">
              Starting at just $1 / month
            </h6>

            <div
              style={{
                margin: "16px 0",
                padding: "16px",
                display: "flex",
                justifyContent: "center"
              }}
            >
              <button
                onClick={() => {
                  if (!processing) {
                    if (!_id) {
                      return router("/signup");
                    }

                    if (planType !== "starter" && planType !== "lifetime") {
                      setprocessing(true);
                      handleBuyClick("annual");
                    } else if (planType === "starter") {
                      setshowModal(true);
                    }
                  }
                }}
                style={{ background: "teal", color: "white" }}
                className="font-semibold px-4 py-1 rounded-full"
              >
                {planType !== "starter" &&
                planType !== "lifetime" &&
                !processing
                  ? "Upgrade"
                  : planType !== "starter" &&
                    planType !== "lifetime" &&
                    processing
                  ? "Processing"
                  : planType == "starter" && !processing
                  ? "Cancel Subscription"
                  : ""}
              </button>
            </div>

            <p style={{ color: "gray", textAlign: "center" }}>
              Enhance your Online Presence{" "}
            </p>
            <p style={{ color: "gray", textAlign: "center" }}>Upgrade Now !</p>

            <Link to="/pricing">
              <p className="text-gray-500 mt-4 text-sm text-center w-full underline">
                View all plans
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PremiumModal;
