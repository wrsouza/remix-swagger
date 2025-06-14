export const Result = (
  data: unknown,
  status: number = 200,
  statusText: string = "Ok"
): Response => {
  return new Response(JSON.stringify(data), {
    status,
    statusText,
    headers: { "Content-Type": "application/json" },
  });
};
