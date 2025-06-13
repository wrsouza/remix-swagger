export function useCreateUsers() {
  function getParameters() {
    return [
      {
        name: "id",
        in: "query",
        description: "find by Ids (id1,id2,id3...)",
        required: false,
        type: "string",
      },
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
        default: "-createdAt",
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
      },
    ];
  }

  function getSecurity() {
    return [{ Authorization: [] }];
  }

  function getResponses() {
    return {
      "201": {
        description: "User Create",
      },
      "401": {
        description: "Unauthorize",
      },
      "500": {
        description: "",
      },
    };
  }

  function getPath() {
    return {
      "/api/users": {
        post: {
          tags: ["Users"],
          summary: "Create User",
          description: "Api for create users",
          operationId: "createUser",
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
