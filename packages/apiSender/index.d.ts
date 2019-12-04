interface SendOptions<T> {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: object;
  headers?: object;
  isBizSuccess?: (response: T) => boolean;
}

export interface ApiSenderApi {
  send<T>(url: string, options?: SendOptions<T>): Promise<T>;
}

declare const ApiSender: ApiSenderApi
export default ApiSender;
