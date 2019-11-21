import { BadRequestException } from '@/exceptions/BadRequestException';
import { Authenticate } from '@/middlewares/Authenticate';
import { RoleUserModel } from '@/modules/role_user/models/RoleUserModel';
import { RoleUserResource } from '@/modules/role_user/resources/RoleUserResource';
import { RoleUserService } from '@/modules/role_user/services/RoleUserService';
import {
  Authorized,
  Body,
  Get,
  JsonController,
  Post,
  UseBefore,
  UseInterceptor,
} from 'routing-controllers';

@JsonController('/role_user')
@UseBefore(Authenticate)
@Authorized('admin')
export class RoleUserController {
  /**
   * Constructor
   *
   * @param {RoleUserService} roleUser
   * @returns {void}
   */
  public constructor(private readonly roleUser: RoleUserService) {}

  /**
   * Get all resource in storage
   *
   * @returns {Promise<RoleUserModel[]>}
   */
  @Get()
  @UseInterceptor(RoleUserResource)
  public async index(): Promise<RoleUserModel[]> {
    try {
      return await this.roleUser.getAllRoleUser();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  /**
   * Insert a single resource into storage
   *
   * @param {RoleUserModel} roleUser
   * @returns {Promise<RoleUserModel>}
   */
  @Post()
  public async store(@Body() roleUser: RoleUserModel): Promise<RoleUserModel> {
    try {
      return await this.roleUser.insertRoleUser(roleUser);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
