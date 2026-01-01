import { prisma } from "../db/prisma";

export type NoteInput = { title: string; content: string };

export const noteRepo = {
  list: (opts: { q?: string; page: number; pageSize: number }) => {
    const { q, page, pageSize } = opts;
    const where = q
      ? { OR: [{ title: { contains: q } }, { content: { contains: q } }] }
      : undefined;

    return prisma.note.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  },

  count: (q?: string) => {
    const where = q
      ? { OR: [{ title: { contains: q } }, { content: { contains: q } }] }
      : undefined;
    return prisma.note.count({ where });
  },

  getById: (id: string) => prisma.note.findUnique({ where: { id } }),

  create: (input: NoteInput) => prisma.note.create({ data: input }),

  update: (id: string, input: NoteInput) =>
    prisma.note.update({ where: { id }, data: input }),

  remove: (id: string) => prisma.note.delete({ where: { id } }),
};
