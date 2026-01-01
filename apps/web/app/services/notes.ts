import type { NoteInput } from "../schemas/note";

const API = import.meta.env.API_URL ?? import.meta.env.VITE_API_URL ?? "http://localhost:3001";

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

export async function list() {
  const response = await api<{ items: NoteDTO[] }>("/notes");
  return response.items;
}

export function get(id: string) {
  return api<NoteDTO>(`/notes/${id}`);
}

export function create(input: NoteInput) {
  return api<NoteDTO>("/notes", { method: "POST", body: JSON.stringify(input) });
}

export function update(id: string, input: NoteInput) {
  return api<NoteDTO>(`/notes/${id}`, { method: "PUT", body: JSON.stringify(input) });
}

export function remove(id: string) {
  return api<{ ok: true }>(`/notes/${id}`, { method: "DELETE" });
}
