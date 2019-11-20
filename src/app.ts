import compression from 'compression';
import express, { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { createConnection } from 'typeorm';

class App {
  /**
   * Express instance
   *
   * @type {Application}
   */
  public readonly app: Application = express();

  /**
   * Constructor
   *
   * @returns {void}
   */
  public constructor() {
    this.init();
  }

  /**
   * Bootstrap the app
   *
   * @returns {Promise<void>}
   */
  private async init(): Promise<void> {
    this.setUpHelmet();
    this.setUpCompression();
    await this.initDatabaseConnection();
    this.setUpMorgan();
  }

  /**
   * Set up helmet
   *
   * @returns {void}
   */
  private setUpHelmet(): void {
    this.app.use(helmet());
  }

  /**
   * Set up compression
   *
   * @returns {void}
   */
  private setUpCompression(): void {
    this.app.use(compression());
  }

  /**
   * Init database connection
   *
   * @returns {Promise<void>}
   */
  private async initDatabaseConnection(): Promise<void> {
    try {
      await createConnection();
      console.log('Database is connected');
    } catch (err) {
      throw new Error(err.message);
    }
  }

  /**
   * Set up morgan
   *
   * @returns {void}
   */
  private setUpMorgan(): void {
    this.app.use(morgan('dev'));
  }
}

export default new App().app;
