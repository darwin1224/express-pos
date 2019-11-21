import { IsNotEmpty, IsString, Length, MinLength } from 'class-validator';

export class LoginRequest {
  /**
   * User name column
   *
   * @type {string}
   */
  @IsNotEmpty()
  @IsString()
  @Length(4, 100)
  public readonly username!: string;

  /**
   * Password column
   *
   * @type {string}
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  public readonly password!: string;
}
