export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message; // Safely access the message
  }
  return String(error); // Fallback to stringifying the error
}
