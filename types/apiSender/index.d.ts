interface SendOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: object;
  headers?: object;
  isBizSuccess?: (response: object | null) => boolean;
}

export interface ApiSenderApi {
  send(url: string, options?: SendOptions): Promise<object | null>;
}

declare const ApiSender: ApiSenderApi
export default ApiSender;
