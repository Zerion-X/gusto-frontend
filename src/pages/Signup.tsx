import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../validation/Validation";
import FormField from "../components/FormField";
import styles from "../styles/form.module.css";


type SignupFormData = {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
};

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(signupSchema),
    });

  const onSubmit = (data: SignupFormData) => {
    console.log(data);     // for now
  };

  return (
    <div className={styles.authContainer}>
    <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)} noValidate>

        <h2>Signup</h2>

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

        <button type="submit">Login</button>

    </form>
    </div>
  );
}
