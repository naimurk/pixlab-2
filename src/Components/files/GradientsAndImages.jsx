import { useState } from "react";
import { HexAlphaColorPicker } from "react-colorful";
import { MdOutlineColorize } from "react-icons/md";
import "react-image-crop/dist/ReactCrop.css";

export const CustomColor = ({ color, handleColorChange, index, dm }) => {
  const [showCustomGradPicker, setshowCustomGradPicker] = useState(false);
  return (
    <span
      onClick={(e) => {
        setshowCustomGradPicker(true);
      }}
      style={{
        background: color,
        height: "30px",
        width: "30px",
        margin: "4px",
        borderRadius: "4px",
        border: "1px solid gray",
        position: "relative"
      }}
    >
      <span className="absolute -top-2 -right-1 bg-white dark:bg-[rgb(5,50,50)] flex justify-center items-center rounded-full p-1">
        <MdOutlineColorize />
      </span>

      {showCustomGradPicker ? (
        <HexAlphaColorPicker
          color={color}
          onChange={(newColor) => handleColorChange(index, newColor)}
          style={{ zIndex: 9999, top: "24px" }}
          onMouseLeave={() => {
            setshowCustomGradPicker(false);
          }}
          onBlur={() => {
            setshowCustomGradPicker(false);
          }}
        />
      ) : (
        ""
      )}
    </span>
  );
};

export const template_images = [
  "https://res.cloudinary.com/dypr5q914/image/upload/v1695193346/pixlab_1695191789203_1_lyh9ys.webp",
  "https://res.cloudinary.com/dypr5q914/image/upload/v1695018326/pixlab_1695016852427_2_r7skwf.webp",
  "https://res.cloudinary.com/dypr5q914/image/upload/v1695017945/pixlab_1695016852427_1_dudejs.webp",
  "https://res.cloudinary.com/dypr5q914/image/upload/v1695017547/pixlab_1695016852427_ywpq6t.webp",
  "https://res.cloudinary.com/dypr5q914/image/upload/v1694771285/pixlab_1694771107516_sh6vgo.webp",
  "https://res.cloudinary.com/dypr5q914/image/upload/v1694447670/pixlab_1694444024104_j2lkgf.webp",
  "https://res.cloudinary.com/dypr5q914/image/upload/v1693134746/pixlab_Sun_Aug_27_2023_16_42_05_GMT_0530_India_Standard_Time_e9zf5g.webp",
  "https://res.cloudinary.com/dypr5q914/image/upload/v1693134973/pixlab_Sun_Aug_27_2023_16_45_58_GMT_0530_India_Standard_Time_h1b4l9.webp",
  "https://res.cloudinary.com/dypr5q914/image/upload/v1693135033/pixlab_Sun_Aug_27_2023_16_46_59_GMT_0530_India_Standard_Time_pduoby.webp",
  "https://res.cloudinary.com/dypr5q914/image/upload/v1693135054/pixlab_Sun_Aug_27_2023_16_47_20_GMT_0530_India_Standard_Time_j8wfmi.webp",
  "https://res.cloudinary.com/dypr5q914/image/upload/v1693135083/pixlab_Sun_Aug_27_2023_16_47_49_GMT_0530_India_Standard_Time_curtgz.webp",
  "https://res.cloudinary.com/dypr5q914/image/upload/v1693135144/pixlab_Sun_Aug_27_2023_16_48_37_GMT_0530_India_Standard_Time_cuxjxi.webp",
  "https://res.cloudinary.com/dypr5q914/image/upload/v1693135177/pixlab_Sun_Aug_27_2023_16_49_27_GMT_0530_India_Standard_Time_yqp5fh.webp"
];

export const testArray = [
  {
    content: [
      {
        id: 1695192854661,
        isDeleted: false,
        shadow: "0",
        scolor: "#1e1e1e",
        br: "0",
        frame: "none",
        fontSize: 5,
        fontShadow: "0",
        bold: false,
        italic: false,
        underline: false,
        fontFamily: "__className_a789c4",
        fontcolor: "#ffffff",
        transform:
          "translate(-50%,-50%) perspective(500px) rotateY(0deg) rotateX(0deg)",
        component: "text",
        position: { top: 14.6875, left: 16.71875 },
        txt: "✨ Thanks For The Support 🎉"
      },
      {
        photo: "/ur_img_here.webp",
        id: 1695192871174,
        isDeleted: false,
        shadow: "0",
        scolor: "#1e1e1e",
        br: "9",
        frame: "black",
        size: "70",
        transform:
          "translate(-50%,-50%) perspective(500px) rotateY(0deg) rotateX(0deg)",
        component: "image",
        position: { top: 75.3125, left: 51.5625 }
      }
    ],
    canvasStyles: {
      canvasFilters: {
        brightness: 1,
        contrast: 1,
        grayscale: 0,
        blur: 0,
        hueRotate: 0,
        invert: 0,
        saturate: 1,
        sepia: 0,
        opacity: 1
      },
      aspectRatio: 1,
      backgroundColor: "#ffffff",
      bgtheme: "image",
      gradangle: 135,
      gradientIndex: 27,
      currentImg: 36
    }
  },

  {
    content: [
      {
        photo: "/ur_img_here.webp",
        id: 1695018194275,
        isDeleted: false,
        shadow: "0",
        scolor: "#1e1e1e",
        br: "2",
        frame: "white",
        size: "85",
        transform:
          "translate(-50%,-50%) perspective(500px) rotateY(32.69440019993766deg) rotateX(23.045090487266826deg)",
        component: "image",
        position: { top: 59.06249999999999, left: 59.68750000000001 }
      },
      {
        id: 1695018230596,
        isDeleted: false,
        shadow: "0",
        scolor: "#1e1e1e",
        br: "0",
        frame: "none",
        fontSize: 4,
        fontShadow: "0",
        bold: false,
        italic: true,
        underline: false,
        fontFamily: "__className_5449ac",
        fontcolor: "#ffffff",
        transform:
          "translate(-50%,-50%) perspective(500px) rotateY(0deg) rotateX(0deg)",
        component: "text",
        position: { top: 5.9375, left: 18.28125 },
        txt: "Here is the \nExciting Stuff !"
      }
    ],
    canvasStyles: {
      canvasFilters: {
        brightness: 1,
        contrast: 1,
        grayscale: 0,
        blur: 0,
        hueRotate: 0,
        invert: 0,
        saturate: 1,
        sepia: 0,
        opacity: 1
      },
      aspectRatio: 1,
      backgroundColor: "#ffffff",
      bgtheme: "image",
      gradangle: 135,
      gradientIndex: 27,
      currentImg: 52
    }
  },

  {
    content: [
      {
        photo: "/ur_img_here.webp",
        id: 1695017703053,
        isDeleted: false,
        shadow: "26",
        scolor: "#1e1e1e",
        br: 3,
        frame: "none",
        size: "45",
        transform:
          "translate(-50%,-50%) perspective(500px) rotateY(-16.555555555555554deg) rotateX(9.777777777777777deg)",
        component: "image",
        position: { top: 69.21875, left: 70 }
      },
      {
        photo: "/ur_img_here.webp",
        id: 1695017726653,
        isDeleted: false,
        shadow: "20",
        scolor: "#1e1e1e",
        br: 3,
        frame: "none",
        size: "45",
        transform:
          "translate(-50%,-50%) perspective(500px) rotateY(16.155598958333332deg) rotateX(9.777777777777777deg)",
        component: "image",
        position: { top: 24.84375, left: 30.46875 }
      },
      {
        id: 1695017778774,
        isDeleted: false,
        shadow: "0",
        scolor: "#1e1e1e",
        br: "0",
        frame: "none",
        fontSize: 4,
        fontShadow: "0",
        bold: false,
        italic: true,
        underline: false,
        fontFamily: "__className_8c1529",
        fontcolor: "#000000",
        transform:
          "translate(-50%,-50%) perspective(500px) rotateY(0deg) rotateX(0deg)",
        component: "text",
        position: { top: 15.937499999999998, left: 62.03125000000001 },
        txt: "Descriptive text \nabout this image\n"
      },
      {
        id: 1695017808691,
        isDeleted: false,
        shadow: "0",
        scolor: "#1e1e1e",
        br: "0",
        frame: "none",
        fontSize: 4,
        fontShadow: "0",
        bold: false,
        italic: true,
        underline: false,
        fontFamily: "__className_8c1529",
        fontcolor: "#000000",
        transform:
          "translate(-50%,-50%) perspective(500px) rotateY(0deg) rotateX(0deg)",
        component: "text",
        position: { top: 62.34375, left: 9.53125 },
        txt: "Descriptive text \nabout this image"
      }
    ],
    canvasStyles: {
      canvasFilters: {
        brightness: 1,
        contrast: 1,
        grayscale: 0,
        blur: 0,
        hueRotate: 0,
        invert: 0,
        saturate: 1,
        sepia: 0,
        opacity: 1
      },
      aspectRatio: 1,
      backgroundColor: "#ffffff",
      bgtheme: "gradient",
      gradangle: 135,
      gradientIndex: 180,
      currentImg: 3
    }
  },

  {
    content: [
      {
        photo: "/ur_img_here.webp",
        id: 1695016958455,
        isDeleted: false,
        shadow: "0",
        scolor: "#1e1e1e",
        br: 3,
        frame: "laptop-white",
        size: "82",
        transform:
          "translate(-50%,-50%) perspective(500px) rotateY(0deg) rotateX(0deg)",
        component: "image",
        position: { top: 52.03124999999999, left: 49.84375 }
      },
      {
        id: 1695017022805,
        isDeleted: false,
        shadow: "0",
        scolor: "#1e1e1e",
        br: "0",
        frame: "none",
        fontSize: 7,
        fontShadow: "0",
        bold: false,
        italic: false,
        underline: false,
        fontFamily: "__className_22278b",
        fontcolor: "#ffffff",
        transform:
          "translate(-50%,-50%) perspective(500px) rotateY(0deg) rotateX(0deg)",
        component: "text",
        position: { top: 13.593749999999998, left: 19.84375 },
        txt: "Growth Report"
      },
      {
        id: 1695017080241,
        isDeleted: false,
        shadow: "0",
        scolor: "#1e1e1e",
        br: "0",
        frame: "none",
        fontSize: 3,
        fontShadow: "0",
        bold: true,
        italic: false,
        underline: false,
        fontFamily: "__className_7612a2",
        fontcolor: "#f0f0f0",
        transform:
          "translate(-50%,-50%) perspective(500px) rotateY(0deg) rotateX(0deg)",
        component: "text",
        position: { top: 81.71875, left: 41.40625 },
        txt: "XYZ COMPANY"
      },
      {
        id: 1695017242800,
        isDeleted: false,
        shadow: "0",
        scolor: "#1e1e1e",
        frame: "none",
        size: 10,
        component: "icon",
        position: { top: 12.5, left: 68.125 },
        value: "MdAutoGraph",
        fontcolor: "#ffffff",
        background: "#000000",
        transform: 0
      }
    ],
    canvasStyles: {
      canvasFilters: {
        brightness: 1,
        contrast: 1,
        grayscale: 0,
        blur: 0,
        hueRotate: 0,
        invert: 0,
        saturate: 1,
        sepia: 0,
        opacity: 1
      },
      aspectRatio: 1,
      backgroundColor: "#ffffff",
      bgtheme: "gradient",
      gradangle: "70",
      gradientIndex: 174,
      currentImg: 3
    }
  },

  {
    content: [
      {
        photo: "/ur_img_here.webp",
        id: 1694770917963,
        isDeleted: false,
        shadow: "16",
        scolor: "#1e1e1e",
        br: 3,
        frame: "none",
        size: "40",
        transform:
          "translate(-50%,-50%) perspective(500px) rotateY(0deg) rotateX(0deg)",
        component: "image",
        position: { top: 25.3125, left: 25.937500000000004 }
      },
      {
        photo: "/ur_img_here.webp",
        id: 1694770931776,
        isDeleted: false,
        shadow: "16",
        scolor: "#1e1e1e",
        br: 3,
        frame: "none",
        size: "40",
        transform:
          "translate(-50%,-50%) perspective(500px) rotateY(0deg) rotateX(0deg)",
        component: "image",
        position: { top: 24.84375, left: 74.21875 }
      },
      {
        photo: "/ur_img_here.webp",
        id: 1694770949785,
        isDeleted: false,
        shadow: "16",
        scolor: "#1e1e1e",
        br: 3,
        frame: "none",
        size: "40",
        transform:
          "translate(-50%,-50%) perspective(500px) rotateY(0deg) rotateX(0deg)",
        component: "image",
        position: { top: 71.09375, left: 26.5625 }
      },
      {
        photo: "/ur_img_here.webp",
        id: 1694770955642,
        isDeleted: false,
        shadow: "16",
        scolor: "#1e1e1e",
        br: 3,
        frame: "none",
        size: "40",
        transform:
          "translate(-50%,-50%) perspective(500px) rotateY(0deg) rotateX(0deg)",
        component: "image",
        position: { top: 70.9375, left: 75.46875 }
      }
    ],
    canvasStyles: {
      canvasFilters: {
        brightness: 1,
        contrast: 1,
        grayscale: 0,
        blur: 0,
        hueRotate: 0,
        invert: 0,
        saturate: 1,
        sepia: 0,
        opacity: 1
      },
      aspectRatio: 1,
      backgroundColor: "#ffffff",
      bgtheme: "gradient",
      gradangle: 135,
      gradientIndex: 59,
      currentImg: 3
    }
  },

  {
    content: [
      {
        photo: "/ur_img_here.webp",
        id: 1694018546987,
        isDeleted: false,
        shadow: "14",
        scolor: "#3c3a3a",
        br: 5,
        frame: "watch-black",
        size: "33",
        transform:
          "translate(-50%,-50%) perspective(500px) rotateY(0deg) rotateX(0deg)",
        component: "image",
        position: { top: 50.46948356807511, left: 81.40625 }
      },
      {
        id: 1694023103134,
        isDeleted: false,
        shadow: "0",
        scolor: "#1e1e1e",
        br: "0",
        frame: "none",
        fontSize: 3,
        fontShadow: 0,
        bold: false,
        italic: false,
        underline: false,
        fontFamily: "__className_0f23cf",
        fontcolor: "#ffffff",
        transform:
          "translate(-50%,-50%) perspective(500px) rotateY(0deg) rotateX(0deg)",
        component: "text",
        position: { top: 14.553990610328643, left: 12.812499999999998 },
        txt: "Hey, \nI am Krish Gohil currently building\npixlab - A Design Tool & Screenshot \nEnhancer\n\n                             Lets Connect \n"
      }
    ],
    canvasStyles: {
      canvasFilters: {
        brightness: 1,
        contrast: 1,
        grayscale: 0,
        blur: 0,
        hueRotate: 0,
        invert: 0,
        saturate: 1,
        sepia: 0,
        opacity: 1
      },
      aspectRatio: "3/1",
      backgroundColor: "#ffffff",
      bgtheme: "image",
      gradangle: "137",
      gradientIndex: 97,
      currentImg: 61
    }
  },

  {
    content: [
      {
        photo: "/ur_img_here.webp",
        id: 1693134219175,
        isDeleted: false,
        shadow: "34",
        scolor: "#1e1e1e",
        br: 3,
        frame: "macOS-black",
        size: "82",
        transform:
          "translate(-50%,-50%) perspective(500px) rotateY(0deg) rotateX(0deg)",
        component: "image",
        position: { top: 50, left: 50 }
      }
    ],
    canvasStyles: {
      canvasFilters: {
        brightness: 1,
        contrast: 1,
        grayscale: 0,
        blur: 0,
        hueRotate: 0,
        invert: 0,
        saturate: 1,
        sepia: 0,
        opacity: 1
      },
      aspectRatio: "1/1",
      backgroundColor: "#ffffff",
      bgtheme: "gradient",
      gradangle: 135,
      gradientIndex: 37,
      currentImg: 3
    }
  },

  {
    content: [
      {
        photo: "/ur_img_here.webp",
        id: 1693071518999,
        isDeleted: false,
        shadow: "0",
        scolor: "#1e1e1e",
        br: 3,
        frame: "mobile-5",
        size: "43",
        transform:
          "translate(-50%,-50%) perspective(500px) rotateY(0deg) rotateX(0deg)",
        component: "image",
        position: { top: 67.34375, left: 26.875 }
      },
      {
        photo: "/ur_img_here.webp",
        id: 1693071536283,
        isDeleted: false,
        shadow: "0",
        scolor: "#1e1e1e",
        br: 3,
        frame: "mobile-5",
        size: 50,
        transform:
          "translate(-50%,-50%) perspective(500px) rotateY(0deg) rotateX(0deg)",
        component: "image",
        position: { top: 37.65625, left: 76.875 }
      }
    ],
    canvasStyles: {
      canvasFilters: {
        brightness: 1,
        contrast: 1,
        grayscale: 0,
        blur: 0,
        hueRotate: 0,
        invert: 0,
        saturate: 1,
        sepia: 0,
        opacity: 1
      },
      aspectRatio: "1/1",
      backgroundColor: "#ffffff",
      bgtheme: "gradient",
      gradangle: 135,
      gradientIndex: 2,
      currentImg: 3
    }
  },

  {
    content: [
      {
        photo: "/ur_img_here.webp",
        id: 1693071160089,
        isDeleted: false,
        shadow: "0",
        scolor: "#1e1e1e",
        br: 3,
        frame: "watch-black",
        size: 50,
        transform:
          "translate(-50%,-50%) perspective(500px) rotateY(0deg) rotateX(0deg)",
        component: "image",
        position: { top: 17.8125, left: 16.71875 }
      },
      {
        photo: "/ur_img_here.webp",
        id: 1693071240086,
        isDeleted: false,
        shadow: "0",
        scolor: "#1e1e1e",
        br: 3,
        frame: "watch-black",
        size: 50,
        transform:
          "translate(-50%,-50%) perspective(500px) rotateY(0deg) rotateX(0deg)",
        component: "image",
        position: { top: 18.75, left: 83.125 }
      },
      {
        photo: "/ur_img_here.webp",
        id: 1693071272966,
        isDeleted: false,
        shadow: "0",
        scolor: "#1e1e1e",
        br: 3,
        frame: "mobile-5",
        size: "48",
        transform:
          "translate(-50%,-50%) perspective(500px) rotateY(0deg) rotateX(0deg)",
        component: "image",
        position: { top: 87.34375, left: 50.625 }
      }
    ],
    canvasStyles: {
      canvasFilters: {
        brightness: 1,
        contrast: 1,
        grayscale: 0,
        blur: 0,
        hueRotate: 0,
        invert: 0,
        saturate: 1,
        sepia: 0,
        opacity: 1
      },
      aspectRatio: "1/1",
      backgroundColor: "#ffffff",
      bgtheme: "image",
      gradangle: 135,
      gradientIndex: 142,
      currentImg: 54
    }
  },

  {
    content: [
      {
        photo: "/ur_img_here.webp",
        id: 1693070704903,
        isDeleted: false,
        shadow: "47",
        scolor: "#1e1e1e",
        br: 3,
        frame: "mobile-1",
        size: "61",
        transform:
          "translate(-50%,-50%) perspective(500px) rotateY(0.5112847222222222deg) rotateX(16.88886176215278deg)",
        component: "image",
        position: { top: 48.535871156661784, left: 51.5625 }
      },
      {
        id: 1693070810769,
        isDeleted: false,
        shadow: "0",
        scolor: "#1e1e1e",
        br: "0",
        frame: "none",
        fontSize: 4,
        fontShadow: 1,
        bold: false,
        italic: false,
        underline: false,
        fontFamily: null,
        fontcolor: "#ffffff",
        transform:
          "translate(-50%,-50%) perspective(500px) rotateY(0deg) rotateX(0deg)",
        component: "text",
        position: { top: 92.67935578330894, left: 32.55208333333333 },
        txt: "DOWNLOAD NOW!"
      },
      {
        id: 1693070905151,
        isDeleted: false,
        shadow: "0",
        scolor: "#1e1e1e",
        br: "0",
        frame: "none",
        fontSize: 6,
        fontShadow: 1,
        bold: true,
        italic: true,
        underline: false,
        fontFamily: "__className_f4d50f",
        fontcolor: "#ffffff",
        transform:
          "translate(-50%,-50%) perspective(500px) rotateY(0deg) rotateX(0deg)",
        component: "text",
        position: { top: 4.978038067349927, left: 20.57291666666666 },
        txt: "A Tool That Supports \nDevice Mockups\n"
      }
    ],
    canvasStyles: {
      canvasFilters: {
        brightness: 1,
        contrast: 1,
        grayscale: 0,
        blur: 0,
        hueRotate: 0,
        invert: 0,
        saturate: 1,
        sepia: 0,
        opacity: 1
      },
      aspectRatio: "9/16",
      backgroundColor: "#ffffff",
      bgtheme: "gradient",
      gradangle: 135,
      gradientIndex: 27,
      currentImg: 20
    }
  },

  {
    content: [
      {
        photo: "/ur_img_here.webp",
        id: 1693070033570,
        isDeleted: false,
        shadow: "28",
        scolor: "#1e1e1e",
        br: "0",
        frame: "none",
        size: "49",
        transform:
          "translate(-50%,-50%) perspective(500px) rotateY(0deg) rotateX(0deg)",
        component: "image",
        position: { top: 37.96875, left: 40.15625 }
      },
      {
        photo: "/ur_img_here.webp",
        id: 1693070508849,
        isDeleted: false,
        shadow: "19",
        scolor: "#1e1e1e",
        br: "0",
        frame: "none",
        size: 50,
        transform:
          "translate(-50%,-50%) perspective(500px) rotateY(0deg) rotateX(0deg)",
        component: "image",
        position: { top: 67.8125, left: 66.5625 }
      }
    ],
    canvasStyles: {
      canvasFilters: {
        brightness: 1,
        contrast: 1,
        grayscale: 0,
        blur: 0,
        hueRotate: 0,
        invert: 0,
        saturate: 1,
        sepia: 0,
        opacity: 1
      },
      aspectRatio: "1/1",
      backgroundColor: "#ffffff",
      bgtheme: "image",
      gradangle: 135,
      gradientIndex: 4,
      currentImg: 58
    }
  },

  {
    content: [
      {
        photo: "/ur_img_here.webp",
        id: 1693070033570,
        isDeleted: false,
        shadow: "28",
        scolor: "#1e1e1e",
        br: "0",
        frame: "macOS-white",
        size: "66",
        transform:
          "translate(-50%,-50%) perspective(500px) rotateY(0deg) rotateX(0deg)",
        component: "image",
        position: { top: 55.78125000000001, left: 50 }
      },
      {
        id: 1693070075300,
        isDeleted: false,
        shadow: "0",
        scolor: "#1e1e1e",
        br: "0",
        frame: "none",
        fontSize: 2,
        fontShadow: "0",
        bold: false,
        italic: false,
        underline: false,
        fontFamily: null,
        fontcolor: "#fffafa",
        transform:
          "translate(-50%,-50%) perspective(500px) rotateY(0deg) rotateX(0deg)",
        component: "text",
        position: { top: 92.5, left: 33.75 },
        txt: "Your support means the world to me"
      },
      {
        id: 1693070155953,
        isDeleted: false,
        shadow: "0",
        scolor: "#1e1e1e",
        br: "0",
        frame: "none",
        fontSize: 4,
        fontShadow: 0,
        bold: false,
        italic: false,
        underline: false,
        fontFamily: "__className_9d9b8c",
        fontcolor: "#000000",
        transform:
          "translate(-50%,-50%) perspective(500px) rotateY(0deg) rotateX(0deg)",
        component: "text",
        position: { top: 6.71875, left: 17.5 },
        txt: "Designing A Thumbnail for Your \nBlog shouldn't be that hard !\n"
      }
    ],
    canvasStyles: {
      canvasFilters: {
        brightness: 1,
        contrast: 1,
        grayscale: 0,
        blur: 0,
        hueRotate: 0,
        invert: 0,
        saturate: 1,
        sepia: 0,
        opacity: 1
      },
      aspectRatio: "1/1",
      backgroundColor: "#ffffff",
      bgtheme: "image",
      gradangle: 135,
      gradientIndex: 4,
      currentImg: 65
    }
  },

  {
    content: [
      {
        photo: "/ur_img_here.webp",
        id: 1693065309092,
        isDeleted: false,
        shadow: "20",
        scolor: "#828282",
        br: "0",
        frame: "none",
        size: 50,
        transform:
          "translate(-50%,-50%) perspective(500px) rotateY(0deg) rotateX(0deg)",
        component: "image",
        position: { top: 49.375, left: 22.03125 }
      },
      {
        id: 1693065339501,
        isDeleted: false,
        shadow: "0",
        scolor: "#1e1e1e",
        br: "0",
        frame: "none",
        fontSize: 6,
        fontShadow: "0",
        bold: false,
        italic: false,
        underline: false,
        fontFamily: "__className_e35a75",
        fontcolor: "#000000",
        transform:
          "translate(-50%,-50%) perspective(500px) rotateY(0deg) rotateX(0deg)",
        component: "text",
        position: { top: 16.319444444444454, left: 52.1875 },
        txt: "Best Design\nTool For Busy\nAspirers "
      },
      {
        id: 1693067618976,
        isDeleted: false,
        shadow: "0",
        scolor: "#1e1e1e",
        br: "0",
        frame: "none",
        fontSize: 3,
        fontShadow: "0",
        bold: false,
        italic: false,
        underline: false,
        fontFamily: null,
        fontcolor: "#000000",
        transform:
          "translate(-50%,-50%) perspective(500px) rotateY(0deg) rotateX(0deg)",
        component: "text",
        position: { top: 56.111111111111114, left: 52.1875 },
        txt: "Image Editor & \nScreenshot Enhacer\n"
      }
    ],
    canvasStyles: {
      canvasFilters: {
        brightness: 1,
        contrast: 1,
        grayscale: 0,
        blur: 0,
        hueRotate: 0,
        invert: 0,
        saturate: 1,
        sepia: 0,
        opacity: 1
      },
      aspectRatio: "16/9",
      backgroundColor: "#ffffff",
      bgtheme: "gradient",
      gradangle: 135,
      gradientIndex: 180,
      currentImg: 3
    }
  }
];

export const solidColors = [
  "rgba(255, 0, 0, 1)",
  "rgba(0, 255, 0, 1)",
  "rgba(0, 0, 255, 1)",
  "rgba(255, 255, 0, 1)",
  "rgba(255, 0, 255, 1)",
  "rgba(0, 255, 255, 1)",
  "rgba(255, 165, 0, 1)",
  "rgba(128, 0, 128, 1)",
  "rgba(169, 169, 169, 1)",
  "rgba(128, 128, 128, 1)",
  "rgba(192, 192, 192, 1)",
  "rgba(255, 99, 71, 1)",
  "rgba(255, 69, 0, 1)",
  "rgba(255, 140, 0, 1)",
  "rgba(255, 215, 0, 1)",
  "rgba(154, 205, 50, 1)",
  "rgba(50, 205, 50, 1)",
  "rgba(34, 139, 34, 1)",
  "rgba(0, 128, 0, 1)",
  "rgba(0, 100, 0, 1)",
  "rgba(0, 191, 255, 1)",
  "rgba(65, 105, 225, 1)",
  "rgba(0, 0, 139, 1)",
  "rgba(255, 192, 203, 1)",
  "rgba(255, 105, 180, 1)",
  "rgba(199, 21, 133, 1)",
  "rgba(139, 0, 139, 1)",
  "rgba(75, 0, 130, 1)",
  "rgba(70, 130, 180, 1)",
  "rgba(25, 25, 112, 1)",
  "rgba(0, 0, 0, 1)",
  "rgba(255, 255, 255, 1)",
  "rgba(218, 112, 214, 1)",
  "rgba(0, 128, 128, 1)",
  "rgba(128, 0, 0, 1)",
  "rgba(240, 255, 240, 1)"
];
