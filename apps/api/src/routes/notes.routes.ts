import { Router } from "express";
import * as Notes from "../controllers/notes.controller";

export const notesRouter = Router();
notesRouter.get("/", Notes.list);
notesRouter.get("/:id", Notes.get);
notesRouter.post("/", Notes.create);
notesRouter.put("/:id", Notes.update);
notesRouter.delete("/:id", Notes.remove);
