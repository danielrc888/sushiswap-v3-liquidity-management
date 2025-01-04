import { wallet, provider } from '../blockchain/connection'
import { SUSHI_NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS } from '../blockchain/commons'
import { ethers } from 'ethers'
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json'
import { Pool, FeeAmount, Position, nearestUsableTick, MintOptions, NonfungiblePositionManager } from '@uniswap/v3-sdk'
import { Token } from '@uniswap/sdk-core'
import { BigintIsh, Percent } from '@uniswap/sdk-core'


async function createLiquidityPosition() {
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
    console.log(liquidity, slot0)

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

    const configuredPool = new Pool(
        tokenA,
        tokenB,
        fee,
        slot0.sqrtPriceX96.toString(),
        liquidity.toString(),
        Number(slot0.tick),
    )

    // The maximum token amounts we want to provide. BigIntish accepts number, string or JSBI
    const amount0: BigintIsh = "55000000000000000000"
    const amount1: BigintIsh = "77000000000000000000"


    const position = Position.fromAmounts({
        pool: configuredPool,
        tickLower:
          nearestUsableTick(configuredPool.tickCurrent, configuredPool.tickSpacing) -
          configuredPool.tickSpacing * 2,
        tickUpper:
          nearestUsableTick(configuredPool.tickCurrent, configuredPool.tickSpacing) +
          configuredPool.tickSpacing * 2,
        amount0: amount0,
        amount1: amount1,
        useFullPrecision: true,
    })

    console.log(position)

    const mintOptions: MintOptions = {
        recipient: wallet.address,
        deadline: Math.floor(Date.now() / 1000) + 60 * 20,
        slippageTolerance: new Percent(50, 10_000),
    }

    const { calldata, value } = NonfungiblePositionManager.addCallParameters(
        position,
        mintOptions
    )

    console.log(calldata, value)

    const block = await provider.getBlock('latest')
    if (!block || !block.baseFeePerGas) { return }

    const MAX_FEE_PER_GAS = BigInt(2) * block.baseFeePerGas
    const MAX_PRIORITY_FEE_PER_GAS = BigInt('10000000')
    console.log(block)
    const transaction = {
        data: calldata,
        to: SUSHI_NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS,
        value: value,
        from: wallet.address,
        maxFeePerGas: MAX_FEE_PER_GAS,
        maxPriorityFeePerGas: MAX_PRIORITY_FEE_PER_GAS,
    }
    const txRes = await wallet.sendTransaction(transaction)
    console.log('Transaction sent:', txRes.hash)
}

createLiquidityPosition()
