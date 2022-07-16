import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'bteaepboh5mioegkxfdp-mysql.services.clever-cloud.com',
      port: 3306,
      username: 'uookzdrvwxuk1iop',
      password: 'cwwCBIS2Dr0CTnWT3230',
      database: 'bteaepboh5mioegkxfdp',
      entities: entities,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
