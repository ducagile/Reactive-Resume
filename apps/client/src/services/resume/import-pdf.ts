import { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";

// export const getSchemaData = async (data: { data: string; title: string }) => {
//   const response = await axios.post<string, AxiosResponse<ResumeDto>>("/resume/getValues", {
//     data,
//   });

//   return response.data;
// };

type AnyObject = Record<string, string>;

export const importPdfResume = async (data: FormData) => {
  const response = await axios.post<string, AxiosResponse<AnyObject>>("/resume/upload", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// export const useImportPdfResume = () => {
//   const {
//     error,
//     isPending: loading,
//     mutateAsync: importResumeFn,
//   } = useMutation({
//     mutationFn: importPdfResume,
//     onSuccess: (data) => {
//       queryClient.setQueryData<ResumeDto>(["resume", { id: data.id }], data);

//       queryClient.setQueryData<ResumeDto[]>(["resumes"], (cache) => {
//         if (!cache) return [data];
//         return [...cache, data];
//       });
//     },
//   });

//   return { importPdfResume: importResumeFn, loading, error };
// };
