import {
  ErrorLoading,
  WorkflowContainer,
  WorkflowLists,
  WorkflowLoading,
} from "@/app/feature/workflows/components/workflow";
import { prefetchWorkflows } from "@/app/feature/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";

import { Suspense } from "react";
import type { SearchParams } from "nuqs";
import { workFlowParamsLoader } from "@/app/feature/workflows/server/params-loader";

type Props = {
  searchParams: Promise<SearchParams>;
};

const Page = async ({ searchParams }: Props) => {
  const params = await workFlowParamsLoader(searchParams);
  await requireAuth();

  prefetchWorkflows(params);
  return (
    <WorkflowContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<ErrorLoading />}>
          <Suspense fallback={<WorkflowLoading />}>
            <WorkflowLists />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowContainer>
  );
};

export default Page;
