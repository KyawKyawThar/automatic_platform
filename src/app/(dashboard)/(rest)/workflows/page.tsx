import {
  WorkflowContainer,
  WorkflowLists,
} from "@/app/feature/workflows/components/workflow";
import { prefetchWorkflows } from "@/app/feature/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";

import { Suspense } from "react";

const Page = async () => {
  await requireAuth();

  prefetchWorkflows();
  return (
    <WorkflowContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<p>Error!</p>}>
          <Suspense fallback={<p>Loading......</p>}>
            <WorkflowLists />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowContainer>
  );
};

export default Page;
