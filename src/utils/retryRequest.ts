import { AxiosResponse } from 'axios';

export async function retryRequest<T = any>(
  requestFn: () => Promise<AxiosResponse<T>>,
  maxRetries = 3,
): Promise<AxiosResponse<T>> {
  let lastError: any;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await requestFn();
    } catch (error) {
      if (attempt < maxRetries) {
        console.warn(
          `Request failed (attempt ${attempt}/${maxRetries}): ${error instanceof Error ? error.message : ''}`,
        );
      } else {
        console.error(
          `All ${maxRetries} retry attempts failed: ${error instanceof Error ? error.message : ''}`,
        );
      }
    }
  }

  throw lastError;
}
