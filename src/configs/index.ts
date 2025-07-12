import * as dotenv from 'dotenv';

dotenv.config();

function getEnv(key: string, fallback?: string): string {
  const value = process.env[key] ?? fallback;
  if (value === undefined) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

export const alchemyUrl = `https://polygon-amoy.g.alchemy.com/v2/${getEnv('ALCHEMY_KEY')}`;
export const validUserIds = ['1', '2', '45', '3'];
export const confirmaitonsNeeded = 2;
export const webHookRetryTimes = 3;
export const webHookURL = getEnv('WEBHOOK_URL');

export const USDC_ADDRESS = '0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582';
export const ERC20_ABI = [
  'event Transfer(address indexed from, address indexed to, uint amount)',
];
