import { join } from 'path';
import { DataSource } from 'typeorm';
//import { CreateTable1673218477897 } from "../migrations/1673218477897-CreateTable";
import { config } from 'dotenv';
import { CreateTables1686624898364 } from '../migrations/1686624898364-CreateTables';

config({
  path: process.env.NODE_ENV === 'test' ? '.env.testing' : '.env',
});

export const dataSource = new DataSource({
  type: 'mariadb',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_TABLE,
  entities: [join(__dirname, '..', '**', '*.db-entity.{ts,js}')],
  //synchronize: process.env.NODE_ENV === 'test' ? true : false, //*** NÃO USAR EM PRODUÇÃO!! Pode apagar os dados das tabelas!! ***
  synchronize: true, //*** NÃO USAR EM PRODUÇÃO!! Pode apagar os dados das tabelas!! ***
  //migrationsTableName: 'Migrations', se precisar mudar o nome da tabela migrations
  logging: false,
  migrations: [CreateTables1686624898364],
});

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      return dataSource.initialize();
    },
  },
];
/*
export const dataSource = new DataSource({
  type: 'mariadb',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_TABLE,
  entities: [join(__dirname, '**', '*.db-entity.{ts,js}')],
  synchronize: process.env.NODE_ENV === 'test' ? true : false, //*** NÃO USAR EM PRODUÇÃO!! Pode apagar os dados das tabelas!! ***
  //migrationsTableName: 'TbMarTelecomMigrations', se precisar mudar o nome da tabela migrations
  logging: false,
  migrations: [CreateTables1686624898364],
});
*/
