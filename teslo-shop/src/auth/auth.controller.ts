import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { Auth, GetUser, RawHeaders } from './decorators';
import { User } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @GetUser(['email', 'fullName']) user: User,
    @RawHeaders() rawHeaders: string[],
  ) {
    console.log(user);
    return {
      rawHeaders,
      ok: true,
      message: 'You are authenticated',
    };
  }

  @Get('private2')
  @RoleProtected(ValidRoles.superUser)
  @UseGuards(AuthGuard(), UserRoleGuard)
  testingPrivateRoute2(
    @GetUser(['email', 'fullName']) user: User,
    @RawHeaders() rawHeaders: string[],
  ) {
    console.log(user);
    return {
      rawHeaders,
      ok: true,
      message: 'You are authenticated',
    };
  }

  @Get('private3')
  @Auth(ValidRoles.superUser)
  testingPrivateRoute3(
    @GetUser(['email', 'fullName']) user: User,
    @RawHeaders() rawHeaders: string[],
  ) {
    console.log(user);
    return {
      rawHeaders,
      ok: true,
      message: 'You are authenticated',
    };
  }
}
