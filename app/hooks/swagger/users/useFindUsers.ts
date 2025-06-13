export function useFindUsers() {
  function getParameters() {
    return [
      {
        name: "name",
        in: "query",
        description: "find by Name",
        required: false,
        type: "string",
      },
      {
        name: "email",
        in: "query",
        description: "find by Email",
        required: false,
        type: "string",
      },
      {
        name: "page",
        in: "query",
        description: "set page number",
        required: false,
        type: "number",
        default: 1,
      },
      {
        name: "rows",
        in: "query",
        description: "set number of rows",
        required: false,
        type: "number",
        default: 20,
      },
      {
        name: "sort",
        in: "query",
        description: "sort users by field",
        required: false,
        type: "string",
        enum: [
          "id",
          "-id",
          "name",
          "-name",
          "email",
          "-email",
          "createdAt",
          "-createdAt",
        ],
        default: "-createdAt",
      },
    ];
  }

  function getSecurity() {
    return [{ Authorization: [] }];
  }

  function getResponses() {
    return {
      "200": {
        description: "successful operation",
      },
      "401": {
        description: "Unauthorize",
      },
    };
  }

  function getPath() {
    return {
      "/api/users": {
        get: {
          tags: ["Users"],
          summary: "Find Users",
          description: "Api for search users",
          operationId: "findUsers",
          produces: ["application/json"],
          security: getSecurity(),
          parameters: getParameters(),
          responses: getResponses(),
        },
      },
    };
  }

  return {
    getPath,
  };
}
