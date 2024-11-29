import { t } from "@lingui/macro";
import { ContextMenu, ContextMenuTrigger } from "@radix-ui/react-context-menu";
import dayjs from "dayjs";

import { ITechStack } from "@/client/services/job";
import { IJob, IJobApply } from "@/client/services/job/job";
import { useAuthStore } from "@/client/stores/auth";
import { useDialog } from "@/client/stores/dialog";

import { BaseListItem } from "./item";

type JobItemProps = {
  job: IJob;
  jobTechStacks: ITechStack[];
}

export const JobItem = ({ job, jobTechStacks }: JobItemProps) => {
  const { open } = useDialog<IJob>("job");
  const { open: openApply } = useDialog<IJobApply>("apply-job");
  const { user } = useAuthStore();
  const postedTime = dayjs().to(job.CreatedAt);

  const onDescription = () => {
    open("description", { id: "job", item: job });
  };

  const onClickApply = () => {
    openApply("create", {
      id: "apply-job",
      item: { job, coverLetter: "", userId: user ? user.id : "", resumes: [] },
    });
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger className="even:bg-secondary/20">
        <BaseListItem
          className="group"
          title={job.title}
          time={t`Posted ${postedTime}`}
          techStackArray={jobTechStacks}
          description={job.description}
          onClick={onDescription}
          onClickApply={onClickApply}
        />
      </ContextMenuTrigger>
    </ContextMenu>
  );
};
