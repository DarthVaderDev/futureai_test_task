import { z } from "zod";

export const enrollmentSchema = z.object({
  comment: z.string().min(1, { message: "Comment cannot be empty" }),
});

export type EnrollmentDTO = z.infer<typeof enrollmentSchema>;
