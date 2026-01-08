import { RegisterForm } from "@/app/feature/auth/component/register-form";
import { requireNoAuth } from "@/lib/auth-utils";

async function Register() {
  await requireNoAuth();
  return (
    <div>
      <RegisterForm />
    </div>
  );
}

export default Register;
