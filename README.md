# install nestjs cli

```sh
npm i -g @nestjs/cli

nest new product-api
cd product-api
```

# Install Mongoose for MongoDB integration

```sh
npm install @nestjs/mongoose mongoose
```

# Install JWT for token-based authentication

```sh
npm i @nestjs/passport passport passport-jwt @nestjs/jwt bcrypt @types/passport-jwt @types/bcrypt jsonwebtoken bcrypt @nestjs/config
```

# Install validation and transformation packages

```sh
npm install class-validator class-transformer
```

# Install Swagger for API documentation

```sh
npm install @nestjs/swagger swagger-ui-express
```

#### generate standard crud operation for contact

```sh
nest g resource
contacts
```

#### now time work on updating files related to contacts module like

##### create dto,scheema, little change in controller, contact.module.ts but major chnage in service code.

#### src/app.module.ts

```js
// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CrudusersModule } from './crudusers/crudusers.module';
import { AuthModule } from './auth/auth.module';
import { CrudproductsModule } from './crudproducts/crudproducts.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    CrudusersModule,
    AuthModule,
    CrudproductsModule,
    ContactsModule,
  ],
})
export class AppModule {}
```

#### auth.module.ts

```js
// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CrudusersModule } from 'src/crudusers/crudusers.module';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CrudusersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
```

#### jwt.strategy.ts

```js
// src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const secretOrKey = configService.get<string>('JWT_SECRET');
    if (!secretOrKey) {
      throw new UnauthorizedException('JWT_SECRET is not configured.');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secretOrKey,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
```

```sh
MONGO_URI = "mongodb+srv://"
JWT_SECRET = "a-very-long-and-random-string-with-numbers-and-symbols-!@#$%^&*()_+"
```

#### npm run start:dev

#### the from browser http:://localhost:3000/api test every thing from swagger
