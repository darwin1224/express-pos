export class BadRequestException extends Error {
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
    this.name = 'BadRequestException';
    Object.setPrototypeOf(this, BadRequestException.prototype);

    /**
     * Exception message
     *
     * @type {string}
     */
    this.message = message;
  }
}
