"use client";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";

const PolarPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const customerSessionToken = searchParams.get("customer_session_token");
  const queryClient = useQueryClient();

  useEffect(() => {
    if (customerSessionToken) {
      // Clear all cached queries
      queryClient.clear();
      // Invalidate subscription query specifically
      queryClient.invalidateQueries({ queryKey: ["subscription"] });
      // Optionally refresh the session to get new token
      authClient.getSession().then(() => {
        router.replace("/workflows");
      });
    }
  }, [customerSessionToken, router, queryClient]);

  return <div>loading...</div>;
};

export default PolarPage;
