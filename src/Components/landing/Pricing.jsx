import { useAppContext } from "@/context";
import { host } from "@/host";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineCheck } from "react-icons/ai";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Navbar from "../shared/header/Navbar";
const PricingCard = ({
  title,
  price,
  discountedPrice,
  period,
  features,
  recommended,
  onUpgrade,
  planType,
  check,
  promoCode,
}) => {
  return (
    <div
      className={`relative flex flex-col p-6  border rounded-md sm:rounded-none overflow-hidden border-gray-700 ${
        recommended ? " border-teal-500" : ""
      }`}
    >
      {recommended && (
        <div className="absolute top-0 right-0 px-3 py-1 text-xs font-medium text-white bg-teal-500 rounded-bl-2xl rounded-tr-2xl">
          Recommended
        </div>
      )}
      <h3 className="text-xl font-semibold text-white flex items-center justify-center">
        {title}
        {promoCode && (
          <div className="ml-4 text-sm text-teal-400 font-mono text-center">
            Use code: {promoCode}
          </div>
        )}
      </h3>
      <div className="mt-4 text-center">
        {discountedPrice ? (
          <>
            <span className="text-4xl font-bold text-white">
              ${discountedPrice}
            </span>
            <span className="ml-2 text-2xl font-medium text-gray-400 line-through">
              ${price}
            </span>
          </>
        ) : (
          <span className="text-4xl font-bold text-white">${price}</span>
        )}
        <span className="text-gray-400">/{period}</span>
      </div>
      <button
        onClick={onUpgrade}
        className={`mt-8 w-full gradeint-button px-4 py-3 text-sm font-medium text-white rounded-3xl focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          planType === check
            ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
            : "bg-teal-600 hover:bg-teal-700 focus:ring-teal-500"
        }`}
      >
        {planType === check ? "Cancel Subscription" : "Upgrade"}
      </button>

      <ul className="mt-6 space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <IoIosCheckmarkCircle className="flex-shrink-0 w-5 h-5 text-green-500" />
            <span className="ml-3 text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Pricing = () => {
  const context = useAppContext();
  const { _id, planType, pSubscription, pCustomerId } = context.sharedState;
  const [showModal, setshowModal] = useState(false);
  const [processing, setprocessing] = useState(false);
  const [stripePromise, setStripePromise] = useState(null);
  const router = useNavigate();
  useEffect(() => {
    fetch(`${host}/api/payments/get_key`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text(); // Change to text() to inspect the response
      })
      .then((text) => {
        console.log(text); // Log the raw response
        return JSON.parse(text); // Parse the text as JSON
      })
      .then((data) => setStripePromise(loadStripe(data.key)))
      .catch((error) => {
        console.log("Fetch error:", error);
      });
  }, []);

  async function cancelSubscription() {
    const response = await fetch(`${host}/api/payments/cancel_subscription`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: _id, subscriptionId: pSubscription }),
    });
    const data = await response.json();
    // console.log(data)
    toast.info("Subscription Cancelled", {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setshowModal(false);

    context.setsharedState({ ...context.sharedState, planType: "free" });
  }

  async function handleBuyClick(plan) {
    if (!_id) {
      router("/signup");
    }
    const response = await fetch(`${host}/api/payments/checkout_sessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 1, currency: "usd", _id, plan: plan }),
    });
    const data = await response.json();

    const stripe = await stripePromise;

    const dataToSave = {
      admin: _id,
      sessionId: data.session.id,
    };
    const dataString = JSON.stringify(dataToSave);
    localStorage.setItem("paymentData", dataString);

    try {
      setprocessing(false);
      const result = await stripe.redirectToCheckout({
        sessionId: data.session.id,
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

  const pricingPlans = [
    {
      title: "Lifetime",
      check: "lifetime",
      price: 23.99,
      period: "Lifetime",
      features: [
        "Premium Templates",
        "Custom Watermark",
        "Code Image generator",
        "Custom Background Images",
        "Premium Quality (4x,6x,8x)",
        "Download in WebP and SVG Formats",
        "Save Presets",
        "Annotation Tools",
        "Premium Frames",
        "Premium Fonts",
        "Upto 500 Design Presets",
        "No Google Ads",
      ],
    },
    {
      title: "Annual",
      check: "starter",
      price: 9.99,
      period: "month",
      features: [
        "Premium Templates",
        "Custom Watermark",
        "Code Image generator",
        "Custom Background Images",
        "Premium Quality (4x,6x,8x)",
        "Download in WebP and SVG Formats",
        "Save Presets",
        "Annotation Tools",
        "Premium Frames",
        "Premium Fonts",
        "Upto 500 Design Presets",
        "No Google Ads",
      ],
    },
  ];

  return (
    <>
      <Navbar show={true}></Navbar>

      <div className="py-12 gradient-template">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              Simple, transparent pricing
            </h2>
          </div>
          <div className="mt-12 mb-8 space-y-4 overflow-hidden rounded-2xl sm:border border-gray-700 sm:mt-16 sm:mb-12 sm:space-y-0 sm:grid sm:grid-cols-2 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-2 ">
            {pricingPlans.map((plan, index) => (
              <PricingCard
                key={index}
                title={plan.title}
                check={plan.check}
                price={plan.price}
                discountedPrice={plan.discountedPrice}
                period={plan.period}
                features={plan.features}
                recommended={plan.recommended}
                onUpgrade={() => handleBuyClick(plan.title.toLowerCase())}
                planType={planType}
                promoCode={plan.promoCode}
              />
            ))}
          </div>
          <BoilerPlate
            title="Screenshot Boilerplate </>"
            price={98.99}
            period="one time fee"
            description="For entrepreneurs, indie hackers, developers: Create your own screenshot editor like Picyard with the exact code you see here."
            message="Why not customize it to your needs? Click below to get started"
            primaryBtn="Get The Code </>"
            secondaryBtn="Learn More"
          />
        </div>
      </div>
    </>
  );
};

export default Pricing;

const BoilerPlate = ({
  title,
  price,
  period,
  description,
  message,
  primaryBtn,
  secondaryBtn,
}) => {
  return (
    <div className="max-w-2xl mx-auto border border-gray-700 shadow-lg rounded-2xl overflow-hidden">
      <div className="px-8 py-4 sm:px-16 sm:py-8">
        <div className="text-center">
          <h3 className="text-xl sm:text-2xl font-semibold text-white flex items-center justify-center">
            {title}
          </h3>
          <div className="mt-4">
            <span className="text-3xl sm:text-4xl font-bold text-white">
              ${price}
            </span>
            <span className="text-sm sm:text-base text-gray-400">
              /{period}
            </span>
          </div>
        </div>
        <p className="text-sm sm:text-base mt-4 text-gray-300 text-center">
          {description}
        </p>
        <p className="text-sm sm:text-base mt-3 text-gray-300 text-center">
          {message}
        </p>

        <div className="mt-8 flex flex-row space-x-4">
          <button className="w-full gradeint-button px-4 py-3 text-xs sm:text-sm font-medium text-white rounded-3xl focus:outline-none focus:ring-2 focus:ring-offset-2">
            {primaryBtn}
          </button>
          <button className="w-full bg-black px-4 py-3 text-xs sm:text-sm font-medium text-white rounded-3xl focus:outline-none focus:ring-2 focus:ring-offset-2">
            {secondaryBtn}
          </button>
        </div>
      </div>
    </div>
  );
};

const UserReview = () => {
  const userAvatars = [
    "/test1.webp",
    "/test2.webp",
    "/test3.webp",
    "/test4.webp",
    "/test5.webp",
  ];

  return (
    <div className="flex items-center justify-center flex-col md:flex-row space-x-4 py-6 mt-12">
      <div className="flex -space-x-2">
        {userAvatars.map((avatar, index) => (
          <div key={index} className=" rounded-full border-2 border-gray-800">
            <img
              src={avatar}
              alt={`User ${index + 1}`}
              className="rounded-full h-10 w-10"
            />
          </div>
        ))}

        <span className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 rounded-full hover:bg-gray-600 border-gray-800">
          +671
        </span>
      </div>
      <div className="flex items-center flex-col md:flex-row ">
        <div className="flex text-yellow-500 my-4">
          <AiFillStar className="w-5 h-5" />
          <AiFillStar className="w-5 h-5" />
          <AiFillStar className="w-5 h-5" />
          <AiFillStar className="w-5 h-5" />
          <AiFillStar className="w-5 h-5" />
        </div>
        <span className="ml-2 text-white  text-lg font-semibold">
          674 users love pixlab
        </span>
      </div>
    </div>
  );
};
