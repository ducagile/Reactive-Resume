/* eslint-disable lingui/no-unlocalized-strings */
import { t } from "@lingui/macro";
import { BookBookmark, Check, Copy } from "@phosphor-icons/react";
import React, { useEffect, useMemo, useState } from "react";

import { jsonResumeSchema, talentHubSchema, talentHubV3Schema } from "./sample";

const schemaMapping = {
  "reactive-resume-json": talentHubSchema,
  "reactive-resume-v3-json": talentHubV3Schema,
  "json-resume-json": jsonResumeSchema,
};

const DescriptionImport = ({
  filetype,
}: {
  filetype: "reactive-resume-json" | "reactive-resume-v3-json" | "json-resume-json";
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const [counting, setCounting] = useState(0);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const sample = useMemo(() => {
    return schemaMapping[filetype]();
  }, [filetype]);

  const handleCopy = async () => {
    if (counting > 0) return;
    setCounting(3);
    await navigator.clipboard.writeText(JSON.stringify(sample, null, 2));
    const interval = setInterval(() => {
      setCounting((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="relative">
      <div
        className="group flex w-fit cursor-pointer items-center gap-1 py-2"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <BookBookmark size={16} className="text-gray-300" />
        <button
          type="reset"
          className="text-sm text-gray-500 group-hover:underline"
        >{t`Sample Schema`}</button>
      </div>
      <div
        ref={ref}
        className="absolute left-[132px] top-[12px] flex flex-col gap-[12px] rounded-[16px] !bg-black p-4 shadow-lg "
        style={{ display: isOpen ? "flex" : "none" }}
      >
        <p>{t`Schema: `}</p>
        <div className="relative">
          <div
            className="absolute right-2 top-2 cursor-pointer rounded-[8px] border-[0.5px] border-[#acacac] p-2 transition hover:scale-110"
            onClick={handleCopy}
          >
            {counting > 0 ? (
              <Check size={16} className="text-green-500" />
            ) : (
              <Copy size={16} className="text-gray-300" />
            )}
          </div>
          <div className="max-h-[160px] w-[384px] overflow-auto rounded-[16px]">
            <pre className="whitespace-pre-wrap rounded bg-secondary-accent p-4 font-mono text-xs leading-relaxed">
              {JSON.stringify(sample, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionImport;
