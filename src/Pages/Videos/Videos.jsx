import { Link } from "react-router-dom";
import BottomNavbar from "../../Components/shared/header/BottomNavbar";
const Videos = ({}) => {
  return (
    <>
      <h1 style={{ display: "none" }}>
        Create app store and playstore screenshots with pixlab
      </h1>
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 md:gap-8 px-2 py-4 md:p-8">
        {vidTemplates.map((t, i) => {
          return (
            <Link
              key={i}
              to={t.link}
              className="  bg-white dark:bg-gray-900 dark:hover:bg-gray-950 duration-200 border dark:border-gray-800  text-card-foreground shadow-sm rounded-lg overflow-hidden hover:shadow-md"
            >
              <div className=" p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <h3 className="text-sm md:text-lg font-semibold">
                    {t.title}
                  </h3>
                </div>
                <p className="text-sm  mb-4">{t.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
      <h3 className="text-center ">More exciting templates Coming Soon !</h3>

      <BottomNavbar />
    </>
  );
};

export default Videos;

export const vidTemplates = [
  {
    title: "Typewriter",
    thumbnail: "/FeatureGraphic.webp",
    link: "/videos/typewriter",
    slug: "typewriter",
    description: "Create a typewriter typing animation",
  },
  // {
  //   title: "Animated stats",
  //   thumbnail: "/FeatureGraphic.webp",
  //   link: "/device-mockups/macbook-pro",
  //   slug:"macbook-pro",
  //   description: "Design from scratch"
  // },
];
