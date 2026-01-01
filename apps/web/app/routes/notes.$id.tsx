import { Form, useLoaderData, redirect } from "react-router";
import { NoteSchema } from "~/schemas/note";
import { NotesClient } from "~/services/notes.client";

export async function loader({ params }: { params: any }) {
  const note = await NotesClient.get(params.id);
  return { note };
}

export async function action({ request, params }: { request: Request; params: any }) {
  const form = await request.formData();
  const intent = String(form.get("intent") ?? "update");

  if (intent === "delete") {
    await NotesClient.remove(params.id);
    return redirect("/notes");
  }

  const raw = {
    title: String(form.get("title") ?? ""),
    content: String(form.get("content") ?? ""),
  };
  const parsed = NoteSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors, values: raw };
  }

  await NotesClient.update(params.id, parsed.data);
  return redirect(`/notes/${params.id}`);
}

export default function NoteDetail() {
  const { note } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <div>
      <h1>Editar</h1>

      <Form method="post">
        <input name="title" defaultValue={note.title} />
        <textarea name="content" defaultValue={note.content} />
        <button type="submit" name="intent" value="update">Actualizar</button>
        <button type="submit" name="intent" value="delete">Eliminar</button>
      </Form>
    </div>
  );
}
