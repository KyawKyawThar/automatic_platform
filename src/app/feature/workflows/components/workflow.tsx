"use client";

import {
  EmptyView,
  EntityContainer,
  EntityHeader,
  EntityItems,
  EntityList,
  EntityPagination,
  EntitySearch,
  ErrorView,
  LoadingView,
} from "@/components/entity-components";
import {
  useCreateWorkflow,
  useDeleteWorkflow,
  useSuspenseWorkflows,
} from "../hooks/use-workflows";
import { create } from "domain";
import { useUpgradeModel } from "@/hooks/use-upgrade-model";
import { useRouter } from "next/navigation";
import { useWorkFlowParams } from "../hooks/use-workflows-params";
import { useEntitySearch } from "../hooks/use-entitySearch";
import type { Workflows } from "@/generated/prisma";
import { WorkflowIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export const WorkFlowSearch = () => {
  const [params, setParams] = useWorkFlowParams();
  const { searchValue, onSearchChange } = useEntitySearch({
    params,
    setParams,
  });

  return (
    <EntitySearch
      value={searchValue}
      placeHolder="Search workflows"
      onChange={onSearchChange}
    />
  );
};

export const WorkflowLists = () => {
  const workflows = useSuspenseWorkflows();
  return (
    <EntityList
      items={workflows.data.items}
      getKey={(workflows) => workflows.id}
      renderItem={(workflows) => <WorkflowItem data={workflows} />}
      emptyView={<WorkflowEmpty />}
    />
  );
};

export const WorkFlowHeader = ({ disabled }: { disabled?: boolean }) => {
  const createWorkflow = useCreateWorkflow();
  const router = useRouter();
  const { handleError, modal } = useUpgradeModel();
  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onSuccess: (data) => {
        router.push(` /workflows/${data.id}`);
      },
      onError: (err) => {
        handleError(err);
      },
    });
  };
  return (
    <>
      {modal}
      <EntityHeader
        title="Workflows"
        description="Create and managed your workflow"
        onNew={handleCreate}
        newButtonLabel="New Workflow"
        disabled={disabled}
        isCreated={createWorkflow.isPending}
      />
    </>
  );
};

export const WorkflowPagination = () => {
  const workflows = useSuspenseWorkflows();
  const [params, setParams] = useWorkFlowParams();

  return (
    <EntityPagination
      disable={workflows.isFetching}
      totalPage={workflows.data.totalSize}
      page={workflows.data.page}
      onPageChange={(page) => setParams({ ...params, page })}
    />
  );
};

export const WorkflowContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <EntityContainer
      header={<WorkFlowHeader />}
      search={<WorkFlowSearch />}
      pagination={<WorkflowPagination />}>
      {children}
    </EntityContainer>
  );
};

export const WorkflowLoading = () => {
  return <LoadingView message="Loading workflows..." />;
};
export const ErrorLoading = () => {
  return <ErrorView message="Error Loading workflows..." />;
};

export const WorkflowEmpty = () => {
  const createWorkflow = useCreateWorkflow();
  const router = useRouter();
  const { handleError, modal } = useUpgradeModel();

  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onError: (err) => {
        handleError(err);
      },
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`);
      },
    });
  };
  return (
    <>
      {modal}
      <EmptyView
        message="You haven't created any workflow yet.Get started by creating a workflows"
        onNew={handleCreate}
      />
    </>
  );
};

export const WorkflowItem = ({ data }: { data: Workflows }) => {
  const removeWorkflow = useDeleteWorkflow();

  const handleRemove = () => {
    removeWorkflow.mutate({ id: data.id });
  };
  return (
    <EntityItems
      title={data.name}
      href={`/workflows/${data.id}`}
      subtitle={
        <>
          Updated {formatDistanceToNow(data.updatedAt, { addSuffix: true })}
          {""}&bull;Creaded{""}
          {formatDistanceToNow(data.updatedAt, { addSuffix: true })}
        </>
      }
      image={
        <div className="size-8 flex items-center justify-center">
          <WorkflowIcon className="size-5 text-muted-foreground" />
        </div>
      }
      isRemoving={removeWorkflow.isPending}
      onRemove={handleRemove}
    />
  );
};
