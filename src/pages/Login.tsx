import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validation/Validation";
import FormField from "../components/FormField";
import styles from "../styles/form.module.css";


type LoginFormData = {
  email_username: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);     // for now
  };

  return (
    <div className={styles.authContainer}>
    <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)} noValidate>

        <h2>Login</h2>

        <FormField
        label="Email or Username"
        name="email_username"
        placeholder="Enter email or username"
        register={register}
        error={errors.email_username}
        />

        <FormField
        label="Password"
        name="password"
        type="password"
        placeholder="Enter password"
        register={register}
        error={errors.password}
        />

        <button type="submit">Login</button>

    </form>
    </div>
  );
}
