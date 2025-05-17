import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'postgres',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'gitsearch',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
