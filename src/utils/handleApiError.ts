export function handleApiError(err: unknown): string {
  if (err instanceof Error) {
    // Classic fetch errors
    if (err.message.includes('Failed to fetch')) {
      return 'Network problem. Check your internet connection.';
    }

    // If there is an HTTP status (e.g. from axios or custom fetch)
    const httpMatch = err.message.match(/\b(4\d{2}|5\d{2})\b/);
    if (httpMatch) {
      const status = Number(httpMatch[0]);
      if (status === 404) return 'Resource not found.';
      if (status >= 500) return 'Server temporarily unavailable.';
    }

    return err.message;
  }

  // If it's something you don't understand (like null or a string)
  return 'An unknown error occurred. Please try again later.';
}
