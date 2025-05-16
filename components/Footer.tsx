import { FaLocationArrow } from "react-icons/fa6";

import { footerInfo } from "../app/siteConfig";
// import MagicButton from "./MagicButton";
// import { TextGenerateTwoColors } from "./ui/TextGenerateEffect";

const Footer = () => {
  const { config, builder } = footerInfo;
  const mailto = "mailto:" + builder.email;
  return (
    <>
      <footer className="w-full pt-10 pb-10" id="contact">
        {/* background grid */}
        <div className="w-full absolute left-0 min-h-5">
          <img
            src="/footer-grid.svg"
            alt="grid"
            className="w-full h-7 opacity-50 "
          />
        </div>

        <hr className="divider_section" />
        <div className="flex mt-5 md:flex-row flex-col justify-between items-center">
          <div className="flex align-middle gap-3">
            <span>Copyright © {builder.publishDate}</span>
            <img
              src={builder.iconLink}
              alt={builder.organization}
              width={24}
              height={20}
            />
            <span>{builder.organization}</span>
          </div>
          <div className="flex items-center md:gap-3 gap-4">
            {footerInfo.socialMedia.map((info) => (
              <a
                href={info.url}
                key={info.id}
                rel={"noopener noreferrer"}
                target={"_blank"}
              >
                <div className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-slate-100 rounded-lg border border-x-slate-200">
                  <img src={info.img} alt="icons" width={22} height={22} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
