import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductImagesModule } from './product-images/product-images.module';

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
      synchronize: true,
    }),
    UsersModule,
    ProductsModule,
    CategoriesModule,
    ProductImagesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
