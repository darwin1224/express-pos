export class HashException extends Error {
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
    this.name = 'HashException';
    Object.setPrototypeOf(this, HashException.prototype);

    /**
     * Exception message
     *
     * @type {string}
     */
    this.message = message;
  }
}
