import NavigationLayout from "@/Layout/NavigationLayout";
import Home from "@/Pages/Home/Home";
import HandyFreeTools from "@/Pages/Tools/HandyFreeTools";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../../Components/ErrorPage/ErrorPage";
import About from "../../Pages/About/About";
// import Pricing from "@/Pages/Pricing/Pricing";
import Contact from "@/Pages/Contact/Contact";
import Privacy from "@/Pages/Privacy/Privacy";
import Terms from "@/Pages/Terms/Terms";
import SignUpPage from "@/Pages/Signup/Signup";
import LoginPage from "@/Pages/Login/Login";
import Design from "@/Pages/Design/Design";
import ScreenshotMockup from "@/Pages/ScrrenShotMockup/ScreenShotMockup";
import Code from "@/Pages/Code/Code";
import DeviceMockUp from "@/Pages/Device-Mockups/DeviceMockUp";
import Device from "@/Pages/Device-Mockups/Device";
import Videos from "@/Pages/Videos/Videos";
import VideoLayout from "@/Pages/Videos/Typerwriter";
import TweetScreenShort from "@/Pages/TweetScreenShort/TweetScreenShort";
import RedditScreenShort from "@/Pages/RedditScreenShort/RedditScreenShort";
import Testimonial from "@/Pages/Testimonial/Testimonial";
import YoutubeScreenShort from "@/Pages/YoutubeScreenShort/YoutubeScreenShort";
import Twitter from "@/Pages/Twitter/Twitter";
import QrCode from "@/Pages/QrCode/QrCode";
import ShortBlog from "@/Pages/ShortBlog/ShortBlog";
import Instagram from "@/Pages/Instragram/Instragram";
import BarCode from "@/Pages/BarCode/BarCode";
import IconGenerator from "@/Pages/More/IconImage";
import ImageConverter from "@/Pages/More/ImageConverter";
import BlurImage from "@/Pages/More/BlurImage";
import CropImageTool from "@/Pages/More/CropImage";
import GifGenerator from "@/Pages/More/gif";
import GoogleSuggestion from "@/Pages/More/GoogleSuggestions";
import ImageColorPicker from "@/Pages/More/ImageColorPicker";
import ColorPicker from "@/Pages/More/ColorPicker";
import ImageResizer from "@/Pages/More/ResizeImage";
import FeatureLayout from "../../Layout/FeatureLayout";
import TemplateSelector from "../../Components/landing/TemplateSelector";
import Features from "../../Pages/Features/Features";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <NavigationLayout />,
    // errorElement: <ErrorPage />,
    children: [
      /* Sidebar all routes setup start */
      {
        path: "*", // Catch-all route for undefined routes (404)
        element: <ErrorPage />, // Display ErrorPage for 404 or unmatched routes
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/more",
        element: <HandyFreeTools />,
      },
      // {
      //   path: "/pricing",
      //   element: <Pricing />
      // },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/privacy",
        element: <Privacy />,
      },
      {
        path: "/terms",
        element: <Terms />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      /* Sidebar all routes setup end */

      /* home page all templates routes setup start */
      {
        path: "/design",
        element: <Design />,
      },
      {
        path: "/screenshot-mockup",
        element: <ScreenshotMockup />,
      },
      {
        path: "/code",
        element: <Code />,
      },
      {
        path: "/device-mockups",
        element: <DeviceMockUp />,
      },
      {
        path: "/device-mockups/:device",
        element: <Device />,
      },
      {
        path: "/videos",
        element: <Videos />,
      },
      {
        path: "/videos/typewriter",
        element: <VideoLayout />,
      },
      {
        path: "/tweet-to-screenshot",
        element: <TweetScreenShort />,
      },
      {
        path: "/reddit-screenshot",
        element: <RedditScreenShort />,
      },
      {
        path: "/testimonial",
        element: <Testimonial />,
      },
      {
        path: "/youtube-screenshot",
        element: <YoutubeScreenShort />,
      },
      {
        path: "/twitter",
        element: <Twitter />,
      },
      {
        path: "/qr-code",
        element: <QrCode />,
      },
      {
        path: "/short-blog",
        element: <ShortBlog />,
      },
      {
        path: "/instagram",
        element: <Instagram />,
      },
      {
        path: "/bar-code",
        element: <BarCode />,
      },

      /* home page all templates routes setup end */

      /* more tools routes setup start */
      {
        path: "/more/icon-image",
        element: <IconGenerator />,
      },
      {
        path: "/more/image-converter",
        element: <ImageConverter />,
      },
      {
        path: "/more/blur-image",
        element: <BlurImage />,
      },
      {
        path: "/more/crop-image",
        element: <CropImageTool />,
      },
      {
        path: "/more/gif",
        element: <GifGenerator />,
      },
      {
        path: "/more/google-suggestions",
        element: <GoogleSuggestion />,
      },
      {
        path: "/more/color-picker",
        element: <ColorPicker />,
      },
      {
        path: "/more/image-color-picker",
        element: <ImageColorPicker />,
      },
      {
        path: "/more/resize-image",
        element: <ImageResizer />,
      },
      /* more tools routes setup end */
    ],
  },
  {
    path: "/features",
    element: <FeatureLayout />,
    children: [
      /* Sidebar all routes setup start */
      {
        path: "*",
        element: <ErrorPage />,
      },
      {
        path: "/features",
        element: <Features />,
      },
    ],
  },
]);
