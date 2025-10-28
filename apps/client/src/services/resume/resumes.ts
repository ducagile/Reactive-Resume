import { ResumeDto, ResumeStatus } from "@reactive-resume/dto";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { RESUMES_KEY } from "@/client/constants/query-keys";
import { axios } from "@/client/libs/axios";
import { queryClient } from "@/client/libs/query-client";

export const fetchResumes = async () => {
  const response = await axios.get<ResumeDto[], AxiosResponse<ResumeDto[]>>("/resume");

  return response.data;
};

export const useResumes = (enabled = true) => {
  const {
    error,
    isPending: loading,
    data: resumes,
  } = useQuery({
    queryKey: RESUMES_KEY,
    queryFn: fetchResumes,
    enabled,
    refetchInterval: (data) => {
      const resumes = data.state.data;

      if (!Array.isArray(resumes)) return false;

      for (const r of resumes) {
        const cached = queryClient.getQueryData<ResumeDto>(["resume", { id: r.id }]);
        if (cached?.status === ResumeStatus.PENDING)
          queryClient.setQueryData<ResumeDto>(["resume", { id: r.id }], r);
      }

      const hasPending = resumes.some((r: ResumeDto) => r.status === ResumeStatus.PENDING);
      return hasPending ? 7000 : false;
    },
  });

  return { resumes, loading, error };
};
