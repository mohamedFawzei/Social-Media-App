import { z } from "zod";

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must be at most 20 characters"),

    email: z.string().email("Example: user1234@gmail.com"),

    password: z
      .string()
      .min(8, "Example: Abc@1234")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Example: Abc@1234",
      ),

    rePassword: z.string().min(8, "Confirm password is required"),

    dateOfBirth: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid Date Format")
      .refine(
        (date) => {
          const userDate = new Date(date);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return userDate < today;
        },
        {
          message: "Date of birth must be in the past",
        },
      ),

    gender: z.enum(["male", "female"], {
      message: "Gender must be either Male or Female",
    }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });
