import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseModule } from '../expense/expense.module';

@Module({
  imports: [
    ExpenseModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'Financial',
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
})
export class AppModule {}
