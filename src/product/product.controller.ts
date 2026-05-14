import { 
  Body, Controller, Delete, Get, Param, Patch, Post, Query,
  UseInterceptors, UploadedFile, HttpCode, HttpStatus 
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ZodSerializerDto } from 'nestjs-zod';
import { ProductService } from './product.service';
import { 
  CreateProductDTO, 
  UpdateProductDTO, 
  ListProductQueryDTO, 
  ListProductResDTO 
} from './dto/product.dto';

@ApiTags('Product')
@Controller('products')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get()
  @ZodSerializerDto(ListProductResDTO)
  @ApiOperation({ summary: 'Lấy danh sách sản phẩm có phân trang' })
  findAll(@Query() query: ListProductQueryDTO) {
    return this.service.findAll(query);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Tạo sản phẩm mới kèm ảnh' })
  create(
    @Body() body: CreateProductDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.service.create(body, file);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Cập nhật sản phẩm' })
  update(
    @Param('id') id: string,
    @Body() body: UpdateProductDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.service.update(id, body, file);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa sản phẩm' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}