import { z } from "zod";

export const dealSchema = z.object({
  description: z.string().min(5, "Description must be at least 5 characters long"),
  merchantEnrollmentDetails: z.string().min(5, "Enrollment details must be at least 5 characters long"),
  status: z.enum(["active", "discontinued"]),
});
