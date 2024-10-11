/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";

import { TaskResponse } from "../../core/TaskLoaderProgress";

import { HttpClient } from "./httpClient";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export interface IBaseRepository<T, R> {
  get(args?: R): Promise<TaskResponse<T>>;
  getMany(args?: R): Promise<TaskResponse<T[]>>;
  post(args?: R): Promise<TaskResponse<T>>;
  update(args?: R): Promise<TaskResponse<T>>;
  delete(args?: R): Promise<TaskResponse<T>>;
}

const transform = (response: AxiosResponse): Promise<TaskResponse<any>> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return new Promise((resolve, reject) => {
    const result: TaskResponse<any> = {
      data: response.data.data,
      error: response.data.error,
      taskId: response.data.taskId,
    };
    resolve(result);
  });
};

export abstract class BaseRepository<T, R>
  extends HttpClient
  implements IBaseRepository<T, R>
{
  protected endpoint: string | undefined;

  public get = async (args: R): Promise<TaskResponse<T>> => {
    const instance = this.createInstance();
    const result = await instance
      .get(`${BASE_URL}/${this.endpoint}/${args}`)
      .then(transform);
    return result as TaskResponse<T>;
  };

  public getMany = async (): Promise<TaskResponse<T[]>> => {
    const instance = this.createInstance();
    const result = await instance
      .get(`${BASE_URL}/${this.endpoint}`)
      .then(transform);
    return result as TaskResponse<T[]>;
  };

  public post = async (args: R): Promise<TaskResponse<T>> => {
    const instance = this.createInstance();
    const result = await instance
      .post(`${BASE_URL}/${this.endpoint}`, args)
      .then(transform);
    return result as TaskResponse<T>;
  };

  public update = async (args: R): Promise<TaskResponse<T>> => {
    const instance = this.createInstance();
    const result = await instance
      .put(`${BASE_URL}/${this.endpoint}`, args)
      .then(transform);
    return result as TaskResponse<T>;
  };

  public delete = async (args: R): Promise<TaskResponse<T>> => {
    const instance = this.createInstance();
    const result = await instance
      .delete(`${BASE_URL}/${this.endpoint}/${args}`)
      .then(transform);
    return result as TaskResponse<T>;
  };

  setEndpointPath = (endpointPath: string) => {
    this.endpoint = endpointPath;
  };
}
