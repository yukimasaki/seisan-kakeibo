export type ServerActionResult<ResponseData> = {
  ok: boolean | null;
  message: string | null;
  data: ResponseData | null,
};
