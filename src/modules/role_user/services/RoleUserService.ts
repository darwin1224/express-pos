import { RoleUserModel } from '@/modules/role_user/models/RoleUserModel';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class RoleUserService {
  /**
   * Constructor
   *
   * @param {Repository<RoleUserModel>}
   * @returns {void}
   */
  public constructor(
    @InjectRepository(RoleUserModel) private readonly roleUser: Repository<RoleUserModel>,
  ) {}

  /**
   * Get all data
   *
   * @returns {Promise<RoleUserModel[]>}
   */
  public getAllRoleUser(): Promise<RoleUserModel[]> {
    return this.roleUser.find();
  }

  /**
   * Insert data
   *
   * @returns {Promise<RoleUserModel>}
   */
  public insertRoleUser(params: RoleUserModel): Promise<RoleUserModel> {
    return this.roleUser.save(params);
  }
}
