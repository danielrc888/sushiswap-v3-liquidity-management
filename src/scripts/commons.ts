import { ethers } from 'ethers'
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json'
import { provider } from '../blockchain/connection'
import { Token, BigintIsh } from '@uniswap/sdk-core'
import { Pool, Position, FeeAmount, nearestUsableTick } from '@uniswap/v3-sdk'

export async function buildPool() {
    const poolAddress = "0x3Ecc8cFC6253378fd93E7Ff76d0938649AaDd485"
    const poolContract = new ethers.Contract(
        poolAddress,
        IUniswapV3PoolABI.abi,
        provider
    )
    const [liquidity, slot0] =
    await Promise.all([
        poolContract.liquidity(),
        poolContract.slot0(),
    ])

    const tokenA = new Token(
        11155111,
        '0x3a21C919cE86e6e11F318638e582d36361a93C54',
        18,
        'USDC',
        'USD Coin'
    )
    const tokenB = new Token(
        11155111,
        '0xc66d55434782B02ebb4Baf8Dc559c7b95bB035D5',
        18,
        'WETH',
        'Wrapped Ether'
    )
    const fee = FeeAmount.LOW

    const pool = new Pool(
        tokenA,
        tokenB,
        fee,
        slot0.sqrtPriceX96.toString(),
        liquidity.toString(),
        Number(slot0.tick),
    )
    return pool
}

export function buildPositionFromPool(
    pool: Pool,
    amount0: BigintIsh,
    amount1: BigintIsh
): Position {
    return Position.fromAmounts({
        pool,
        tickLower:
            nearestUsableTick(pool.tickCurrent, pool.tickSpacing) -
            pool.tickSpacing * 2,
        tickUpper:
            nearestUsableTick(pool.tickCurrent, pool.tickSpacing) +
            pool.tickSpacing * 2,
        amount0,
        amount1,
        useFullPrecision: true,
    })
}