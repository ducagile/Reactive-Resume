import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import type { Request } from "express";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";

import { Config } from "@/server/config/schema";

import { AuthService } from "../auth.service";
import { Payload } from "../utils/payload";

@Injectable()
export class AdminRefreshStrategy extends PassportStrategy(Strategy, "admin-refresh") {
  constructor(
    private readonly configService: ConfigService<Config>,
    private readonly authService: AuthService,
  ) {
    const extractors = [(request: Request) => request.cookies["Admin-Refresh"]];

    super({
      secretOrKey: configService.getOrThrow<string>("REFRESH_TOKEN_SECRET"),
      jwtFromRequest: ExtractJwt.fromExtractors(extractors),
      passReqToCallback: true,
      ignoreExpiration: false,
    } as StrategyOptions);
  }

  async validate(request: Request, payload: Payload) {
    const refreshToken = request.cookies["Admin-Refresh"];

    return this.authService.validateRefreshToken(payload, refreshToken);
  }
}
