import { BadRequestException } from '@/exceptions/BadRequestException';
import { UserModel } from '@/modules/user/models/UserModel';
import { UserService } from '@/modules/user/services/UserService';
import { Body, JsonController, Post } from 'routing-controllers';
import { JWT } from '@/libraries/JWT';
import { classToPlain } from 'class-transformer';

@JsonController('/auth')
export class AuthController {
  /**
   * Constructor
   *
   * @param {UserService} supplier
   * @returns {void}
   */
  public constructor(private readonly user: UserService) {}

  /**
   * Insert a single resource into storage
   *
   * @param {UserModel} params
   * @returns {Promise<any>}
   */
  @Post('/login')
  public async store(@Body() params: UserModel): Promise<any> {
    try {
      const data = await this.user.getUserByUsername(params.username);
      const token = JWT.sign(classToPlain(data));
      return { token };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
