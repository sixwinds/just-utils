
export as namespace JustUtils;

import ApiSender, { ApiSenderApi } from './apiSender/index';

import SimpleDateFormat, { SimpleDateFormatApi } from './simpleDateFormat/index';

export {
  ApiSender,
  SimpleDateFormat
};

declare module JustUtils {
  export const SimpleDateFormat: SimpleDateFormatApi;

  export const ApiSender: ApiSenderApi;
}
