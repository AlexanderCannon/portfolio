/**
 * Utility function to add timeout protection to async operations
 */
export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs = 5000,
  fallback?: T
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const result = await promise;
    clearTimeout(timeoutId);
    return result;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error && error.name === 'AbortError') {
      console.error(`Operation timed out after ${timeoutMs}ms`);
      if (fallback !== undefined) {
        return fallback;
      }
      throw new Error(`Operation timed out after ${timeoutMs}ms`);
    }
    
    throw error;
  }
}

/**
 * Wrapper for database queries with timeout and caching
 */
export async function withCaching<T>(
  queryFn: () => Promise<T>,
  options: {
    timeoutMs?: number;
    fallback?: T;
    cacheKey?: string;
  } = {}
): Promise<T> {
  const { timeoutMs = 5000, fallback, cacheKey } = options;
  
  try {
    return await withTimeout(queryFn(), timeoutMs, fallback);
  } catch (error) {
    console.error(`Database query failed${cacheKey ? ` for ${cacheKey}` : ''}:`, error);
    if (fallback !== undefined) {
      return fallback;
    }
    throw error;
  }
}
