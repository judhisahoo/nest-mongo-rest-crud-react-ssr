import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CrudusersService } from './crudusers.service';
import {
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { UpdateCruduserDto } from 'src/auth/dto/update-cruduser.dto';

@Controller('crudusers')
@ApiTags('All Users')
export class CrudusersController {
  constructor(private readonly cruduserService: CrudusersService) {}

  @Get()
  @ApiOperation({ summary: 'Get All User' })
  @ApiResponse({ status: 200, description: 'Return All Users' })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'The page number for pagination',
    type: Number,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'The number of items per page',
    type: Number,
    example: 10,
  })
  async findAll(@Query() query: ExpressQuery): Promise<any> {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    return this.cruduserService.findAll(page, limit);
  }

  @Patch(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Update profile' })
  @ApiResponse({
    status: 200,
    description: 'Profile updated successfully',
  })
  update(
    @Param('id') id: string,
    @Body() updateCruduserDto: UpdateCruduserDto,
  ) {
    return this.cruduserService.update(id, updateCruduserDto);
  }
}
