import { t } from "@lingui/macro";
import { useTheme } from "@reactive-resume/hooks";
import { Button } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import dayjs from "dayjs";

import { IJob } from "@/client/services/job/job";
import { useTechStacks } from "@/client/services/job/tech-stack";

type AnyObject = Record<string, string>;

type Props = {
  job?: IJob;
  className?: string;
  onClick?: () => void;
};

export const BaseListItem = ({ job, className, onClick }: Props) => {
  const { techStacks } = useTechStacks();
  const { isDarkMode } = useTheme();
  const postedTime = dayjs().to(job?.CreatedAt);
  const findTitle = (id: number) => {
    return techStacks?.find((ts) => ts.Id === id)?.title;
  };

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleApply = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className={cn(
        "flex cursor-pointer items-center rounded-2xl border border-secondary px-6 py-4 transition-colors hover:bg-secondary/30",
        className,
      )}
      onClick={onClick}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex w-full flex-col gap-4 space-x-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h4 className="line-clamp-1 truncate text-2xl font-semibold">{job?.title}</h4>
              {job && <p className="!m-0 text-sm font-thin opacity-75">{postedTime}</p>}
            </div>
            {job && <Button className="rounded-full px-6" onClick={(e) => handleApply(e)}>{t`Apply`}</Button>}
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: job ? job.description : "",
            }}
            className="!m-0 line-clamp-5 pt-2 text-base"
          />
          <div className="!m-0 flex gap-2">
            {job?._nc_m2m_job_tech_stacks.map((ts) => (
              <div
                className="rounded-full px-6 py-1 text-sm"
                style={{
                  border: `1px solid ${isDarkMode ? "white" : "#0057FF"}`,
                  backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#e6efff",
                }}
              >
                {findTitle(ts.tech_stack_id as unknown as number)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
};
