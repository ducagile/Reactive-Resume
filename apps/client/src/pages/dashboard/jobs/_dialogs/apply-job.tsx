/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  MultipleSelector,
  Textarea,
} from "@reactive-resume/ui";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useToast } from "@/client/hooks/use-toast";
import { IJobApply, useInitJobApply, useLinkJobApply } from "@/client/services/job";
import { useResumes } from "@/client/services/resume";
import { useDialog } from "@/client/stores/dialog";

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

const formSchema = z.object({
  resumeIds: z.array(optionSchema).min(1),
  coverLetter: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export const ApplyJobDialog = () => {
  const { isOpen, close, payload } = useDialog<IJobApply>("apply-job");

  // Only fetch resumes when dialog is open and payload exists
  const { resumes: userResumes } = useResumes(isOpen && Boolean(payload));
  const { initJobApply } = useInitJobApply();
  const { linkJobApply } = useLinkJobApply();

  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resumeIds: [],
      coverLetter: "",
    },
  });

  useEffect(() => {
    if (isOpen) onReset();
  }, [isOpen]);

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onReset = () => {
    form.reset();
  };

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!payload) return null;

  const onSubmit = async (values: FormValues) => {
    try {
      const { Id: jobApplydId } = await initJobApply({
        cv_ids: values.resumeIds.map((id) => id.value).toString(),
        introduce: values.coverLetter,
        user_id: payload.item?.userId as string,
      });

      await linkJobApply({
        jobId: payload.item?.job?.Id as unknown as string,
        jobApplyId: jobApplydId,
      });

      toast({
        variant: "success",
        title: t`Application submitted successfully!`,
      });

      close();
    } catch (error: unknown) {
      toast({
        variant: "error",
        title: t`Oops, the server returned an error.`,
        description: error instanceof Error ? error.message : undefined,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="sm:max-w-[725px] z-[60]">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center space-x-2.5">
              <h2 className="text-xl font-bold">{payload.item?.job?.title}</h2>
            </div>
          </DialogTitle>
          {/* <DialogDescription>{payload.item?.job?.job_code}</DialogDescription> */}
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <FormField
              name="resumeIds"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t`Select Resumes`}</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      {...field}
                      defaultOptions={
                        userResumes?.map((resume) => ({
                          label: resume.title,
                          value: resume.id,
                        })) ?? []
                      }
                      placeholder={t`Select resumes`}
                      className="z-10"
                      emptyIndicator={
                        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                          {t`No resumes found`}
                        </p>
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="coverLetter"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t`Cover Letter`}</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={t`Write your cover letter here...`}
                      className="min-h-[200px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <AnimatePresence presenceAffectsLayout>
                <Button type="button" variant="secondary" className="rounded-md" onClick={close}>
                  {t`Cancel`}
                </Button>
                <Button
                  type="submit"
                  className="rounded-md"
                  disabled={isSubmitting}
                >{t`Submit`}</Button>
              </AnimatePresence>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
