export class NotFoundException extends Error {
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
    this.name = 'NotFoundException';
    Object.setPrototypeOf(this, NotFoundException.prototype);

    /**
     * Exception message
     *
     * @type {string}
     */
    this.message = message;
  }
}
