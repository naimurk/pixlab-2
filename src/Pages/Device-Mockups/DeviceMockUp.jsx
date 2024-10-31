import { Link } from "react-router-dom";
import { devices } from "../../constants/devices";
import BottomNavbar from "../../Components/shared/header/BottomNavbar";

const DeviceMockUp = ({}) => {
  return (
    <>
      <h1 style={{ display: "none" }}>
        Create app store and playstore screenshots with pixlab
      </h1>

      <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 md:gap-8 px-2 py-4 md:p-8">
        {devices.map((t, i) => {
          return (
            <Link
              key={i}
              to={t.link}
              className=" bg-white dark:bg-gray-900 dark:hover:bg-gray-950 duration-200 border dark:border-gray-800  text-card-foreground shadow-sm rounded-lg overflow-hidden hover:shadow-md"
            >
              <div className=" p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <h3 className="text-sm md:text-lg font-semibol">{t.title}</h3>
                </div>
                <p className="text-sm mb-4">{t.title} device mockup</p>
              </div>
            </Link>
          );
        })}
      </div>

      <BottomNavbar />
    </>
  );
};

export default DeviceMockUp;
