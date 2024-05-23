import { ErrorBoundary } from "@sentry/nextjs";
import { Progress } from "@/components/ui/progress";
import { format } from "d3-format";
import { formatRelative } from "date-fns";
import { BatchJobProgress } from "@/__generated__/graphql";

export function BatchJobProgressBar({
  batchJobProgress,
  pastTenseVerb = "Completed",
}: {
  pastTenseVerb: string;
  batchJobProgress: Pick<
    BatchJobProgress,
    "status" | "total" | "succeeded" | "estimatedFinishTime"
  >;
}) {
  return (
    <ErrorBoundary>
      <Progress
        value={batchJobProgress.succeeded}
        max={batchJobProgress.total}
      />
      <div className="text-meepGray-300 text-sm">
        Completed{" "}
        <span className="text-meepGray-100">
          {format(",")(batchJobProgress.succeeded)}
        </span>{" "}
        of{" "}
        <span className="text-meepGray-100">
          {format(",")(batchJobProgress.total)}
        </span>
        . Estimated done{" "}
        <span className="text-meepGray-100">
          {formatRelative(batchJobProgress.estimatedFinishTime, new Date())}
        </span>
      </div>
    </ErrorBoundary>
  );
}
