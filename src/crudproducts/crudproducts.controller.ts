// src/crudproducts/crudproducts.controller.ts
import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Patch,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { CrudproductsService } from './crudproducts.service';
import { CreateCrudproductDto } from './dto/create-crudproduct.dto';
import { UpdateCrudproductDto } from './dto/update-crudproduct.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';

@ApiTags('Product Manage')
@Controller('crudproducts')
export class CrudproductsController {
  constructor(private readonly crudProductService: CrudproductsService) {}

  @Post()
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Create a new product (Auth required)' })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
  })
  async create(@Body() createProductDto: CreateCrudproductDto, @Req() req) {
    return this.crudProductService.create(createProductDto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Return all products' })
  // Decorator for the 'page' query parameter
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'The page number for pagination',
    type: Number,
    example: 1,
  })
  // Decorator for the 'limit' query parameter
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
    return this.crudProductService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiResponse({ status: 200, description: 'Return single product' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  findOne(@Param('id') id: string) {
    return this.crudProductService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Update a product (Auth required)' })
  @ApiResponse({
    status: 200,
    description: 'Product updated successfully',
  })
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateCrudproductDto,
    @Req() req,
  ) {
    return this.crudProductService.update(id, updateProductDto, req.user);
  }

  @Delete(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Delete a product (Auth required)' })
  @ApiResponse({
    status: 200,
    description: 'Product deleted successfully',
  })
  remove(@Param('id') id: string, @Req() req) {
    return this.crudProductService.remove(id, req.user);
  }
}
