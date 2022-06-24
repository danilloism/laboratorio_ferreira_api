import { DataSource } from 'typeorm';
import { dbConfig } from './db.config';

export const appDataSource = new DataSource(dbConfig());
