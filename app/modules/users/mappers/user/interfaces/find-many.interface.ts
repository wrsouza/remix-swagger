import { Prisma } from "generated/prisma";

export interface IUserFindMany {
  where: Prisma.UserWhereInput;
  skip?: number;
  take?: number;
  orderBy?: Prisma.UserOrderByWithRelationInput;
}
