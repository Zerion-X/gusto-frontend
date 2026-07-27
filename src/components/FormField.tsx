import { type IFormField } from "../core/interfaces/IFormField";
import styles from "../styles/form.module.css";

export default function FormField({
  label,
  name,
  type = "text",
  placeholder,
  register,
  error,
}: IFormField) {
  return (
    <div className={styles.formField}>
      <label htmlFor={name}>{label}:</label>

      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
      />

      {error && <p className={styles.error}>{error.message}</p>}
    </div>
  );
}
