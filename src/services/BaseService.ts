import axios, { AxiosInstance, AxiosResponse } from "axios";

export class BaseService<T> {
  protected readonly apiContext: AxiosInstance;
  protected readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.apiContext = axios.create({
      baseURL: "/api",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer ",
      },
    });
  }

  /**
   * get
   */
  public async get(id: number): Promise<T> {
    const response: AxiosResponse<T> = await this.apiContext.get(
      `${this.baseUrl}/${id}`,
    );
    return response.data;
  }

  /**
   * getAll
   */
  public async getAll(): Promise<T[]> {
    const response: AxiosResponse<T[]> = await this.apiContext.get(
      `${this.baseUrl}`,
    );
    return response.data;
  }

  /**
   * delete
   */
  public async delete(id: number): Promise<T> {
    const response: AxiosResponse<T> = await this.apiContext.delete(
      `${this.baseUrl}/${id}`,
    );
    return response.data;
  }
}
