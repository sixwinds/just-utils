export interface SimpleDateFormatApi {
  format(data: Date | number, pattern?: string): string;
}

declare const SimpleDateFormat: SimpleDateFormatApi;
export default SimpleDateFormat;
