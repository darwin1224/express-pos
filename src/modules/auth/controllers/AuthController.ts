import { UnauthorizedException } from '@/exceptions/UnauthorizedException';
import { Bcrypt } from '@/libraries/Bcrypt';
import { JWT } from '@/libraries/JWT';
import { Authenticate } from '@/middlewares/Authenticate';
import { LoginRequest } from '@/modules/auth/requests/LoginRequest';
import { UserService } from '@/modules/user/services/UserService';
import { classToPlain } from 'class-transformer';
import { Body, Get, JsonController, Param, Post, UseBefore } from 'routing-controllers';

@JsonController('/auth')
export class AuthController {
  /**
   * Constructor
   *
   * @param {UserService} supplier
   * @param {Bcrypt} bcrypt
   * @param {JWT} jwt
   * @returns {void}
   */
  public constructor(
    private readonly user: UserService,
    private readonly bcrypt: Bcrypt,
    private readonly jwt: JWT,
  ) {}

  /**
   * Insert a single resource into storage
   *
   * @param {LoginRequest} user
   * @returns {Promise<{ token: string }>}
   */
  @Post('/login')
  public async login(@Body() user: LoginRequest): Promise<{ token: string }> {
    try {
      const data = await this.user.getUserByUsername(user.username);
      if (!data || !this.bcrypt.compare(user.password, data.password)) {
        throw new UnauthorizedException('Authorization failed');
      }
      const token = this.jwt.sign(classToPlain(data));
      return { token };
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }

  /**
   * Get credentials from token
   *
   * @param {string} token
   * @returns {Promise<any>}
   */
  @Get('/credentials/:token')
  @UseBefore(Authenticate)
  public async credentials(@Param('token') token: string): Promise<any> {
    try {
      const { payload } = this.jwt.decode(token);
      return payload;
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }
}
