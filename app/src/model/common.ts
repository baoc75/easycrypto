import { ContractState } from './contracts.controller'

export interface ContractData {
  key: React.Key
  buyer: string
  lockMint: string
  lockAmount: number
  lockTime: string
  repayMint: string
  repayAmount: number
  feeAmount: number
  state: ContractState
}

export enum OrderState {
  Uninitialized,
  Open,
  Appoved,
  Done,
  Canceled,
}
