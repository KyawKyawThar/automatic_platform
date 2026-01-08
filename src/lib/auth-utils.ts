import { redirect } from "next/navigation";
import { auth } from "./auth";
import { headers } from "next/headers";

const getSession = async () => {
  return auth.api.getSession({
    headers: await headers(),
  });
};
export const requireAuth = async () => {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return session;
};

export const requireNoAuth = async () => {
  const session = await getSession();
  if (session) {
    redirect("/");
  }
  return session;
};
