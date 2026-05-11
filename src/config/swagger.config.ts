import { DocumentBuilder, OpenAPIObject } from '@nestjs/swagger'
import { Injectable } from '@nestjs/common'
import { envConfig, Environment } from 'src/shared/config'

@Injectable()
export class SwaggerConfigService {
  build(): Omit<OpenAPIObject, 'paths'> {
    const isProd = envConfig.nodeEnv === Environment.Production

    const builder = new DocumentBuilder()
      .setTitle('lilmi.2HAND API')
      .setDescription('Hệ thống quản lý Nhập hàng & Đơn hàng cho lilmi.2HAND')
      .setVersion('1.0')

    // Chỉ thêm server Development nếu không phải Production
    if (!isProd) {
      builder.addServer(`http://localhost:${envConfig.port}`, Environment.Development)
    }

    // Nếu sau này Kami có domain thật thì mới cần thêm server Prod
    // Hiện tại chạy local thì chỉ cần bấy nhiêu thôi

    return builder.build()
  }
}