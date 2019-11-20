import { Request } from 'express';

/**
 * Get the full url
 *
 * @param {Request} req
 * @returns {string}
 */
export const getFullUrl = (req: Request): string => {
  return `${req.protocol}://${req.hostname}${req.baseUrl}${req.path}`;
};
