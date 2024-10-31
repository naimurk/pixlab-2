import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";

import Footer from "../shared/footer/Footer";
import { useAppContext } from "@/context";
import HandyFreeTools from "@/Pages/Tools/HandyFreeTools";
import {
  Barcode,
  Camera,
  Code,
  FileText,
  Instagram,
  Monitor,
  PanelsTopLeft,
  QrCode,
  Star,
  Twitter,
  Video,
  Youtube,
} from "lucide-react";
import { FaReddit } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import Hero from "./Hero";

const TemplateSelector = () => {
  const context = useAppContext();
  const { planType } = context.sharedState;

  const templates = [
    {
      title: "Design Canvas",
      thumbnail: "/FeatureGraphic.webp",
      link: "/design",
      description: "Design from scratch",
    },
    {
      title: "Screenshot Mockups",
      thumbnail: "/shot.webp",
      link: "/screenshot-mockup",
      description: "Amazing screenshot mockups",
    },
    {
      title: "Code Image Generator",
      thumbnail: "/code.webp",
      link: "/code",
      description: "Eye catchy code snippets",
    },
    {
      title: "Device Mockups",
      thumbnail: "/dv.webp",
      link: "/device-mockups",
      description: "Create Professional Device Mockups",
    },
    {
      title: "Video templates (new)",
      thumbnail: "/vidtemplates.webp",
      link: "/videos",
      description: "Create beautiful tweet images",
    },
    {
      title: "Tweet screenshot",
      thumbnail: "/tweetshot.webp",
      link: "/tweet-to-screenshot",
      description: "Create beautiful tweet images",
    },
    {
      title: "Reddit screenshot",
      thumbnail: "/redditshot.webp",
      link: "/reddit-screenshot",
      description: "Create beautiful reddit images",
    },
    {
      title: "Testimonial",
      thumbnail: "/testimonial.webp",
      link: "/testimonial",
      description: "Appealing testimonials",
    },
    {
      title: "Youtube screenshot",
      thumbnail: "/ytshot.webp",
      link: "/youtube-screenshot",
      description: "Create beautiful youtube thumbnail images",
    },
    {
      title: "Fake Tweet",
      thumbnail: "/ft.webp",
      link: "/twitter",
      description: "Quirky fake tweets",
    },
    {
      title: "QR Code",
      thumbnail: "/qr.webp",
      link: "/qr-code",
      description: "Custom QR Codes",
    },
    {
      title: "Short Blog",
      thumbnail: "/sb.webp",
      link: "/short-blog",
      description: "Express yourself",
    },
    {
      title: "Instagram",
      thumbnail: "/insta.webp",
      link: "/instagram",
      description: "Post previews generator",
    },
    {
      title: "Bar Code",
      thumbnail: "/barcode.webp",
      link: "/bar-code",
      description: "Custom Bar Codes",
    },
  ];
  const midpoint = Math.ceil(templates.length / 2);
  const firstHalf = templates.slice(0, midpoint);
  const secondHalf = templates.slice(midpoint);
  const location = useLocation();

  return (
    <>
      {location.pathname == "/" && (
        <div className="flex-1 overflow-y-auto py-10 gradient-template">
          <main className="px-5">
            <div className="relative space-y-10">
              {" "}
              <Swiper
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                  },
                  640: {
                    slidesPerView: 2,
                    pagination: {
                      enabled: false,
                    },
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                  1440: {
                    slidesPerView: 4,
                  },
                }}
                modules={[Pagination]}
                className="mySwiper"
              >
                {firstHalf.map((template, index) => (
                  <SwiperSlide
                    key={index}
                    className="overflow-hidden rounded-xl"
                  >
                    {" "}
                    <TemplateCard key={index} {...template} />
                  </SwiperSlide>
                ))}
              </Swiper>
              <Swiper
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                  },
                  640: {
                    slidesPerView: 2,
                    pagination: {
                      enabled: false,
                    },
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                  1440: {
                    slidesPerView: 4,
                  },
                }}
                modules={[Pagination]}
                className="mySwiper"
              >
                {secondHalf.map((template, index) => (
                  <SwiperSlide
                    key={index}
                    className="overflow-hidden rounded-xl"
                  >
                    {" "}
                    <TemplateCard key={index} {...template} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </main>
        </div>
      )}
      {location.pathname == "/features" && (
        <div className="px-10">
          <h2 className="text-white font-medium text-2xl mb-5">
            Templates to get you started
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6  pb-12 mb-12">
            {templates.map((template, index) => (
              <TemplateCard key={index} {...template} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default TemplateSelector;

const iconMap = {
  "Design Canvas": PanelsTopLeft,
  "Screenshot Mockups": Camera,
  "Code Image Generator": Code,
  "Device Mockups": Monitor,
  "Video templates (new)": Video,
  "Tweet screenshot": Twitter,
  "Reddit screenshot": FaReddit,
  Testimonial: Star,
  "Youtube screenshot": Youtube,
  "Fake Tweet": Twitter,
  "QR Code": QrCode,
  "Short Blog": FileText,
  Instagram: Instagram,
  "Bar Code": Barcode,
};

export const TemplateCard = ({ title, thumbnail, link, description }) => {
  const Icon = iconMap[title] || FileText;

  return (
    <Link
      to={link}
      onClick={() => {
        sessionStorage.setItem("homeScroll", window.scrollY);
      }}
      className="group  bg-gradient-to-br overflow-hidden from-gray-50 to-gray-100 md:from-white md:to-white dark:from-gray-800 dark:to-gray-900 md:rounded-xl hover:shadow-lg transition-all duration-300 flex flex-col"
    >
      <div className="relative overflow-hidden">
        <img
          src={thumbnail}
          className="aspect-video overflow-hidden rounded-none  object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-105"
          alt={title}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Icon className="text-white w-12 h-12" />
        </div>
      </div>
    </Link>
  );
};
