import { ExternalLinkIcon } from "lucide-react";
import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Separator } from "../../../../components/ui/separator";

// Define data for footer columns to make the code more maintainable
const contactLinks = [
  { text: "Changelog", isNew: true },
  { text: "Linkedin extension", isExternal: true },
  { text: "Gmail extension", isExternal: true },
  { text: "iOS app", isExternal: true },
  { text: "Android app", isExternal: true },
  { text: "Security" },
];

const servicesLinks = [
  { text: "Interior Painting", isNew: true },
  { text: "Exterior Painting" },
  { text: "Texture Painting" },
  { text: "Stencil Painting" },
  { text: "Wood Polishing" },
  { text: "Wood Coating" },
  { text: "Carpentry Services" },
];

const quickLinks = [
  { text: "Painters in Delhi" },
  { text: "Painters Contractor in Delhi" },
  { text: "FAQ" },
  { text: "Privacy Policy" },
  { text: "We" },
  { text: "System status", isExternal: true },
];

const bottomLinks = ["English", "Privacy", "Legal"];

export const FooterSection = (): JSX.Element => {
  return (
    <footer className="flex w-full items-end justify-center">
      <div className="relative w-full h-[416px] bg-[#1a1c1d] overflow-hidden">
        <div className="flex w-[1120px] items-start justify-between mx-auto pt-14">
          <div className="flex w-[364px] items-center gap-16 relative">
            <img
              className="relative w-[104px] h-[41px] object-cover"
              alt="Home glazer logo"
              src="/assets/images/home-glazer-logo-1.png"
            />

            <div className="relative w-[139.3px] h-[35.18px]">
              <div className="absolute w-[35px] h-[35px] top-0 left-[104px] rounded-[17.59px] border-[0.7px] border-solid border-white">
                <img
                  className="absolute w-[19px] h-[13px] top-[11px] left-2"
                  alt="Icon"
                  src="/assets/images/icon-2.svg"
                />
              </div>

              <div className="absolute w-[35px] h-[35px] top-0 left-[52px] rounded-[17.59px] border-[0.7px] border-solid border-white">
                <img
                  className="absolute w-5 h-4 top-[9px] left-[7px]"
                  alt="Icon"
                  src="/assets/images/icon.svg"
                />
              </div>

              <div className="absolute w-[35px] h-[35px] top-0 left-0 rounded-[17.59px] border-[0.7px] border-solid border-white">
                <img
                  className="absolute w-2.5 h-[19px] top-2 left-3"
                  alt="Icon"
                  src="/assets/images/icon-1.svg"
                />
              </div>
            </div>
          </div>

          <div className="flex items-start gap-[120px]">
            {/* Contact Column */}
            <div className="flex flex-col items-start gap-2">
              <div className="font-['Epilogue',Helvetica] font-medium text-[#969696] text-sm tracking-[0.28px] leading-[22.4px]">
                Contact
              </div>

              {contactLinks.map((link, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  <div className="font-['Epilogue',Helvetica] font-normal text-[#6f7988] text-sm tracking-[0.28px] leading-[22.4px]">
                    {link.text}
                  </div>

                  {link.isNew && (
                    <Badge className="h-[15px] px-1.5 py-0 bg-[#538bf3] rounded-[10px] font-normal">
                      <span className="text-[10px] tracking-[0.20px] leading-4">
                        New
                      </span>
                    </Badge>
                  )}

                  {link.isExternal && (
                    <ExternalLinkIcon className="w-3.5 h-3.5" />
                  )}
                </div>
              ))}
            </div>

            {/* Our Main Services Column */}
            <div className="flex flex-col items-start gap-2">
              <div className="font-['Epilogue',Helvetica] font-medium text-[#969696] text-sm tracking-[0.28px] leading-[22.4px]">
                Our Main Services
              </div>

              {servicesLinks.map((link, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  <div className="font-['Epilogue',Helvetica] font-normal text-[#6f7988] text-sm tracking-[0.28px] leading-[22.4px]">
                    {link.text}
                  </div>

                  {link.isNew && (
                    <Badge className="h-[15px] px-1.5 py-0 bg-[#538bf3] rounded-[10px] font-normal">
                      <span className="text-[10px] tracking-[0.20px] leading-4">
                        New
                      </span>
                    </Badge>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Links Column */}
            <div className="flex flex-col items-start gap-2">
              <div className="font-['Epilogue',Helvetica] font-medium text-[#969696] text-sm tracking-[0.28px] leading-[22.4px]">
                Quick Links
              </div>

              {quickLinks.map((link, index) => (
                <div key={index} className="flex items-center gap-[3px]">
                  <div className="font-['Epilogue',Helvetica] font-normal text-[#6f7988] text-sm tracking-[0.28px] leading-[22.4px]">
                    {link.text}
                  </div>

                  {link.isExternal && (
                    <ExternalLinkIcon className="w-3.5 h-3.5" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <img
            className="absolute w-[351px] h-1.5 top-[70px] left-[46px]"
            alt="Vector"
            src="/assets/images/vector-2.svg"
          />
        </div>

        <Separator className="absolute w-[1188px] h-px top-[326px] left-[46px] bg-[#e6e6e680]" />

        <div className="absolute w-full h-[68px] bottom-0 left-0">
          <div className="absolute w-full h-11 bottom-0 left-0 bg-[#0a0b0c]" />

          <div className="flex flex-col w-[1188px] h-[52px] items-center justify-center gap-6 absolute top-0 left-[46px]">
            <div className="flex items-center justify-center gap-[17.15px]">
              {bottomLinks.map((link, index) => (
                <React.Fragment key={index}>
                  <div className="flex h-[17.15px] items-center gap-[8.58px] rounded-[4.29px]">
                    <div className="font-body-caption-s-regular text-white whitespace-nowrap">
                      {link}
                    </div>
                  </div>

                  {index < bottomLinks.length - 1 && (
                    <div className="w-[4.29px] h-[4.29px] bg-white rounded-[17.15px]" />
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="flex flex-col items-start justify-center">
              <div className="font-['Poppins',Helvetica] font-normal text-text-300 text-[12.9px] leading-[17.2px]">
                © 2025 Homeglazer. All Rights Reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
