'use client';

import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';

export function Client() {
  const trpc = useTRPC();
  const { data: users } = useSuspenseQuery(trpc.getUser.queryOptions());
  return <div>Client Component:{JSON.stringify(users)}</div>;
}
