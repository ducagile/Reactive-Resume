/* eslint-disable lingui/no-unlocalized-strings */
import { sortByDate } from "@reactive-resume/utils";
import { AnimatePresence, motion } from "framer-motion";

import { useJobs } from "@/client/services/job/job";

import { BaseCard } from "./_components/card";
import JobCard from "./_components/job-card";

export const GridView = () => {
  const { jobs, loading } = useJobs();

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {loading && (
        <>
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
            <BaseCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.1 } }}
          >
            <BaseCard />
          </motion.div>
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="duration-300 animate-in fade-in"
              style={{ animationFillMode: "backwards", animationDelay: `${i * 300}ms` }}
            >
              <BaseCard />
            </div>
          ))}
        </>
      )}

      {jobs && (
        <AnimatePresence>
          {jobs
            .sort((a, b) => sortByDate(a, b, "UpdatedAt"))
            .map((job, index) => (
              <motion.div
                key={job.Id}
                layout
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0, transition: { delay: (index + 2) * 0.1 } }}
                exit={{ opacity: 0, filter: "blur(8px)", transition: { duration: 0.5 } }}
              >
                <JobCard job={job} />
              </motion.div>
            ))}
        </AnimatePresence>
      )}
    </div>
  );
};
