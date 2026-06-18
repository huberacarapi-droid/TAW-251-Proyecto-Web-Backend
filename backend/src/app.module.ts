import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductImagesModule } from './product-images/product-images.module';
import { AuthModule } from './auth/auth.module';
import { CaptchaService } from './auth/captchaService';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username:'admin',
      password: 'Admin.2026*',
      database: 'db_taw251_proyecto',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    UsersModule,
    ProductsModule,
    CategoriesModule,
    ProductImagesModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, // Hace las variables de entorno globales
    }),
  ],
  controllers: [],
  providers: [ CaptchaService ],
})
export class AppModule {}
