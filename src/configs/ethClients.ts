import { ethers } from 'ethers';
import { ERC20_ABI, USDC_ADDRESS, alchemyUrl } from './index';

export const provider = new ethers.JsonRpcProvider(alchemyUrl);

export const usdcContract = new ethers.Contract(
  USDC_ADDRESS,
  ERC20_ABI,
  provider,
);
