import { defaultResumeData, ResumeData, resumeDataSchema } from "@reactive-resume/schema";
import { Json } from "@reactive-resume/utils";
import { Schema } from "zod";

import { Parser } from "../interfaces/parser";
import { replaceCuid2Placeholders } from "../replace-cuid2";

export class ReactiveResumeParser implements Parser<Json, ResumeData> {
  schema: Schema;

  constructor() {
    this.schema = resumeDataSchema;
  }

  readFile(file: File): Promise<Json> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      // eslint-disable-next-line unicorn/prefer-add-event-listener
      reader.onload = () => {
        try {
          const json = JSON.parse(reader.result as string) as Json;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const replacedJson = replaceCuid2Placeholders(json) as any;
          const result = {
            ...defaultResumeData,
            ...replacedJson,
            sections: {
              ...defaultResumeData.sections,
              ...replacedJson.sections,
            },
          };
          resolve(result);
        } catch {
          reject(new Error("Failed to parse JSON"));
        }
      };

      // eslint-disable-next-line unicorn/prefer-add-event-listener
      reader.onerror = () => {
        reject(new Error("Failed to read the file"));
      };

      // eslint-disable-next-line unicorn/prefer-blob-reading-methods
      reader.readAsText(file);
    });
  }

  validate(data: Json) {
    // console.log(data)
    return this.schema.parse(data) as ResumeData;
  }

  convert(data: ResumeData) {
    return data;
  }
}
