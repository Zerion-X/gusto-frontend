import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

import { loginSchema } from "../validation/Validation";
import FormField from "../components/FormField";

import { loginUser } from "../utils/userStorage";

type LoginFormData = {
  email_username: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const navigate = useNavigate();

  const onSubmit = (data: LoginFormData) => {
    const user = loginUser(data.email_username, data.password);

    if (!user) {
      setError("email_username", {
        type: "manual",
        message: "Invalid username/email or password.",
      });
      return;
    }
    navigate("/home");
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FFF8EA] px-6">
      {/* Background Glow */}
      <motion.div
        animate={{
          x: [0, 60, -20, 0],
          y: [0, -40, 30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#C47A2C]/10 blur-[140px]"
      />

      <motion.div
        animate={{
          x: [0, -70, 30, 0],
          y: [0, 50, -20, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-32 bottom-10 h-[34rem] w-[34rem] rounded-full bg-[#8B5A3C]/10 blur-[170px]"
      />

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E59B1E]/5 blur-[120px]"
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md rounded-[32px] border border-white/40 bg-white/30 p-10 shadow-2xl backdrop-blur-xl"
      >
        <div className="mb-8 text-center">
          <span className="text-sm uppercase tracking-[0.6em] text-[#8B5A3C]">
            GUSTO
          </span>

          <h1
            className="mt-3 text-5xl tracking-tight text-[#3A2419]"
            style={{
              fontFamily: "Cormorant Garamond, serif",
            }}
          >
            Welcome <span className="text-[#C47A2C]">Back</span>
          </h1>

          <p className="mt-3 text-sm text-[#8B5A3C]">
            Sign in and continue discovering delicious recipes.
          </p>
        </div>

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

          <motion.button
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="
              group
              relative
              mt-4
              w-full
              overflow-hidden
              rounded-full
              border
              border-white/30
              bg-white/10
              py-4
              font-medium
              text-[#FFF8EA]
              backdrop-blur-xl
              transition-all
              duration-500
              hover:shadow-[0_0_45px_rgba(229,155,30,0.45)]
            "
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#8B5A3C] to-[#9A5B2E]" />

            <div className="absolute -left-full top-0 h-full w-full bg-white/20 transition-all duration-700 group-hover:left-full" />

            <span className="relative z-10">Sign In</span>
          </motion.button>
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
      </motion.div>
    </main>
  );
}
