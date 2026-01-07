'use-';

import { caller, getQueryClient, trpc } from '@/trpc/server';
import { Client } from './client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

async function Home() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.getUser.queryOptions());

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Client />
      </HydrationBoundary>
    </div>
  );
}

export default Home;
