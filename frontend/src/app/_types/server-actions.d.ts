export type ServerActionResult<ResponseData> = {
  isSubmitted: boolean;
  ok: boolean;
  message: string | null;
  data: ResponseData | null;
};
