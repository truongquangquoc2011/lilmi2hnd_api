import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDTO, UpdateOrderDTO } from './dto/order.dto';

@ApiTags('Order')
@Controller('orders')
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy toàn bộ danh sách đơn hàng' })
  findAll() {
    return this.service.findAll();
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