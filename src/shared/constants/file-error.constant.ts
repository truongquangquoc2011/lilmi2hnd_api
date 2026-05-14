import { BadRequestException } from '@nestjs/common';

export const ImageBufferNotFoundException = new BadRequestException('Không tìm thấy dữ liệu hình ảnh');
export const PdfBufferNotFoundException = new BadRequestException('Không tìm thấy dữ liệu file PDF');