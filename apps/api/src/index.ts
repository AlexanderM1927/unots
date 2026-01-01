import express from "express";
import cors from "cors";
import { notesRouter } from "./routes/notes.routes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/notes", notesRouter);

app.use(errorHandler);

app.listen(3001, () => console.log("API http://localhost:3001"));
