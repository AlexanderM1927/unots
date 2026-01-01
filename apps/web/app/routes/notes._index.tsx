import { Form, useLoaderData, redirect } from "react-router";
import { NoteSchema } from "../schemas/note";
import { list, create } from "../services/notes";

export async function loader() {
  const notes = await list();
  return { notes };
}

export async function action({ request }: { request: Request }) {
  const form = await request.formData();
  const raw = {
    title: String(form.get("title") ?? ""),
    content: String(form.get("content") ?? ""),
  };

  const parsed = NoteSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors, values: raw };
  }

  const created = await create(parsed.data);
  return redirect(`/notes/${created.id}`);
}

export default function NotesIndex() {
  const data = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <div>
      <h1>Notas</h1>
      <ul>
        {data.notes.map((n) => (
          <li key={n.id}>
            <a href={`/notes/${n.id}`}>{n.title}</a>
          </li>
        ))}
      </ul>

      <h2>Crear</h2>
      <Form method="post">
        <input name="title" placeholder="Título" />
        <textarea name="content" placeholder="Contenido" />
        <button type="submit">Guardar</button>
      </Form>
    </div>
  );
}
