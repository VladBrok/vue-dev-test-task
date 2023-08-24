import { z } from "zod";

export const patientSchema = z.object({
  name: z.string().min(1, { message: "Must be 1 or more characters long" }),
  email: z.string().email({ message: "Please specify a valid email" }),
  avatarUrl: z
    .string()
    .url({ message: "Please specify a valid url" })
    .optional(),
  diagnosis: z.string(),
  doctorIds: z.string().array(),
});
