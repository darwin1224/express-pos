import 'reflect-metadata';
import 'dotenv/config';
import App from '@/app';
import { Application } from 'express';
import { useContainer as useRoutingControllersContainer, useExpressServer } from 'routing-controllers';
import { Container } from 'typedi';
import { useContainer as useTypeORMContainer } from 'typeorm';

/**
 * Use typeorm ioc container to resolve dependency inversion
 *
 * @returns {void}
 */
useTypeORMContainer(Container);

/**
 * Use routing controllers ioc container to resolve dependency inversion
 *
 * @returns {void}
 */
useRoutingControllersContainer(Container);

/**
 * Serve the app
 *
 * @returns {Application}
 */
useExpressServer<Application>(App, {
  cors: true,
  controllers: [__dirname + '/modules/**/controllers/*.ts'],
});
