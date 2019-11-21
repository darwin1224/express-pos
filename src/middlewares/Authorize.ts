import { ForbiddenException } from '@/exceptions/ForbiddenException';
import { JWT } from '@/libraries/JWT';
import { Action } from 'routing-controllers';

export class Authorize {
  /**
   * Handle the incoming request
   *
   * @param {Action} action.request
   * @param {string[]} roles
   * @returns {boolean}
   */
  public static handle({ request }: Action, roles: string[]): boolean {
    try {
      const authorizationHeader = process.env.AUTHORIZATION_HEADER_NAME as string;
      const { payload } = new JWT().decode(request.header(authorizationHeader) as string) as any;
      if (!roles.length || !payload.role_user_id.role_user_name) {
        throw new ForbiddenException(`You don't have any role to access`);
      }
      roles = roles.map(providedRole => providedRole.toLowerCase());
      if (!roles.includes(payload.role_user_id.role_user_name.toLowerCase())) {
        throw new ForbiddenException('You are not allowed to access this route');
      }
      return true;
    } catch (err) {
      throw new ForbiddenException(err.message);
    }
  }
}
