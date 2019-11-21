import { BadRequestException } from '@/exceptions/BadRequestException';
import { ForbiddenException } from '@/exceptions/ForbiddenException';
import { NotFoundException } from '@/exceptions/NotFoundException';
import { UnauthorizedException } from '@/exceptions/UnauthorizedException';
import { NextFunction, Request, Response } from 'express';
import { ExpressErrorMiddlewareInterface, Middleware, BadRequestError } from 'routing-controllers';

@Middleware({ type: 'after' })
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
  /**
   * Handle the incoming request
   *
   * @param {any} err
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {void}
   */
  public error(err: any, req: Request, res: Response, next: NextFunction): void {
    if (err) {
      this.switchAgainstErrors(err, res);
    }
    next(err);
  }

  /**
   * Switch against error types
   *
   * @param {any} err
   * @param {Response} res
   * @returns {void}
   */
  private switchAgainstErrors(err: any, res: Response): void {
    switch (true) {
      case err instanceof NotFoundException:
        res.status(404);
        this.toJson(err, res, 'Resource not found');
        break;
      case err instanceof BadRequestException:
        res.status(400);
        this.toJson(err, res, 'Bad request occured');
        break;
      case err instanceof UnauthorizedException:
        res.status(401);
        this.toJson(err, res, 'Unauthorized');
        break;
      case err instanceof ForbiddenException:
        res.status(403);
        this.toJson(err, res, 'Forbidden access');
        break;
      case err instanceof BadRequestError:
        res.json(err);
        break;
      default:
        res.status(500);
        this.toJson(err, res);
        break;
    }
  }

  /**
   * Parse error to json
   *
   * @param {Error} err
   * @param {Response} res
   * @param {string} message
   * @returns {void}
   */
  private toJson(err: Error, res: Response, message?: string): void {
    res.json({
      name: err.name || 'Error',
      message:
        (process.env.NODE_ENV === 'production' ? message : err.message) || 'Something went wrong',
    });
  }
}
