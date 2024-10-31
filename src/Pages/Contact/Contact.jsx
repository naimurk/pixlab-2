import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center my-4">
        <div className="flex flex-col min-w-[60vw] max-w-[90vw] rounded-lg text-black dark:text-white">
          <div>
            <h1 className="text-center mt-4 flex text-black dark:text-white">
              Contact Us
            </h1>
            <p>Hey 👋,</p>
            <p>You can reach out to us at</p>

            <div className="flex items-center">
              <MdEmail />
              <Link
                to="mailto:pixlabeditor@gmail.com"
                className="ml-2 text-darkcyan dark:text-skyblue text-center"
              >
                pixlabeditor@gmail.com
              </Link>
            </div>
            <div className="flex items-center">
              <FaXTwitter />
              <Link
                to="https://twitter.com/pixlab"
                target="_blank"
                className="ml-2 text-darkcyan dark:text-skyblue text-center"
              >
                @pixlab
              </Link>
            </div>

            <p className="mt-4">Regards,</p>
            <p>Team pixlab</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
