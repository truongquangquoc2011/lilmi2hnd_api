import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ZodSerializerDto } from 'nestjs-zod';
import { OrderService } from './order.service';
import { CreateOrderDTO, UpdateOrderDTO, OrderResponseDTO } from './dto/order.dto';
import { CloudinaryService } from '../shared/services/cloudinary.service';


@ApiTags('Order')
@Controller('orders')
export class OrderController {
  constructor(
    private readonly service: OrderService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get()
  @ZodSerializerDto(OrderResponseDTO)
  @ApiOperation({ summary: 'Lấy toàn bộ danh sách đơn hàng' })
  findAll() {
    return this.service.findAll();
  }

  @Post('item-images')
  @UseInterceptors(FilesInterceptor('files', 10))
  @ApiOperation({ summary: 'Upload ảnh item đơn hàng' })
  async uploadItemImages(@UploadedFiles() files: Express.Multer.File[]) {
    const urls = await Promise.all(
      files.map((file) => this.cloudinaryService.uploadImage(file)),
    );

    return { urls };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Tạo đơn hàng mới' })
  create(@Body() body: CreateOrderDTO) {
    return this.service.create(body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật đơn hàng' })
  update(@Param('id') id: string, @Body() body: UpdateOrderDTO) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa đơn hàng' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}