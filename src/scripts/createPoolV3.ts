import { wallet } from '../blockchain/connection'
import { SUSHI_V3_POOL_FACTORY } from '../blockchain/commons'
import { ethers } from 'ethers'

async function createPoolV3() {
    const poolV3FactoryABI = [
        'function createPool(address tokenA, address tokenB, uint24 fee ) external returns (address pool)'
    ]
    const poolV3FactoryContract = new ethers.Contract(
        SUSHI_V3_POOL_FACTORY,
        poolV3FactoryABI,
        wallet
    )
    // USDC Coin on Sepolia
    const tokenA = "0x3a21C919cE86e6e11F318638e582d36361a93C54"

    // WETH on Sepolia
    const tokenB = "0xc66d55434782B02ebb4Baf8Dc559c7b95bB035D5"

    const fee = 500

    try {
        // Sending the transaction
        const tx = await poolV3FactoryContract.createPool(
            tokenA,
            tokenB,
            fee
        )
        console.log("Transaction sent:", tx.hash);
        // Wait for the transaction to be mined
        await tx.wait();
        console.log("Transaction mined!");
    } catch (error) {
        console.error("Error sending transaction:", error);
    }
}

createPoolV3()
