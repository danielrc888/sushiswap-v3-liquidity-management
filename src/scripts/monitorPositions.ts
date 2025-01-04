import { ethers } from 'ethers'
import { wallet, provider } from '../blockchain/connection'
import { SUSHI_NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS } from '../blockchain/commons'
import INONFUNGIBLE_POSITION_MANAGER from '@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json'
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json'
import { Token } from '@uniswap/sdk-core'
import { Pool, FeeAmount } from '@uniswap/v3-sdk'


async function fetchPrices() {
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

    const configuredPool = new Pool(
        tokenA,
        tokenB,
        fee,
        slot0.sqrtPriceX96.toString(),
        liquidity.toString(),
        Number(slot0.tick),
    )

    console.log("-------------------------------------------------")
    console.log("Pool Address:", poolAddress)
    console.log("Watched address:", wallet.address)
    console.log('Token 0 Price:', configuredPool.token0Price.toFixed(18)) 
    console.log('Token 1 Price:', configuredPool.token1Price.toFixed(18))
}

async function fetchPositions() {
    const nfpmContract = new ethers.Contract(
        SUSHI_NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS,
        INONFUNGIBLE_POSITION_MANAGER.abi,
        provider
    )
    const addressToMonitor = wallet.address
    const numPositions = await nfpmContract.balanceOf(addressToMonitor)
    console.log("-------------------------------------------------")
    console.log("Number of positions:", numPositions)

    const calls = []

    for (let i = 0; i < numPositions; i++) {
        calls.push(
            nfpmContract.tokenOfOwnerByIndex(addressToMonitor, i)
        )
    }
    const positionIds = await Promise.all(calls)

    const positionCalls = []

    for (let id of positionIds) {
        positionCalls.push(
            nfpmContract.positions(id)
        )
    }
    const callResponses = await Promise.all(positionCalls)
    callResponses.map((position, idx) => {
        console.log("-------------------------------------------------")
        console.log("Position Id:", positionIds[idx])
        console.log("Liquidity provided:", BigInt(position.liquidity))
        console.log("feeGrowthInside0LastX128:", BigInt(position.feeGrowthInside0LastX128))
        console.log("feeGrowthInside1LastX128:", BigInt(position.feeGrowthInside1LastX128))
        console.log("tokensOwed0:", BigInt(position.tokensOwed0))
        console.log("tokensOwed1:", BigInt(position.tokensOwed1))
    })
}

async function monitor() {
    await fetchPrices()
    await fetchPositions()    
}

monitor()
