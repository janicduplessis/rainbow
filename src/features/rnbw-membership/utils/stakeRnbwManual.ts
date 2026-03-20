import { type Signer } from '@ethersproject/abstract-signer';
import { type StaticJsonRpcProvider } from '@ethersproject/providers';
import { erc20Abi, encodeFunctionData, type Address, type Hash } from 'viem';
import { loadWallet } from '@/model/wallet';
import { STAKING_CONTRACT_ADDRESS, STAKING_ABI, RNBW_TOKEN_ADDRESS } from '../constants';
import { checkNeedsApproval } from './checkNeedsApproval';

export async function stakeRnbwManual({
  address,
  provider,
  stakeAmountRaw,
}: {
  address: Address;
  provider: StaticJsonRpcProvider;
  stakeAmountRaw: string;
}): Promise<Hash> {
  const wallet = await loadWallet({ address, provider });
  if (!wallet) {
    throw new Error('Failed to load wallet');
  }

  return executeSequentialStake({ address, wallet, provider, stakeAmountRaw });
}

async function executeSequentialStake({
  address,
  wallet,
  provider,
  stakeAmountRaw,
}: {
  address: Address;
  wallet: Signer;
  provider: StaticJsonRpcProvider;
  stakeAmountRaw: string;
}): Promise<Hash> {
  const needsApproval = await checkNeedsApproval({ address, provider, stakeAmountRaw });
  if (needsApproval) {
    const approveTx = await wallet.sendTransaction({
      to: RNBW_TOKEN_ADDRESS,
      data: encodeFunctionData({ abi: erc20Abi, functionName: 'approve', args: [STAKING_CONTRACT_ADDRESS, BigInt(stakeAmountRaw)] }),
    });
    await approveTx.wait();
  }

  const data = encodeFunctionData({ abi: STAKING_ABI, functionName: 'stake', args: [BigInt(stakeAmountRaw)] });
  const gasEstimate = await provider.estimateGas({ to: STAKING_CONTRACT_ADDRESS, data, from: address });
  const tx = await wallet.sendTransaction({
    to: STAKING_CONTRACT_ADDRESS,
    data,
    gasLimit: gasEstimate,
  });
  await tx.wait();

  return tx.hash as Hash;
}
