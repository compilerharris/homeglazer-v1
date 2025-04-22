import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";

export const ContactUsSection = (): JSX.Element => {
  // Form field data for mapping
  const formFields = [
    {
      id: "name",
      label: "First name",
      placeholder: "Name",
      required: true,
      type: "input",
    },
    {
      id: "email",
      label: "Email",
      placeholder: "Email address",
      required: true,
      type: "input",
    },
    {
      id: "mobile",
      label: "Mobile",
      placeholder: "Your mobile number",
      required: true,
      type: "input",
    },
    {
      id: "message",
      label: "Message",
      placeholder: "Your message",
      required: true,
      type: "textarea",
    },
  ];

  return (
    <Card className="w-[358px] bg-white rounded-xl shadow-[0px_5px_16px_#080f340f]">
      <CardContent className="p-0">
        <div className="flex flex-col w-full items-center gap-2.5 p-6 pt-9 pb-2">
          <div className="flex flex-col items-start gap-3.5 w-full">
            {formFields.map((field) =>
              field.type === "input" ? (
                <div
                  key={field.id}
                  className="flex flex-col w-full relative mb-3.5"
                >
                  <div className="relative w-full">
                    <div className="inline-flex items-start gap-[3px] px-[5px] py-0 absolute -top-1 left-3 bg-mini-title-bg rounded-[30px] z-10">
                      <div className="[font-family:'Inter',Helvetica] font-semibold text-mini-title text-xs">
                        {field.label}
                      </div>
                      {field.required && (
                        <div className="[font-family:'Inter',Helvetica] font-semibold text-x-color text-xs">
                          *
                        </div>
                      )}
                    </div>
                    <Input
                      className="h-10 bg-white rounded-lg border border-solid border-[#d2d5da] shadow-[0px_2px_2px_#0000000d] pl-4 pt-2"
                      placeholder={field.placeholder}
                    />
                  </div>
                </div>
              ) : (
                <div
                  key={field.id}
                  className="flex flex-col w-full relative mb-3.5"
                >
                  <div className="relative w-full">
                    <div className="inline-flex items-start gap-[3px] px-[5px] py-0 absolute -top-1 left-3 bg-mini-title-bg rounded-[30px] z-10">
                      <div className="[font-family:'Inter',Helvetica] font-semibold text-mini-title text-xs">
                        {field.label}
                      </div>
                      {field.required && (
                        <div className="[font-family:'Inter',Helvetica] font-semibold text-x-color text-xs">
                          *
                        </div>
                      )}
                    </div>
                    <Textarea
                      className="h-[110px] bg-white rounded-lg border border-solid border-[#d2d5da] shadow-[0px_2px_2px_#0000000d] pl-4 pt-6"
                      placeholder={field.placeholder}
                    />
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
        <div className="px-[22px] pb-6">
          <Button className="w-full h-10 gap-2.5 px-3.5 py-2 bg-[#dae6ec] rounded-[26px] text-black hover:bg-[#c8d6de]">
            <span className="[font-family:'Quicksand',Helvetica] font-normal text-base text-center">
              Submit Enquiry
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
