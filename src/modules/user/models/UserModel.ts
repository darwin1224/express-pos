import { IsNotEmpty, IsString, Length } from 'class-validator';
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
  @Length(4)
  public readonly password!: string;
}
