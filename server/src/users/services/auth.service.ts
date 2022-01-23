import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne(email);

    if (!user) throw new NotFoundException('Invalid email');

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) throw new BadRequestException('Invalid password');

    return user;
  }
}
