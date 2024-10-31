const Hero = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Left Image Div */}
      {/* <div
        className="absolute top-0 left-0 h-full hidden sm:block"
        style={{
          width: "20%", // 1/4 width of the screen
          backgroundImage: "url('/landing/pattern-left.svg')", // Replace with your image
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: "10",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-l from-[#140E10] via-[#140E10]/10 to-transparent"></div>
      </div> */}
      <img
        src="/landing/left-side-pattern.svg"
        className="absolute -top-20 -left-[400px] h-auto z-20"
      />
      {/* Right Image Div */}
      {/* <div
        className="absolute top-0 right-0 h-full hidden sm:block"
        style={{
          width: "20%", // 1/4 width of the screen
          backgroundImage: "url('/landing/pattern-right.svg')", // Replace with your image
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: "10",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#140E10] to-transparent"></div>
      </div> */}
      <img
        src="/landing/right-side-pattern.svg"
        className="absolute -top-20 -right-[400px] h-auto z-20"
      />
      {/* Gradient Overlay for the Entire Hero Section */}
      <div className=" absolute inset-0 gradient-middle " />

      {/* Hero Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-white text-5xl lg:text-7xl font-semibold">
          Transform Your Images <br /> into{" "}
          <span
            style={{
              background:
                "linear-gradient(90deg, rgb(248, 91, 61), rgb(215, 54, 125))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Stunning Visuals
          </span>
        </h1>
        <p className="max-w-2xl text-sm lg:text-lg text-gray-300 mt-8">
          Picyard is more than just a screenshot editor. It's your all-in-one
          design tool for creating eye-catching images, mockups, and social
          media content in minutes.
        </p>
        <button
          className="mt-6 rounded-full px-6 py-3 text-white"
          style={{
            background:
              "linear-gradient(358.3deg, rgb(201,38,152) 12.9%, rgb(250,93,58) 130.3%)",
          }}
        >
          Start creating for free
        </button>
      </div>
    </div>
  );
};

export default Hero;
