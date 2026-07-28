import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";

import { signupSchema } from "../validation/Validation";

import AnimatedBackground from "../components/Layout/AnimatedBackground";
import GlassCard from "../components/ui/GlassCard";
import AuthHeader from "../components/ui/AuthHeader";
import PrimaryButton from "../components/ui/PrimaryButton";
import FormField from "../components/FormField";

type SignupFormData = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormData) => {
    console.log(data);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FFF8EA]">
      <AnimatedBackground />

      <GlassCard>
        <AuthHeader
          title="Create"
          highlight="Account"
          description="Join thousands of food lovers and start your culinary journey."
        />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            label="Email"
            name="email"
            placeholder="Enter your email"
            register={register}
            error={errors.email}
          />

          <FormField
            label="Username"
            name="username"
            placeholder="Choose a username"
            register={register}
            error={errors.username}
          />

          <FormField
            label="Password"
            name="password"
            type="password"
            placeholder="Create a password"
            register={register}
            error={errors.password}
          />

          <FormField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            register={register}
            error={errors.confirmPassword}
          />

          <PrimaryButton type="submit">
            Create Account
          </PrimaryButton>
        </form>

        <p className="mt-8 text-center text-sm text-[#8B5A3C]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#C47A2C] transition hover:text-[#E59B1E]"
          >
            Sign In
          </Link>
        </p>
      </GlassCard>
    </main>
  );
}