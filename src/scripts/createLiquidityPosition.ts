import { wallet, provider } from "../blockchain/connection";
import { SUSHI_NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS } from "../blockchain/commons";
import { MintOptions, NonfungiblePositionManager } from "@uniswap/v3-sdk";
import { BigintIsh, Percent } from "@uniswap/sdk-core";
import { buildPool, buildPositionFromPool } from "./commons";

async function createLiquidityPosition() {
  const configuredPool = await buildPool();

  // The maximum token amounts we want to provide. BigIntish accepts number, string or JSBI
  const amount0: BigintIsh = "55000000000000000000";
  const amount1: BigintIsh = "77000000000000000000";
  const position = buildPositionFromPool(configuredPool, amount0, amount1);
  console.log(position);

  const mintOptions: MintOptions = {
    recipient: wallet.address,
    deadline: Math.floor(Date.now() / 1000) + 60 * 20,
    slippageTolerance: new Percent(50, 10_000),
  };

  const { calldata, value } = NonfungiblePositionManager.addCallParameters(
    position,
    mintOptions,
  );

  console.log(calldata, value);

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

createLiquidityPosition();
