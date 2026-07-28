import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";

import { loginSchema } from "../validation/Validation";

import AnimatedBackground from "../components/Layout/AnimatedBackground";
import GlassCard from "../components/ui/GlassCard";
import AuthHeader from "../components/ui/AuthHeader";
import PrimaryButton from "../components/ui/PrimaryButton";
import FormField from "../components/FormField";

type LoginFormData = {
  email_username: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FFF8EA]">
      <AnimatedBackground />

      <GlassCard>
        <AuthHeader
          title="Welcome"
          highlight="Back"
          description="Sign in and continue discovering delicious recipes."
        />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            label="Email or Username"
            name="email_username"
            placeholder="Enter your email or username"
            register={register}
            error={errors.email_username}
          />

          <FormField
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            register={register}
            error={errors.password}
          />

          <PrimaryButton type="submit">
            Login
          </PrimaryButton>
        </form>

        <p className="mt-8 text-center text-sm text-[#8B5A3C]">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-[#C47A2C] transition hover:text-[#E59B1E]"
          >
            Create one
          </Link>
        </p>
      </GlassCard>
    </main>
  );
}