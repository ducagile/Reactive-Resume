import { CanActivate, ExecutionContext, ForbiddenException,Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserWithSecrets } from "@reactive-resume/dto";
import { Request } from "express";

import { AuthService } from "../auth.service";
import { ROLE_KEY } from "../constants/admin.constant";
import { Roles } from "../enums/roles.enum";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,

    /**
     * inject auth service
     */
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // get require role
    const requiredRoles: Roles[] = this.reflector.getAllAndOverride<Roles[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request: Request = context.switchToHttp().getRequest();

    const user: UserWithSecrets = request.user as UserWithSecrets;

    if (user) {
      return requiredRoles.some((role: Roles) => {
        return user.roles.includes(role);
      });
    }
    // body (identifier , password)
    const body = request.body;

    // check correct require role
    const isValidRole: boolean = await this.authService.hasRole(body.identifier, requiredRoles);

    if (!isValidRole) {
      throw new ForbiddenException();
    }

    return true;
  }
}
