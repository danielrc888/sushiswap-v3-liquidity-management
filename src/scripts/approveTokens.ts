import { wallet } from '../blockchain/connection'
import { SUSHI_NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS } from '../blockchain/commons'
import { ethers } from 'ethers'

async function approveToPositionManager() {
    const erc20ABI = [
        'function approve(address spender, uint value) external returns (bool)'
    ]
    // USDC Coin on Sepolia
    const tokenA = "0x3a21C919cE86e6e11F318638e582d36361a93C54"
    const amountA = BigInt('1000000000000000000000')
    // WETH on Sepolia
    const tokenB = "0xc66d55434782B02ebb4Baf8Dc559c7b95bB035D5"
    const amountB = BigInt('1000000000000000000000')

    const tokenAContract = new ethers.Contract(
        tokenA,
        erc20ABI,
        wallet
    )

    const tokenBContract = new ethers.Contract(
        tokenB,
        erc20ABI,
        wallet
    )

    try {
        // Sending the transaction 1
        const tx = await tokenAContract.approve(
            SUSHI_NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS,
            amountA
        )
        console.log("Transaction 1 sent:", tx.hash);
        // Wait for the transaction to be mined
        await tx.wait();
        console.log("Transaction 1 mined!");
    } catch (error) {
        console.error("Error sending transaction 1:", error);
    }

    try {
        // Sending the transaction 2
        const tx = await tokenBContract.approve(
            SUSHI_NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS,
            amountB
        )
        console.log("Transaction 2 sent:", tx.hash);
        // Wait for the transaction to be mined
        await tx.wait();
        console.log("Transaction 2 mined!");
    } catch (error) {
        console.error("Error sending transaction 2:", error);
    }

}

approveToPositionManager()
