import { z } from "zod";

export const signinSchema = z.object({
  email: z.email("Enter Your Email"),
  password: z
    .string()
    .min(8, "Enter Your Password")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Wrong Password"
    ),
});
