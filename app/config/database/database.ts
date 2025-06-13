import { PrismaClient } from "@prisma/client";

let client: PrismaClient;

export function getConnection(): PrismaClient {
  if (!client) {
    client = new PrismaClient();
  }
  return client;
}
