import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ZodSerializerDto } from 'nestjs-zod';
import { ImportsService } from './import.service';
import { CreateImportDTO, ListImportQueryDTO, ListImportResDTO, UpdateImportDTO } from './dto/imports.dto';
import { MessageResDTO } from 'src/shared/dto/response.dto';

@ApiTags('Imports')
@Controller('imports')
export class ImportsController {
  constructor(private readonly service: ImportsService) {}

  @Get()
  @ZodSerializerDto(ListImportResDTO)
  @ApiOperation({ summary: 'Lấy danh sách kiện hàng' })
  findAll(@Query() query: ListImportQueryDTO) {
    return this.service.findAll(query);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ZodSerializerDto(CreateImportDTO) // Bạn có thể tạo CreateImportResDTO riêng nếu muốn
  @ApiOperation({ summary: 'Tạo kiện hàng mới' })
  create(@Body() body: CreateImportDTO) {
    return this.service.create(body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật kiện hàng' })
  update(@Param('id') id: string, @Body() body: UpdateImportDTO) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @ZodSerializerDto(MessageResDTO)
  @ApiOperation({ summary: 'Xóa kiện hàng' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}