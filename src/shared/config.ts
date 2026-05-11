import { Logger } from '@nestjs/common'
import { config as loadDotenv } from 'dotenv'
import * as fs from 'fs';
import * as path from 'path';
import { z } from 'zod'

// 1. Định nghĩa môi trường chạy
export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

// 2. Load file .env
const ENV_PATH = path.resolve('.env')
if (process.env.NODE_ENV !== Environment.Production) {
  if (!fs.existsSync(ENV_PATH)) {
    throw new Error(`Missing .env at ${ENV_PATH} (local dev)`)
  }
  loadDotenv({ path: ENV_PATH })
}

// 3. Schema chỉ giữ lại những gì "sống còn"
const EnvSchema = z.object({
  NODE_ENV: z.enum([Environment.Development, Environment.Production, Environment.Test]).default(Environment.Development),
  PORT: z
    .string()
    .default('8080')
    .transform(Number)
    .refine((val) => !isNaN(val), { message: 'PORT must be a number' }),
  
  DATABASE_URL: z.string().url({ message: 'DATABASE_URL must be a valid MongoDB URL' }),
})

const parsedEnv = EnvSchema.safeParse(process.env)

if (!parsedEnv.success) {
  Logger.error('❌ Invalid environment variables:\n' + JSON.stringify(parsedEnv.error.format(), null, 2))
  process.exit(1)
}

// 4. Export gọn nhẹ nhất có thể
export const envConfig = {
  nodeEnv: parsedEnv.data.NODE_ENV,
  port: parsedEnv.data.PORT,
  databaseUrl: parsedEnv.data.DATABASE_URL,
} as const;

export type EnvConfigType = typeof envConfig;