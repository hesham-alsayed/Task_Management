"use client";
import z from "zod";

export const projectMemberSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
});

export type ProjectMemberFormData = z.infer<typeof projectMemberSchema>;
