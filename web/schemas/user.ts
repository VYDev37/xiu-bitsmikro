import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  birthDate: z.string().nullable().optional(), // YYYY-MM-DD
  birthTime: z.string().nullable().optional(), // HH:MM
});

export type User = z.infer<typeof UserSchema>;

export const LoginSchema = z.object({
  username: z.string().min(3, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof LoginSchema>;

export const RegisterSchema = LoginSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  birthDate: z.string().optional().refine(val => !val || new Date(val) <= new Date(), "Date cannot be in the future"),
  birthTime: z.string().optional().refine(val => !val || /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(val), "Invalid time format"),
});

export type RegisterFormData = z.infer<typeof RegisterSchema>;

export const ProfileUpdateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  birthDate: z.string().optional().refine(val => !val || new Date(val) <= new Date(), "Date cannot be in the future"),
  birthTime: z.string().optional().refine(val => !val || /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(val), "Invalid time format"),
});

export type ProfileUpdateFormData = z.infer<typeof ProfileUpdateSchema>;
