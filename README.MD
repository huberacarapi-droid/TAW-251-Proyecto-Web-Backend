# BACKEND
## Instalación del CLI para NestJS

```bash
npm i -g @nestjs/cli
```

## Inicia un proyecto de NestJS
Para iniciar un proyecto: 

```bash
nest new backend

✨  We will scaffold your app in a few seconds..
```

Elejimos npm

```bash
? Which package manager would you ❤️  to use?
❯ npm
  yarn
  pnpm
```

Despues de instalar las dependencias ingresamos al proyecto y desplegamos

```bash
cd backend
npm run start
```

## Para ejecutar NestJS
En el archivo package.json:
```json
"scripts": {
...
"start": "nest start"
,
...
}
```
Para ejecutar el script start:
```bash
npm run start
```
Salida: En el puerto 3000 (por defecto)

## Para reiniciar automáticamente el servidor de NestJS
En el archivo package.json:
```json
"scripts": {
...
"start:dev": "nest start --watch"
,
...
}
```
Para ejecutar el script start:dev:
```bash
npm run start:dev
```

Salida: En el puerto 3000 (por defecto)

### SERVICE
### MODULE
main.ts arranca todo el proyecto

El decorador @Module agrupa distintas funcionalidades en un solo modulo.
imports: añade funcionalidad extra
controllers: agrupa las rutas del proyecto
providers: funciones que son reutilizadas en otras partes


### CONTROLLER


### Inicamos el Proyecto vacio

main.ts
```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

app.module.ts
```ts
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

### Creamos el primer module, controller, service 

Creamos el module users
```bash
nest generate module users
```
Creamos el controller users
```bash
nest generate controller users
```
Para crear el controller users sin testing
```bash
nest generate controller users --no-spec
```
Creamos el service users
```bash
nest generate service users
```

Para crear el service users sin testing
```bash
nest generate service users --no-spec
```

### Creamos las rutas:
En Users se crea el users.controller.ts
```ts
import { Controller } from '@nestjs/common';

@Controller('users')
export class UsersController {}
```

Creamos la primera ruta de prueba

```ts
import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  helloworld(){
    return "Hello World";
  }
}
```

### TypeORM

Seguimos los pasos de https://docs.nestjs.com/techniques/database para instalar typeORM

```bash
npm install --save @nestjs/typeorm typeorm mysql2
```

```bash
npm install @nestjs/typeorm typeorm mysql2 class-validator class-transformer
```


Luego de instalar en app.module.ts importamos TypeOrmModule y creamos la conexión a la base de datos

```ts
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

```

### Creamos Entity Users

Creamos un directorio /users/entities
Creamos el archivo users.entity.ts en el directorio /users/entities

```ts
import {  Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn,} from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest'
}

@Entity({name: 'users'})

export class User{
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50 })
  nombre!: string;

  @Column({ length: 50 })
  paterno!: string;

  @Column({ length: 50 })
  materno!: string;

  @Column({ unique: true, length: 100 })
  email!: string;

  @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.GUEST
    })
  rol!: UserRole;

  @Column({
    nullable: false,
    select: false
  })
  password!: string;

  @CreateDateColumn({
    select: false
  })
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

}

```

Actualizamos el user.module.ts agregando el uso de typeORM

```ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
```

Creamos los metodos para las consultas SQL en UserService

```ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {User} from './entities/users.entity';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {

  constructor( @InjectRepository(User) private userRepository: Repository<User>) {}

  async createUser(user: CreateUserDto){
    // Verificamos si existe el usuario por email
    const userExists = await this.userRepository.findOne({ where: { email: user.email } });
    if(userExists){
      return new HttpException('El usuario con este email ya existe', HttpStatus.CONFLICT);
    }
    // Si no existe, creamos el nuevo usuario
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  getUsers(){
    return this.userRepository.find();
  };

  async getUser(id: number){
    // Buscamos el usuario por id
    const userFound = await this.userRepository.findOne({ 
        where: { // Find Where options
          id 
        } 
      }
    ); 
    // Si no se encuentra el usuario, lanzamos una excepción
    if(!userFound){
      return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
    // Si se encuentra el usuario, lo retornamos
    return userFound;
  }

  async updateUser(id: number, user: UpdateUserDto){
    // Buscamos el usuario por id
    const userFound = await this.userRepository.findOne({ 
        where: { // Find Where options
          id 
        } 
      }
    ); 
    // Si no se encuentra el usuario, lanzamos una excepción
    if(!userFound){
      return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
    // Si se encuentra el usuario, lo actualizamos
    const updatedUser = Object.assign(userFound, user); // Asignamos los nuevos valores al usuario encontrado
    return this.userRepository.save(updatedUser); // Guardamos el usuario actualizado en la base de datos  
    //return this.userRepository.update({id}, user);
  }

  async deleteUser(id: number) {
    const result = await this.userRepository.delete({id});
    if(result.affected === 0){
      return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
```

Actualizamos el users.controller
```ts
import { Controller, Get, Post, Patch,  Delete,  Body, Param , ParseIntPipe, HttpException} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { User } from './entities/users.entity';
import { DeleteResult } from 'typeorm/browser';

@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService){}

  @Get()
  getUsers() : Promise<User[] | HttpException> {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) : Promise<User | HttpException> {
    return this.usersService.getUser(id);
  }

  @Post()
  createUser(@Body() newUser: CreateUserDto) : Promise<User | HttpException> {
    return this.usersService.createUser(newUser);
  }

  @Patch(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() updatedUser: UpdateUserDto) : Promise<User | HttpException> {
    return this.usersService.updateUser(id, updatedUser);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) : Promise<DeleteResult | HttpException> { // ParseIntPipe convierte el id a un número entero
    return this.usersService.deleteUser(id);
  }
}
```


## Creamos el CRUD Categorias y  Productos

```bash
nest g module categories
nest g controller categories --no-spec
nest g service categories --no-spec

nest g module products
nest g controller products --no-spec
nest g service products --no-spec

nest g module product-images
nest g controller product-images --no-spec
nest g service product-images --no-spec
```

Creamos el directorio dto, entities dentro de la carpeta /categories y /products
Creamos los archivos /categories/entities/products.entity.ts,  y /categories/dto/products.dto.ts
Creamos los archivos /products/entities/products.entity.ts,  y /products/dto/products.dto.ts

```bash
nest g class product-images/entities/product-image.entity --no-spec
nest g class product-images/dto/product-image.dto --no-spec
```