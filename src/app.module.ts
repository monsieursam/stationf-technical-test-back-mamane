// src/app.module.ts
import { Module } from '@nestjs/common';
import { CoffeeModule } from './coffee/coffee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // I add this information only for the sake of completeness
      // This should be to the .env file
      type: 'mysql', // Change this to your database type if using a different one
      host: 'sql11.freesqldatabase.com',
      port: 3306,
      username: 'sql11680930',
      password: 'W6KLC7RjrT',
      database: 'sql11680930',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Only for development, should be set to false in production
    }),
    CoffeeModule,
    OrderModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
