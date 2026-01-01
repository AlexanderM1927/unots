import { AppError } from "../errors/AppError";

export function errorHandler(err: any, _req: any, res: any, _next: any) {
  if (err instanceof AppError) {
    return res.status(err.status).json({
      error: { message: err.message, code: err.code, details: err.details },
    });
  }
  // Prisma errors puedes mapearlos aquí si quieres
  return res.status(500).json({ error: { message: "Internal Server Error" } });
}
