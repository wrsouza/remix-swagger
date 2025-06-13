import { Prisma } from "@prisma/client";

export interface IUserFindMany {
  where: Prisma.UserWhereInput;
  skip?: number;
  take?: number;
  orderBy?: Prisma.UserOrderByWithRelationInput;
}
