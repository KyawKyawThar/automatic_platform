import { AuthLaout } from "../feature/auth/component/auth-layout";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <AuthLaout>{children}</AuthLaout>;
};
export default Layout;
