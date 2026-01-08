import { LoginForm } from "@/app/feature/auth/component/login-form";
import { requireNoAuth } from "@/lib/auth-utils";

async function Login() {
  await requireNoAuth();
  return (
    <div>
      <LoginForm />
    </div>
  );
}

export default Login;
