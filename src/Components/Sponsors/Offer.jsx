import { useAppContext } from "@/context";
import {Link} from "react-router-dom";

const Offer = () => {
  const context = useAppContext();
  const { planType } = context.sharedState;

  return (
    <>
      {planType === "free" && (
        <Link
          to="/pricing"
          className="flex flex-col border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white p-3 rounded-sm transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 mx-2"
        >
          <button className="flex items-center text-sm  ">
            <img
              src="/crown.webp"
              alt="upgrade"
              className="w-4 h-4 mr-2.5 rounded-sm"
            />
            <span>Upgrade</span>
          </button>
          <p className="text-xs mt-2">
            Get 50% off on <span className="font-semibold">Lifetime</span> deal,
            use code <span className="font-semibold font-mono">NEW50</span>
          </p>
        </Link>
      )}
    </>
  );
};

export default Offer;
