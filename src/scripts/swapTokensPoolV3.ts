import { wallet } from "../blockchain/connection";
import { ethers } from "ethers";
import { SUSHI_V3_SWAP_ROUTER } from "../blockchain/commons";

async function swapTokens() {
  // USDC Coin on Sepolia
  const tokenA = "0x3a21C919cE86e6e11F318638e582d36361a93C54";

  // WETH on Sepolia
  const tokenB = "0xc66d55434782B02ebb4Baf8Dc559c7b95bB035D5";

  const routerABI = [
    "function exactInputSingle((address,address,uint24,address,uint256,uint256,uint256,uint160))",
  ];
  const routerContract = new ethers.Contract(
    SUSHI_V3_SWAP_ROUTER,
    routerABI,
    wallet,
  );

  // Swap params
  const tokenIn = tokenB;
  const tokenOut = tokenA;
  const fee = 500;
  const recipient = wallet.address;
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
  const amountIn = BigInt("100000000000000000");
  const amountOutMin = 0;
  const sqrtPriceX96 = 0;

  const params = [
    tokenIn,
    tokenOut,
    fee,
    recipient,
    deadline,
    amountIn,
    amountOutMin,
    sqrtPriceX96,
  ];
  try {
    // Sending the transaction
    const tx = await routerContract.exactInputSingle(params);
    console.log("Transaction sent:", tx.hash);
    // Wait for the transaction to be mined
    await tx.wait();
    console.log("Transaction mined!");
  } catch (error) {
    console.error("Error sending transaction:", error);
  }
}

swapTokens();
