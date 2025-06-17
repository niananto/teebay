import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(input: RegisterInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(input.password, 10);
    const user = await this.prisma.user.create({
      data: {
        first_name: input.first_name,
        last_name: input.last_name,
        username: input.username,
        phone: input.phone,
        email: input.email,
        auth: {
          create: {
            encrypted_password: hashedPassword,
          },
        },
      },
    });
    return user;
  }

  async login(input: LoginInput): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { phone: input.handle },
          { email: input.handle },
          { username: input.handle },
        ],
      },
      include: { auth: true },
    });

    if (!user || !user.auth)
      throw new UnauthorizedException('Invalid credentials');

    const isValid = await bcrypt.compare(
      input.password,
      user.auth.encrypted_password,
    );

    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    return user;
  }
}
