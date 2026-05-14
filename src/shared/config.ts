import { Logger } from '@nestjs/common';
import { config as loadDotenv } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { z } from 'zod';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

const ENV_PATH = path.resolve('.env');

if (fs.existsSync(ENV_PATH)) {
  loadDotenv({ path: ENV_PATH });
} else {
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
  
  DATABASE_URL: z.string().min(1, { message: 'DATABASE_URL is required' }),

  // --- CLOUDINARY CONFIG ---
  CLOUDINARY_NAME: z.string().min(1, 'CLOUDINARY_NAME is required'),
  CLOUDINARY_API_KEY: z.string().min(1, 'CLOUDINARY_API_KEY is required'),
  CLOUDINARY_API_SECRET: z.string().min(1, 'CLOUDINARY_API_SECRET is required'),
  CLOUDINARY_DEFAULT_FOLDER: z.string().default('avatars'),
  CLOUDINARY_RETRY_ATTEMPTS: z.string().default('3').transform(Number),
  CLOUDINARY_MIN_TIMEOUT_MS: z.string().default('1000').transform(Number),
  CLOUDINARY_MAX_TIMEOUT_MS: z.string().default('5000').transform(Number),
});

const parsedEnv = EnvSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', JSON.stringify(parsedEnv.error.format(), null, 2));
}

// 4. Export cấu hình
export const envConfig = {
  nodeEnv: parsedEnv.data?.NODE_ENV || Environment.Production,
  port: parsedEnv.data?.PORT || 8080,
  databaseUrl: parsedEnv.data?.DATABASE_URL || '',
  
  // --- Thêm cụm Cloudinary vào đây ---
  cloudinary: {
    name: parsedEnv.data?.CLOUDINARY_NAME || '',
    apiKey: parsedEnv.data?.CLOUDINARY_API_KEY || '',
    apiSecret: parsedEnv.data?.CLOUDINARY_API_SECRET || '',
    defaultFolder: parsedEnv.data?.CLOUDINARY_DEFAULT_FOLDER || 'avatars',
    retryAttempts: parsedEnv.data?.CLOUDINARY_RETRY_ATTEMPTS || 3,
    minTimeout: parsedEnv.data?.CLOUDINARY_MIN_TIMEOUT_MS || 1000,
    maxTimeout: parsedEnv.data?.CLOUDINARY_MAX_TIMEOUT_MS || 5000,
  },
} as const;

export type EnvConfigType = typeof envConfig;