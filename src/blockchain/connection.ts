import { ethers } from 'ethers'
import 'dotenv/config';

const privateKey = process.env.WALLET_PRIVATE_KEY;
if (!privateKey) {
    throw new Error('WALLET_PRIVATE_KEY environment variable is not set.');
}

export const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
export const wallet = new ethers.Wallet(privateKey, provider);