import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ApiCookieAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserDto, UserWithSecrets } from "@reactive-resume/dto";
import { Response } from "express";

import { AuthService } from "../auth/auth.service";
import { Role } from "../auth/decorators/roles.decorator";
import { Roles } from "../auth/enums/roles.enum";
import { AdminAuthGuard } from "../auth/guards/admin-auth.guard";
import { AdminRefreshGuard } from "../auth/guards/admin-refresh.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { User } from "../user/decorators/user.decorator";
// import { ResumeService } from "../resume/resume.service";
import { AdminService } from "./admin.service";
import { PaginationQueryDto, paginationQueryResumeDto } from "./dtos/pagination.dto";

@ApiTags("Admin")
@Controller("admin")
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }),
)
@ApiCookieAuth()
export class AdminController {
  /**
   * contructor
   */
  constructor(
    /**
     * inject admin service
     */
    private readonly adminService: AdminService,
    private readonly authService: AuthService,
    /**
     * inject resumes service
     */
    // private readonly resumeService: ResumeService,
  ) {}

  /**
   * get all users
   */
  @Get("/users")
  @Role([Roles.ADMIN])
  @UseGuards(AdminAuthGuard, RolesGuard)
  @ApiOperation({
    summary: "get all users",
    description: "Get all users (name email number of cv) param(page pageSize search)",
  })
  async getUsers(@Query() paginationDto: PaginationQueryDto) {
    return this.adminService.getUsers(paginationDto);
  }

  /**
   * get a user
   */
  @Get("/user/:id")
  @Role([Roles.ADMIN])
  @UseGuards(AdminAuthGuard, RolesGuard)
  @ApiOperation({
    summary: "get a user by id",
  })
  async findOneUser(@Param("id") id: string) {
    return this.adminService.getUserDetail(id);
  }

  /**
   * download user
   */
  @Get("/users/download")
  @Role([Roles.ADMIN])
  @UseGuards(AdminAuthGuard, RolesGuard)
  @ApiOperation({
    summary: "download list users",
  })
  async downloadUser(@Res() res: Response) {
    const buffer = await this.adminService.downloadUsers();
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    res.attachment(`list-users${Date.now()}.xlsx`); // name file
    res.end(buffer);
  }

  /**
   * get list cv
   */
  @Get("/resumes")
  @Role([Roles.ADMIN])
  @UseGuards(AdminAuthGuard, RolesGuard)
  @ApiOperation({
    summary: "get list resumes",
  })
  async getListResumes(@Query() paginationDto: paginationQueryResumeDto) {
    return await this.adminService.getListResumes(paginationDto);
  }

  /**
   * get a cv
   */
  @Get(`/resume/:identify`)
  @Role([Roles.ADMIN])
  @UseGuards(AdminAuthGuard, RolesGuard)
  @ApiOperation({
    summary: "get a resume by id or slug",
  })
  async findOneResume(@Param("identify") identify: string) {
    return this.adminService.findOneResume(identify);
  }

  @ApiOperation({
    summary: "API clone from findOneByUsernameSlug(username, slug)  ",
  })
  @Get("/resume/:userName/:slug")
  async adminfindOneByUsernameSlug(
    @Param("username") username: string,
    @Param("slug") slug: string,
  ) {
    return this.adminService.findOneByUsernameSlug(username, slug);
  }

  @Get("me")
  @UseGuards(AdminAuthGuard)
  fetch(@User() user: UserDto) {
    return user;
  }

  @Post("refresh")
  @UseGuards(AdminRefreshGuard)
  async refresh(@User() user: UserWithSecrets, @Res({ passthrough: true }) response: Response) {
    return this.authService.handleAuthenticationResponse(user, response, true, false, true);
  }
}
