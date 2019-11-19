import { UnauthorizedException } from '@/exceptions/UnauthorizedException';
import { JWT } from '@/libraries/JWT';
import { NextFunction, Request, Response } from 'express';
import { ExpressMiddlewareInterface } from 'routing-controllers';

export class Authenticate implements ExpressMiddlewareInterface {
  /**
   * Handle the incoming request
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {void}
   */
  public use(req: Request, res: Response, next: NextFunction): void {
    try {
      const authorizationHeader = process.env.AUTHORIZATION_HEADER_NAME as string;
      const token = req.header(authorizationHeader) as string;
      JWT.verify(token);
      next();
    } catch (err) {
      return next(new UnauthorizedException(err.message));
    }
  }
}
