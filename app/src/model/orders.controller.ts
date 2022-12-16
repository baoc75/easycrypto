import { IdlAccounts } from '@project-serum/anchor'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { EasycryptoSdk } from 'hooks/useProgram'

/**
 * Store constructor
 */

export type OrderData = {
  [K in keyof IdlAccounts<EasycryptoSdk>['order']]: IdlAccounts<EasycryptoSdk>['order'][K] extends never
    ? OrderStatus
    : IdlAccounts<EasycryptoSdk>['order'][K]
}
export type OrderStatus = Record<'open' | 'approved' | 'done' | 'canceled', {}>

export type orderState = Record<string, OrderData>

const NAME = 'orders'
const initialState: orderState = {}

/**
 * Actions
 */

export const initOrders = createAsyncThunk(
  `${NAME}/initOrders
  `,
  async (bulk: orderState) => {
    return bulk
  },
)

export const upsetOrder = createAsyncThunk<
  orderState,
  { address: string; data: OrderData },
  { state: any }
>(`${NAME}/upsetOrder`, async ({ address, data }) => {
  return { [address]: data }
})

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    void builder
      .addCase(initOrders.fulfilled, (state, { payload }) => payload)
      .addCase(
        upsetOrder.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
