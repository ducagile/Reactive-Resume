// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyObject = Record<string, any>;

export enum ResumeStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
}

export type ResumeQueueJob = {
  filePath: string;
  resumeId: string;
};
