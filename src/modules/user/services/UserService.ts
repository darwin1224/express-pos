import { UserModel } from '@/modules/user/models/UserModel';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class UserService {
  /**
   * Constructor
   *
   * @param {Repository<UserModel>}
   * @returns {void}
   */
  public constructor(@InjectRepository(UserModel) private readonly user: Repository<UserModel>) {}

  /**
   * Get all data
   *
   * @returns {Promise<UserModel[]>}
   */
  public getAllUser(): Promise<UserModel[]> {
    return this.user.find();
  }

  /**
   * Insert data
   *
   * @returns {Promise<UserModel>}
   */
  public insertUser(params: UserModel): Promise<UserModel> {
    return this.user.save(params);
  }

  /**
   * Get data by username
   *
   * @param {string}
   * @returns {Promise<UserModel | undefined>}
   */
  public getUserByUsername(username: string): Promise<UserModel | undefined> {
    return this.user
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.role_user_id', 'role_user')
      .where('user.username = :username', { username })
      .getOne();
  }
}
