import { BadRequestException } from '@/exceptions/BadRequestException';
import { Bcrypt } from '@/libraries/Bcrypt';
import { Authenticate } from '@/middlewares/Authenticate';
import { UserModel } from '@/modules/user/models/UserModel';
import { UserResource } from '@/modules/user/resources/UserResource';
import { UserService } from '@/modules/user/services/UserService';
import {
  Authorized,
  Body,
  Get,
  JsonController,
  Post,
  UseBefore,
  UseInterceptor,
} from 'routing-controllers';

@JsonController('/user')
@UseBefore(Authenticate)
@Authorized('admin')
export class UserController {
  /**
   * Constructor
   *
   * @param {UserService} user
   * @returns {void}
   */
  public constructor(private readonly user: UserService, private readonly bcrypt: Bcrypt) {}

  /**
   * Get all resource in storage
   *
   * @returns {Promise<UserModel[]>}
   */
  @Get()
  @UseInterceptor(UserResource)
  public async index(): Promise<UserModel[]> {
    try {
      return await this.user.getAllUser();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  /**
   * Insert a single resource into storage
   *
   * @param {UserModel} user
   * @returns {Promise<UserModel>}
   */
  @Post()
  public async store(@Body() user: UserModel): Promise<any> {
    try {
      const hash = this.bcrypt.hash(user.password);
      const params = { ...user, password: hash };
      return await this.user.insertUser(params);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
