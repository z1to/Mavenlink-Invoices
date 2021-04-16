import express from 'express'

import task from './task'
import user from './user';
import invoice from './invoice';

const routes = (app: express.Application) => {
  app.use('/', user)
  app.use('/tasks', task)
  app.use('/invoices', invoice)
}

export default routes;
