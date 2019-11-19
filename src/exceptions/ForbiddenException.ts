export class ForbiddenException extends Error {
  /**
   * Constructor
   *
   * @param {string} message
   * @returns {void}
   */
  public constructor(message: string) {
    super();

    /**
     * Name of the exception
     *
     * @type {string}
     */
    this.name = 'ForbiddenException';
    Object.setPrototypeOf(this, ForbiddenException.prototype);

    /**
     * Exception message
     *
     * @type {string}
     */
    this.message = message;
  }
}
