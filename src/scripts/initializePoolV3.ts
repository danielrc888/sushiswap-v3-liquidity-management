import { wallet } from "../blockchain/connection";
import { ethers } from "ethers";

async function initializePoolV3() {
  const poolAddress = "0x3Ecc8cFC6253378fd93E7Ff76d0938649AaDd485";
  const poolV3ABI = ["function initialize(uint160 sqrtPriceX96) external"];
  const poolV3Contract = new ethers.Contract(poolAddress, poolV3ABI, wallet);
  const sqrtPriceX96 = BigInt("352543067384193897615838917652381571");
  try {
    // Sending the transaction
    const tx = await poolV3Contract.initialize(sqrtPriceX96);
    console.log("Transaction sent:", tx.hash);
    // Wait for the transaction to be mined
    await tx.wait();
    console.log("Transaction mined!");
  } catch (error) {
    console.error("Error sending transaction:", error);
  }
}

initializePoolV3();
