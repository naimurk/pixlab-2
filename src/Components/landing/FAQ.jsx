import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const FrequentlyAskedQuestion = () => {
  const [isOpen, setIsOpen] = useState(null);
  const toggle = (idx) => {
    setIsOpen((prevIdx) => (prevIdx === idx ? null : idx));
  };

  // FAQs array
  const dataArr = [
    {
      question: "What is Picyard?",
      answer:
        "pixlab is a free online tool that allows you to create beautiful images for social media, blog posts, presentations, and more. You can use pixlab to create Beautiful Images, Testimonials, Code Snippets, QR Codes and then download them as PNG or JPEG files.",
    },
    {
      question: "Is Picyard free?",
      answer: "Yes pixlab is free to use, but also comes with a premium plan",
    },
    {
      question: "Does Picyard store my images?",
      answer:
        "pixlab produces your beautiful looking images in your browser and no information or data is uploaded on the internet.",
    },
    {
      question: "Do i need to create an account to use Picyard?",
      answer:
        "No, you do not need to create an account to use the tools on pixlab. However, creating an account can provide a more personalized experience.",
    },
    {
      question: "Can i use Picyard for free commercial purpose?",
      answer:
        "Yes, you can use the tools provided by pixlab for commercial purposes.",
    },
    {
      question: "How many images can i create with Picyard?",
      answer:
        "You can create an unlimited number of images with pixlab. There is no limit on the number of images you can create or the number of times you can use the tool.",
    },
  ];

  return (
    <section className=" gradient-template ">
      <div className="mx-auto flex w-full max-w-7xl flex-col  items-center px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto flex max-w-xl flex-col items-center justify-center px-6 text-center lg:max-w-3xl lg:px-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Frequently Asked Questions
          </h2>
        </div>
        <div className=" w-full ">
          {dataArr.map((PerAccordion, idx) => (
            <div
              key={idx}
              className="my-2 border-b bp-3 py-5 *:mix-blend-difference border-zinc-600 "
            >
              <button
                onClick={() => toggle(idx)}
                className="flex h-full w-full items-center  justify-between font-medium text-white outline-none"
              >
                <span className="text-xl text-left">
                  {PerAccordion.question}
                </span>
                {isOpen == idx ? (
                  <FaMinus className="text-[rgb(201_38_152)] sm:text-3xl" />
                ) : (
                  <FaPlus className="text-[rgb(201_38_152)] sm:text-3xl" />
                )}
              </button>
              <div
                className={`grid overflow-hidden text-zinc-400 transition-all duration-300 ease-in-out ${
                  isOpen === idx
                    ? "grid-rows-[1fr] pb-1 pt-3 opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden pr-4 text-md">
                  {PerAccordion.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FrequentlyAskedQuestion;
