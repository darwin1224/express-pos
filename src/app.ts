import express, { Application } from 'express';

class App {
  /**
   * Express instance
   *
   * @type {Application}
   */
  public readonly app: Application = express();

  /**
   * Port number
   *
   * @returns {string | undefined}
   */
  private readonly port: string | undefined = process.env.NODE_PORT;

  /**
   * Constructor
   *
   * @returns {void}
   */
  public constructor() {
    this.listen();
  }

  /**
   * Serve the app
   *
   * @returns {void}
   */
  private listen(): void {
    this.app.listen(this.port, (): void => {
      console.log(`Server is running for ${process.env.NODE_ENV} at port ${this.port}`);
    });
  }
}

export default new App().app;
