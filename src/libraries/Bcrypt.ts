import { HashException } from '@/exceptions/HashException';
import bcrypt from 'bcrypt';

export class Bcrypt {
  /**
   * Salt round
   *
   * @type {string}
   */
  private static get salt(): number {
    return Number(process.env.SALT_ROUND);
  }

  /**
   * Bcrypt hash
   *
   * @param {string} password
   * @returns {string}
   */
  public static hash(password: string): string {
    if (!password.length) {
      throw new HashException('Password should not be empty');
    }
    return bcrypt.hashSync(password, this.salt);
  }

  /**
   * Bcrypt compare
   *
   * @param {string} password
   * @param {string} passwordEncrypted
   * @returns {boolean}
   */
  public static compare(password: string, passwordEncrypted: string): boolean {
    return bcrypt.compareSync(password, passwordEncrypted);
  }
}
