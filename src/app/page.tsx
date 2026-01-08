import { caller, getQueryClient, trpc } from "@/trpc/server";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/auth-utils";
import { LogoutButton } from "./logout";

const Home = async () => {
  await requireAuth();

  const data = await caller.getUser();

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
      Welcome from protected page
      <div>{JSON.stringify(data)}</div>
      <LogoutButton />
    </div>
  );
};

export default Home;
