/**
 * Base API client with simulated async network delay and typed response handling.
 * Easily swappable with Axios or native fetch when connecting to backend.
 */
export async function apiRequest<T>(
  dataFetcher: () => T | Promise<T>,
  delayMs = 250
): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const result = await dataFetcher();
        resolve(result);
      } catch (error) {
        reject(error instanceof Error ? error : new Error('API Request Failed'));
      }
    }, delayMs);
  });
}
