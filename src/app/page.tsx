"use client";

import { caller, getQueryClient, trpc } from "@/trpc/server";

import {
  dehydrate,
  HydrationBoundary,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/auth-utils";
import { LogoutButton } from "./logout";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";

const Home = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data } = useQuery(trpc.getWorkflows.queryOptions());

  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        toast.success("jobed queued");
      },
    })
  );
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
      Welcome from protected page
      <div>{JSON.stringify(data)}</div>
      <Button disabled={create.isPending} onClick={() => create.mutate()}>
        Create Workflow
      </Button>
      <LogoutButton />
    </div>
  );
};

export default Home;
