import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'demo-nestjs',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migration/*.js'],
  migrationsTableName: 'custom_migration_table',
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
