export class ApiError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public details?: any,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export class ValidationError extends ApiError {
  constructor(details: any) {
    super("Validation Error", 400, details);
    this.name = "ValidationError";
  }
}
