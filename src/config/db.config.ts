import { join } from 'path';
import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const dbConfig: () => DataSourceOptions = () => {
  return {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    // autoLoadEntities: true,
    logNotifications: true,
    synchronize: process.env.NODE_ENV == 'development',
    migrationsRun: process.env.NODE_ENV == 'production',
    applicationName: 'lab-ferreira-api',
    namingStrategy: new SnakeNamingStrategy(),
    ssl: process.env.NODE_ENV == 'production',
    migrations: [join(__dirname, '**', '*.migration{.js,.ts}')],
    entities: [join(__dirname, '**', '*[^base].entity{.js,.ts}')],
  };
};
