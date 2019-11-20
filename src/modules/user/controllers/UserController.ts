import { BadRequestException } from '@/exceptions/BadRequestException';
import { Bcrypt } from '@/libraries/Bcrypt';
import { Authenticate } from '@/middlewares/Authenticate';
import { UserModel } from '@/modules/user/models/UserModel';
import { UserService } from '@/modules/user/services/UserService';
import { Body, Get, HttpCode, JsonController, Post, UseBefore } from 'routing-controllers';

@JsonController('/user')
@UseBefore(Authenticate)
export class UserController {
  /**
   * Constructor
   *
   * @param {UserService} user
   * @returns {void}
   */
  public constructor(private readonly user: UserService) {}

  /**
   * Get all resource in storage
   *
   * @returns {Promise<UserModel[]>}
   */
  @Get()
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
    const hash = Bcrypt.hash('123456');
    console.log(hash);
    // try {
    //   const hash = Bcrypt.hash('123456');
    //   console.log(hash);
    //   const params = { ...user, password: hash };
    //   return await this.user.insertUser(params);
    // } catch (err) {
    //   throw new BadRequestException(err.message);
    // }
  }
}
