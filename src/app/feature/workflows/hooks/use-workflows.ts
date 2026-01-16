import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "sonner";

export const useSuspenseWorkflow = () => {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.workflows.findMany.queryOptions());
};

export const useCreateWorkflow = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.workflows.create.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Workflow ${data.name} created successfully`);

        queryClient.invalidateQueries(trpc.workflows.findMany.queryOptions());
      },
      onError: (err) => {
        toast.error(`Failed to create workflow ${err.message}`);
      },
    })
  );
};
