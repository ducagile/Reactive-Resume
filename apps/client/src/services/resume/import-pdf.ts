import { ResumeDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";
import { queryClient } from "@/client/libs/query-client";

type AnyObject = Record<string, string>;

export const importPdfResume = async (data: FormData): Promise<ResumeDto[]> => {
  const response = await axios.post<ResumeDto[], AxiosResponse<ResumeDto[]>>(
    "/resume/upload",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};

export const useImportPdfResume = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: importResumeFn,
  } = useMutation({
    mutationFn: importPdfResume,
    onSuccess: (data) => {
      for (const resume of data) {
        queryClient.setQueryData<ResumeDto>(["resume", { id: resume.id }], resume);
      }

      queryClient.setQueryData<ResumeDto[]>(["resumes"], (cache) => {
        if (!cache) return [...data];
        return [...data, ...cache];
      });
    },
  });

  return { importResume: importResumeFn, loading, error };
};
