interface SendOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: object;
  headers?: object;
  isBizSuccess?: (response: object | null) => boolean;
}

export default {
  send(url: string, options?: SendOptions): Promise<object | null>;
}
