import { z } from "zod";

export const NoteSchema = z.object({
  title: z.string().min(1).max(80),
  content: z.string().min(1).max(5000),
});

export type NoteInput = z.infer<typeof NoteSchema>;
