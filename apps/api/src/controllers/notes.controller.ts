import { NoteSchema } from "../schemas/note.schema";
import { AppError } from "../errors/AppError";
import { noteRepo } from "../repositories/note.repo";

export async function list(req: any, res: any) {
  const page = Math.max(1, Number(req.query.page ?? 1));
  const pageSize = Math.min(50, Math.max(1, Number(req.query.pageSize ?? 10)));
  const q = typeof req.query.q === "string" ? req.query.q : undefined;

  const [items, total] = await Promise.all([
    noteRepo.list({ q, page, pageSize }),
    noteRepo.count(q),
  ]);

  res.json({ items, page, pageSize, total });
}

export async function get(req: any, res: any) {
  const note = await noteRepo.getById(req.params.id);
  res.json(note);
}

export async function create(req: any, res: any) {
  const parsed = NoteSchema.safeParse(req.body);
  if (!parsed.success) throw new AppError(400, "Invalid input", "VALIDATION", parsed.error.flatten());

  const created = await noteRepo.create(parsed.data);
  res.status(201).json(created);
}

export async function update(req: any, res: any) {
  const parsed = NoteSchema.safeParse(req.body);
  if (!parsed.success) throw new AppError(400, "Invalid input", "VALIDATION", parsed.error.flatten());

  const updated = await noteRepo.update(req.params.id, parsed.data);
  res.json(updated);
}

export async function remove(req: any, res: any) {
  await noteRepo.remove(req.params.id);
  res.json({ ok: true });
}
