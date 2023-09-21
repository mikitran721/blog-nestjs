// viet set role.guard ngan gon hon
import { SetMetadata } from "@nestjs/common";

export const Roles=(...roles:string[]) =>SetMetadata('roles',roles)
