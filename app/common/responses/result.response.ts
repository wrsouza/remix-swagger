export const Result = (
  data: unknown,
  status: number = 200,
  statusText: string = "Ok"
): Response => {
  let response;
  if (data) {
    response = JSON.stringify(data);
  }
  return new Response(response, {
    status,
    statusText,
    headers: { "Content-Type": "application/json" },
  });
};
