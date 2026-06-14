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

    /*
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
    return this.userRepository.delete({id}); // Find id and delete*/
  }
}
