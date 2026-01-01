import { z } from "zod";

export const NoteSchema = z.object({
  title: z.string().min(1, "Título requerido").max(80),
  content: z.string().min(1, "Contenido requerido").max(5000),
});

export type NoteInput = z.infer<typeof NoteSchema>;
