import { HttpClient } from '../services/http-client';
import { Joke, ApiResponse, HttpClientConfig } from '../types/api.types';

export class JokesApi {
    private httpClient: HttpClient;
    public constructor(config: HttpClientConfig = {}) {
        this.httpClient = new HttpClient(config);
    }

    public async getRandomJoke(): Promise<ApiResponse<Joke>> {
        return this.httpClient.get<Joke>('/jokes/random');
    }

    public async getRandomJokes(count: number): Promise<ApiResponse<Joke[] | string>> {
        return this.httpClient.get<Joke[] | string>(`/jokes/random/${count}`);
    }

    public async getTenRandomJokes(): Promise<ApiResponse<Joke[]>> {
        return this.httpClient.get<Joke[]>('/jokes/ten');
    }

    public async getRandomJokeByType(type: string): Promise<ApiResponse<Joke[]>> {
        return this.httpClient.get<Joke[]>(`/jokes/${type}/random`);
    }

    public async getTenJokesByType(type: string): Promise<ApiResponse<Joke[]>> {
        return this.httpClient.get<Joke[]>(`/jokes/${type}/ten`);
    }

    public async getJokeTypes(): Promise<ApiResponse<string[]>> {
        return this.httpClient.get<string[]>('/types');
    }

    public async ping(): Promise<ApiResponse<string>> {
        return this.httpClient.get<string>('/ping');
    }

    public async getJokeById(id: number): Promise<ApiResponse<Joke>> {
        return this.httpClient.get<Joke>(`/jokes/${id}`);
    }
}
