import { OrderData } from 'model/orders.controller'
import { Address } from '@project-serum/anchor'
import { useSelector } from 'react-redux'
import { AppState } from 'model'

export const useOrders = () => {
  const orders = useSelector((state: AppState) => state.orders)
  return orders
}

export const useOrderData = (address: Address): OrderData | undefined => {
  const orderData = useSelector(
    (state: AppState) => state.orders[address.toString()],
  )
  return orderData
}
