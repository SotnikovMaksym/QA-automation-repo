import axios, { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { HttpClientConfig, ApiResponse, ApiError } from '../types/api.types';
import apiConfig from '../config/api.config';

export class HttpClient {
    private client: AxiosInstance;

    public constructor(config: HttpClientConfig = {}) {
        this.client = axios.create({
            baseURL: config.baseURL || apiConfig.baseURL,
            timeout: config.timeout || apiConfig.timeout,
            headers: { ...apiConfig.headers, ...config.headers }
        });

        this.setupInterceptors();
    }

    private setupInterceptors(): void {
        this.client.interceptors.request.use(
            (config) => {
                console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
                return config;
            },
            (error: AxiosError) => {
                console.error('Request error:', error);
                return Promise.reject(error);
            }
        );

        this.client.interceptors.response.use(
            (response: AxiosResponse) => {
                console.log(`Response status: ${response.status}`);
                return response;
            },
            (error: AxiosError) => {
                console.error('Response error:', error.response?.status, error.response?.data);
                return Promise.reject(error);
            }
        );
    }

    public async get<T = unknown>(url: string, config: AxiosRequestConfig = {}): Promise<ApiResponse<T>> {
        const response = await this.client.get<T>(url, config);
        return this.formatResponse(response);
    }

    public async post<T = unknown>(url: string, data: unknown = {}, config: AxiosRequestConfig = {}): Promise<ApiResponse<T>> {
        const response = await this.client.post<T>(url, data, config);
        return this.formatResponse(response);
    }

    public async put<T = unknown>(url: string, data: unknown = {}, config: AxiosRequestConfig = {}): Promise<ApiResponse<T>> {
        const response = await this.client.put<T>(url, data, config);
        return this.formatResponse(response);
    }

    public async delete<T = unknown>(url: string, config: AxiosRequestConfig = {}): Promise<ApiResponse<T>> {
        const response = await this.client.delete<T>(url, config);
        return this.formatResponse(response);
    }

    private formatResponse<T>(response: AxiosResponse<T>): ApiResponse<T> {
        return {
            status: response.status,
            data: response.data,
            headers: response.headers as Record<string, string>
        };
    }

    private handleError(error: AxiosError): ApiError {
        if (error.response) {
            return {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers as Record<string, string>,
                error: error.message
            };
        } else if (error.request) {
            return {
                error: 'No response received from server',
                request: error.request
            };
        } else {
            return {
                error: error.message
            };
        }
    }
}
