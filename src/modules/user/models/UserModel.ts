import { IsNotEmpty, IsString, Length, IsNumber, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { RoleUserModel } from '@/modules/role_user/models/RoleUserModel';

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
  @IsNotEmpty()
  @IsString()
  @Length(4, 50)
  public readonly user_name!: string;

  /**
   * User name column
   *
   * @type {string}
   */
  @Column({ type: 'varchar', length: 100 })
  @IsNotEmpty()
  @IsString()
  @Length(4, 100)
  public readonly username!: string;

  /**
   * Password column
   *
   * @type {string}
   */
  @Column({ type: 'text' })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  public readonly password!: string;

  /**
   * ID role user
   *
   * @type {number}
   */
  @ManyToOne(type => RoleUserModel, { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_user_id' })
  @IsNumber()
  public readonly role_user_id?: number;
}
