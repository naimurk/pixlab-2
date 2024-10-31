import React from "react";

const ToolsHub = () => {
  return (
    <div className=" gradient-template  py-20">
      <div className="relative text-center max-w-3xl mx-auto">
        <h1 className="text-white text-5xl lg:text-7xl font-semibold">
          All the Tools You Need in One Dashboard
        </h1>
        <p className="max-w-2xl text-sm lg:text-lg text-gray-300 mt-8">
          Picyard is more than just a screenshot editor. It's your all-in-one
          design tool for creating eye-catching images, mockups, and social
          media content in minutes.
        </p>
      </div>
      <section className="flex flex-col xl:flex-row justify-between gap-10 w-full mt-12 px-5 lg:px-10 ">
        {/* First div - 60% width */}
        <div className="xl:w-[60%] flex flex-col gap-4 rounded-[40px] gradient-toolshub darker-box-shadow">
          {/* First div inside with one image */}
          <div className="py-10">
            <h1 className="text-white text-center font-semibold text-[2.2rem]">
              Unleash Your Creativity with Powerful Online Tools
            </h1>
            <p className="text-white text-center text-xl">
              Effortlessly create beautiful images, testimonials, code snippets,
              QR codes, and more.
            </p>
          </div>
          {/* Second div inside with two images side by side */}
          <section className="">
            <div className="flex justify-center lg:px-20 xl:px-10 mb-5">
              <img
                src="/shot.webp"
                alt="Sub Image 1"
                className=" rounded-[30px] lg:h-[500px] xl:h-[400px] 2xl:h-[500px] lg:w-[90%] object-cover"
              />
            </div>
            {/* Two images at the bottom */}
            <div className="flex flex-col sm:flex-row justify-center items-center sm:justify-between lg:gap-4 relative lg:-top-20">
              <img
                src="/landing/code.svg"
                alt="Bottom Image 1"
                className="lg:h-[300px] 2xl:h-[300px] xl:h-auto rounded-[40px] object-cover"
              />
              <img
                src="/landing/insta.svg"
                alt="Bottom Image 2"
                className="lg:h-[300px] 2xl:h-[300px] xl:h-auto rounded-[40px] object-cover"
              />
            </div>
          </section>
        </div>

        {/* Second div - 40% width */}
        <div
          className="xl:w-[40%] lg:h-[1000px] pb-20 rounded-[40px] overflow-hidden"
          style={{ backgroundImage: 'url("/landing/gradient-bg.svg")' }}
        >
          <img
            src="/landing/editor.svg"
            alt="Gradient Background"
            className=" relative z-10 left-52 -top-20 "
          />
          <div>
            <h1 className="text-white font-semibold text-3xl text-center">
              Edit With Ease <br />
              No Design Skills Required
            </h1>
            <p className="text-lg max-w-96 mx-auto text-white mt-3">
              Create stunning visuals in just a few clicks. Our intuitive editor
              makes it simple for everyone.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ToolsHub;
