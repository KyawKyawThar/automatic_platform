import Image from "next/image";
import Link from "next/link";

export const AuthLaout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-muted flex min-h-svh flex-col justify-center items-center gap-6 p-6 md:p-10">
      <div className="flex w-full flex-col gap-6 max-w-sm">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium">
          <Image src="/logo.svg" alt="HL" width={30} height={30} />
          HighestLeveL
        </Link>

        {children}
      </div>
    </div>
  );
};
