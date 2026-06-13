export class AppError extends Error {
  code?: string;
  status?: number;

  constructor(message: string, code?: string, status?: number) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.status = status;

    // مهم للـ Next.js / Node stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}