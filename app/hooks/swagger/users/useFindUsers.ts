export function useFindUsers() {
  function getParameters() {
    return [getId(), getName(), getEmail(), getPage(), getRows(), getSort()];
  }

  function getId() {
    return {
      name: "id",
      in: "query",
      description: "find by Ids (id1, id2, id3...)",
      required: false,
      type: "string",
    };
  }

  function getName() {
    return {
      name: "name",
      in: "query",
      description: "find by Name",
      required: false,
      type: "string",
    };
  }

  function getEmail() {
    return {
      name: "email",
      in: "query",
      description: "find by Email",
      required: false,
      type: "string",
    };
  }

  function getPage() {
    return {
      name: "page",
      in: "query",
      description: "set page number",
      required: false,
      type: "integer",
      default: 1,
    };
  }

  function getRows() {
    return {
      name: "rows",
      in: "query",
      description: "set number of rows",
      required: false,
      type: "integer",
      default: 20,
    };
  }

  function getSort() {
    return {
      name: "sort",
      in: "query",
      description: "sort users by field",
      required: false,
      schema: {
        type: "string",
        example: "-createdAt",
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
    };
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
      "500": {
        description: "",
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
