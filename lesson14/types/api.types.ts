export interface Joke {
    id: number;
    type: string;
    setup: string;
    punchline: string;
}

export interface ApiResponse<T> {
    status: number;
    data: T;
    headers: Record<string, string>;
}

export interface ApiError {
    status?: number;
    data?: unknown;
    headers?: Record<string, string>;
    error: string;
    request?: unknown;
}

export interface ApiConfig {
    baseURL: string;
    timeout: number;
    headers: Record<string, string>;
}

export interface HttpClientConfig {
    baseURL?: string;
    timeout?: number;
    headers?: Record<string, string>;
}
export interface JestCustomMatchers<R = unknown> {
    toBeValidJoke(): R;
    toBeValidJokeArray(expectedLength?: number): R;
}

export type JokeType = 'general' | 'programming' | 'dad' | 'knock-knock';
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
