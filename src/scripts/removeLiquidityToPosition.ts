import { wallet, provider } from "../blockchain/connection";
import { BigintIsh, Percent, CurrencyAmount } from "@uniswap/sdk-core";
import { buildPool, buildPositionFromPool } from "./commons";
import {
  RemoveLiquidityOptions,
  NonfungiblePositionManager,
  CollectOptions,
} from "@uniswap/v3-sdk";
import { SUSHI_NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS } from "../blockchain/commons";

async function removeLiquidityToPostion() {
  const pool = await buildPool();
  const amount0: BigintIsh = "55000000000000000000";
  const amount1: BigintIsh = "77000000000000000000";

  const position = buildPositionFromPool(pool, amount0, amount1);
  console.log(position);

  const tokenId = 9; // This is the token id for the position

  const collectOptions: Omit<CollectOptions, "tokenId"> = {
    expectedCurrencyOwed0: CurrencyAmount.fromRawAmount(pool.token0, 0),
    expectedCurrencyOwed1: CurrencyAmount.fromRawAmount(pool.token1, 0),
    recipient: wallet.address,
  };

  const removeLiquidityOptions: RemoveLiquidityOptions = {
    deadline: Math.floor(Date.now() / 1000) + 60 * 20,
    slippageTolerance: new Percent(50, 10_000),
    tokenId,
    liquidityPercentage: new Percent(10, 10),
    collectOptions,
  };

  const { calldata, value } = NonfungiblePositionManager.removeCallParameters(
    position,
    removeLiquidityOptions,
  );
  const block = await provider.getBlock("latest");
  if (!block || !block.baseFeePerGas) {
    return;
  }

  const MAX_FEE_PER_GAS = BigInt(2) * block.baseFeePerGas;
  const MAX_PRIORITY_FEE_PER_GAS = BigInt("10000000");
  console.log(block);
  const transaction = {
    data: calldata,
    to: SUSHI_NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS,
    value: value,
    from: wallet.address,
    maxFeePerGas: MAX_FEE_PER_GAS,
    maxPriorityFeePerGas: MAX_PRIORITY_FEE_PER_GAS,
  };
  const txRes = await wallet.sendTransaction(transaction);
  console.log("Transaction sent:", txRes.hash);
}

removeLiquidityToPostion();
