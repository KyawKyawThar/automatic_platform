import { requireAuth } from "@/lib/auth-utils";

interface PageProps {
  params: Promise<{
    credentionalId: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  await requireAuth();
  const { credentionalId } = await params;
  return <p>Credentional id: {credentionalId}</p>;
};

export default Page;
