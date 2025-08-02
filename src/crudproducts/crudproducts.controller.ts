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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CrudproductsService } from './crudproducts.service';
import { CreateCrudproductDto } from './dto/create-crudproduct.dto';
import { UpdateCrudproductDto } from './dto/update-crudproduct.dto';

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
  findAll() {
    return this.crudProductService.findAll();
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
