import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email_username:yup
    .string()
    .required("Email or username is required")
    .test(
        "email-or-username",
        "Enter a valid email or usernam",
        (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
            
            return emailRegex.test(value) || usernameRegex.test(value);
        }
    ),

  password:yup
    .string()
    .required("Password is required")
    .min(8, "Password should be at least 8 characters")
    .max(20, "Password should be at most 20 characters")
    
});

