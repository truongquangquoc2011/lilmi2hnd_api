import { Logger } from '@nestjs/common';
import { config as loadDotenv } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { z } from 'zod';

// 1. Định nghĩa môi trường chạy
export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

// 2. Load file .env - Sửa lại để không bị crash trên Vercel
const ENV_PATH = path.resolve('.env');

// Chỉ load dotenv nếu file .env thực sự tồn tại (Local)
// Nếu không có file (như trên Vercel), nó sẽ tự lấy biến từ process.env
if (fs.existsSync(ENV_PATH)) {
  loadDotenv({ path: ENV_PATH });
} else {
  // Log nhẹ để bạn biết là đang dùng biến môi trường hệ thống, không chặn đứng server
  console.log('💡 No .env file found, using system environment variables.');
}

// 3. Schema kiểm tra biến môi trường
const EnvSchema = z.object({
  NODE_ENV: z
    .enum([Environment.Development, Environment.Production, Environment.Test])
    .default(Environment.Development),
  PORT: z
    .string()
    .default('8080')
    .transform(Number)
    .refine((val) => !isNaN(val), { message: 'PORT must be a number' }),
  
  // Lưu ý: Đảm bảo bạn đã điền DATABASE_URL trên Vercel Settings
  DATABASE_URL: z.string().min(1, { message: 'DATABASE_URL is required' }),
});

const parsedEnv = EnvSchema.safeParse(process.env);

if (!parsedEnv.success) {
  // Thay vì process.exit(1), log lỗi chi tiết để dễ debug trên Vercel Logs
  console.error('❌ Invalid environment variables:', JSON.stringify(parsedEnv.error.format(), null, 2));
  // Không nên process.exit(1) trên Vercel vì sẽ làm function invocation failed liên tục
}

// 4. Export cấu hình
export const envConfig = {
  nodeEnv: parsedEnv.data?.NODE_ENV || Environment.Production,
  port: parsedEnv.data?.PORT || 8080,
  databaseUrl: parsedEnv.data?.DATABASE_URL || '',
} as const;

export type EnvConfigType = typeof envConfig;