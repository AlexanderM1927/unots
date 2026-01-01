import type { NoteInput } from "~/schemas/note";

const API = process.env.API_URL ?? "http://localhost:3001";

export type NoteDTO = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: { "content-type": "application/json", ...(init?.headers || {}) },
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(msg || `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const NotesClient = {
  list: () => api<NoteDTO[]>("/notes"),
  get: (id: string) => api<NoteDTO>(`/notes/${id}`),
  create: (input: NoteInput) =>
    api<NoteDTO>("/notes", { method: "POST", body: JSON.stringify(input) }),
  update: (id: string, input: NoteInput) =>
    api<NoteDTO>(`/notes/${id}`, { method: "PUT", body: JSON.stringify(input) }),
  remove: (id: string) =>
    api<{ ok: true }>(`/notes/${id}`, { method: "DELETE" }),
};
