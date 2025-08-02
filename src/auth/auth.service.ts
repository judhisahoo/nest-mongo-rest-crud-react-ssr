import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CrudusersService } from '../crudusers/crudusers.service';
import { CreateCruduserDto } from './dto/create-cruduser.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { UserDocument } from 'src/crudusers/schemas/cruduser.schema';

@Injectable()
export class AuthService {
  constructor(
    private crudusersService: CrudusersService,
    private jwtService: JwtService,
  ) {}

  async register(createCruduserDto: CreateCruduserDto) {
    const cruduser = await this.crudusersService.create(createCruduserDto);
    return {
      email: cruduser.email,
    };
  }

  async login(loginDto: LoginDto) {
    // FIX: Correctly using loginDto.email to find the user
    const user: UserDocument | null = await this.crudusersService.findByEmail(
      loginDto.email,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user._id };
    const accessToken = this.jwtService.sign(payload);

    // FIX: Destructure the user object to exclude the password
    const { password, ...userDetails } = user.toObject();

    return {
      access_token: accessToken,
      user: userDetails, // Return the user details in the response
    };
  }
}
