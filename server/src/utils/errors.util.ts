export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (error == null) {
    return "Unknown error";
  }
  return String(error);
}
