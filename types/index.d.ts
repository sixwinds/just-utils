
export as namespace JustUtils;

export { default as ApiSender } from './apiSender/index';

export { default as SimpleDateFormat } from './simpleDateFormat/index';

declare module JustUtils {
  export const SimpleDateFormat: SimpleDateFormat;

  export const ApiSender: ApiSender;
}
