export interface ErrorFormat {
  [key: string]: string[] | { _errors: string[] | { _errors: string[] } };
}

export interface ErrorResponse {
  [key: string]: string[];
}
