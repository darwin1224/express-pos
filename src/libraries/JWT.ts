import { UnauthorizedException } from '@/exceptions/UnauthorizedException';
import { UserModel } from '@/modules/user/models/UserModel';
import { Credentials } from '@typings/jwt';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';

export class JWT {
  /**
   * Private key file
   *
   * @type {string}
   */
  private privateKeyFile: string = path.join(__dirname, '..', 'storage', 'id_rsa');

  /**
   * Public key file
   *
   * @type {string}
   */
  private publicKeyFile: string = path.join(__dirname, '..', 'storage', 'id_rsa.pub');

  /**
   * Hash algorithm
   *
   * @type {string}
   */
  private get algorithm(): string {
    return process.env.HASH_ALGORITHM as string;
  }

  /**
   * Expire time
   *
   * @type {string}
   */
  private get expiresIn(): string {
    return process.env.EXPIRE_TIME as string;
  }

  /**
   * Private key
   *
   * @returns {string}
   */
  private get privateKey(): string {
    return fs.readFileSync(this.privateKeyFile, 'utf8');
  }

  /**
   * Public key
   *
   * @returns {string}
   */
  public get publicKey(): string {
    return fs.readFileSync(this.publicKeyFile, 'utf8');
  }

  /**
   * Jwt sign
   *
   * @param {T} payload
   * @returns {string}
   */
  public sign<T extends string | Record<string, any>>(payload: T): string {
    return jwt.sign(payload, this.privateKey, {
      algorithm: this.algorithm,
      expiresIn: this.expiresIn,
    });
  }

  /**
   * Jwt verify
   *
   * @param {string} token
   * @returns {object | string}
   */
  public verify(token: string): object | string {
    return jwt.verify(token, this.publicKey, { algorithms: [this.algorithm] });
  }

  /**
   * Jwt decode
   *
   * @param {string} token
   * @returns {Credentials<UserModel>}
   */
  public decode(token: string): Credentials<UserModel> {
    const credentials = jwt.decode(token, { complete: true }) as Credentials<UserModel>;
    if (!credentials) {
      throw new UnauthorizedException('Invalid token');
    }
    return credentials;
  }
}
