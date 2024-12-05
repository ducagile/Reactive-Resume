import { t } from "@lingui/macro";
import { ArrowLeft } from "@phosphor-icons/react";
import { useTheme } from "@reactive-resume/hooks";
import { Button, Dialog, DialogContent, DialogHeader, ScrollArea } from "@reactive-resume/ui";
import dayjs from "dayjs";
import { AnimatePresence } from "framer-motion";
import { useMemo } from "react";

import { defaultJob, IJob, IJobApply } from "@/client/services/job";
import { useTechStacks } from "@/client/services/job/tech-stack";
import { useAuthStore } from "@/client/stores/auth";
import { useDialog } from "@/client/stores/dialog";

export const DescriptionJobDialog = () => {
  const { isOpen, close, payload } = useDialog("job");
  const { techStacks } = useTechStacks();
  const { isDarkMode } = useTheme();

  const { user } = useAuthStore();
  const { open: openApply } = useDialog<IJobApply>("apply-job");

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const job = useMemo<IJob>(() => (payload ? (payload.item as IJob) : defaultJob), [payload]);

  const findTitle = (id: number) => {
    return techStacks?.find((ts) => ts.Id === id)?.title;
  };

  const postedTime = useMemo(
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    () => (payload ? dayjs().to((payload.item as IJob).CreatedAt) : ""),
    [payload],
  );

  const onClickApply = () => {
    if (job && user) {
      openApply("create", {
        id: "apply-job",
        item: { job, coverLetter: "", userId: user.id, resumes: [] },
      });
    }
  };

  return (
    <Dialog
      // open={true}
      open={isOpen}
      onOpenChange={close}
    >
      <DialogContent
        style={{
          maxWidth: "56rem",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          // height: pdfState === "none" ? "unset" : "88vh",
          // data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]
        }}
        // data-[state=closed]:!translate-x-full data-[state=open]:!translate-x-0
        // data-[state=close]:opacity-0 data-[state=open]:opacity-100 data-[state=open]:!slide-in-from-right-full
        className="w-[calc(100vw - 20px)] !top-0 right-0 z-50 h-screen text-lg duration-700 data-[state=closed]:opacity-0 data-[state=open]:opacity-100 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:!duration-500 data-[state=open]:!duration-700 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right xl:w-[1024px]"
        sidePosition={true}
        classNameOverlay="!duration-700"
      >
        <DialogHeader>
          <ArrowLeft size={32} className="cursor-pointer" onClick={close} />
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-extrabold">{job.title}</h1>
            <p className="text-base">{t`Posted ${postedTime}`}</p>
          </div>
          <AnimatePresence presenceAffectsLayout>
            <Button
              className="rounded-md py-6 text-lg"
              onClick={onClickApply}
            >{t`Apply Now`}</Button>
          </AnimatePresence>
        </div>
        <ScrollArea>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h4 className="font-bold">{t`Description`}</h4>
              <div
                dangerouslySetInnerHTML={{
                  __html: job.description,
                }}
                className="whitespace-pre-wrap rounded text-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-bold">{t`Tech Stack`}</h4>
              <div className="flex gap-2">
                {job._nc_m2m_job_tech_stacks.map((ts) => (
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
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
