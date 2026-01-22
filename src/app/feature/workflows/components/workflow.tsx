"use client";

import {
  EntityContainer,
  EntityHeader,
  EntityPagination,
  EntitySearch,
} from "@/components/entity-components";
import { useCreateWorkflow, useSuspenseWorkflow } from "../hooks/use-workflows";
import { create } from "domain";
import { useUpgradeModel } from "@/hooks/use-upgrade-model";
import { useRouter } from "next/navigation";
import { useWorkFlowParams } from "../hooks/use-workflows-params";
import { useEntitySearch } from "../hooks/use-entitySearch";

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
  const workflows = useSuspenseWorkflow();

  if (workflows.isFetching) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <p>Loading......</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex justify-center items-center">
      <p>{JSON.stringify(workflows.data, null, 2)}</p>
    </div>
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
  const workflows = useSuspenseWorkflow();
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
