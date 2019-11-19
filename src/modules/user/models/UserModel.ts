import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_user')
export class UserModel {
  /**
   * User id primary key
   *
   * @type {number}
   */
  @PrimaryGeneratedColumn({ unsigned: true })
  public readonly user_id?: number;

  /**
   * User name column
   *
   * @type {string}
   */
  @Column({ type: 'varchar', length: 50 })
  public readonly user_name!: string;

  /**
   * User name column
   *
   * @type {string}
   */
  @Column({ type: 'varchar', length: 100 })
  public readonly username!: string;

  /**
   * Password column
   *
   * @type {string}
   */
  @Column({ type: 'text' })
  public readonly password!: string;
}
