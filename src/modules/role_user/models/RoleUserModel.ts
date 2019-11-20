import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_role_user')
export class RoleUserModel {
  /**
   * Role user id primary key
   *
   * @type {number}
   */
  @PrimaryGeneratedColumn({ unsigned: true })
  public readonly role_user_id?: number;

  /**
   * Role user name column
   *
   * @type {string}
   */
  @Column({ type: 'varchar', length: 50 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  public readonly role_user_name!: string;
}
