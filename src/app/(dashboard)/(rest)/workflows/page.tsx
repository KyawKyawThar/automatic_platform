import { requireAuth } from "@/lib/auth-utils";

const Page = async () => {
  await requireAuth();
  return <p>Work Flows</p>;
};

export default Page;
