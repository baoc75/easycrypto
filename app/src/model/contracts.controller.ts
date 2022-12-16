import { IdlAccounts } from '@project-serum/anchor'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { EasycryptoSdk } from 'hooks/useProgram'

/**
 * Store constructor
 */

export type ContractData = {
  [K in keyof IdlAccounts<EasycryptoSdk>['contract']]: IdlAccounts<EasycryptoSdk>['contract'][K] extends never
    ? ContractState
    : IdlAccounts<EasycryptoSdk>['contract'][K]
}

export type ContractState = Record<
  | 'initialized'
  | 'uninitialized'
  | 'approved'
  | 'rejected'
  | 'canceled'
  | 'paid'
  | 'claimed',
  {}
>

export type contractState = Record<string, ContractData>

const NAME = 'contracts'
const initialState: contractState = {}

/**
 * Actions
 */

export const initContracts = createAsyncThunk(
  `${NAME}/initContracts
  `,
  async (bulk: contractState) => {
    return bulk
  },
)

export const upsetContract = createAsyncThunk<
  contractState,
  { address: string; data: ContractData },
  { state: any }
>(`${NAME}/upsetContract`, async ({ address, data }) => {
  return { [address]: data }
})

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    void builder
      .addCase(initContracts.fulfilled, (state, { payload }) => payload)
      .addCase(
        upsetContract.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
