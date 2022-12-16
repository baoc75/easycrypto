import { Tag } from 'antd'
import { useOrderData } from 'hooks/useOrders'
import { timeLeft } from 'shared/utils'

const OrderLockTime = ({ orderAddress }: { orderAddress: string }) => {
  const order = useOrderData(orderAddress)

  const currentTime = new Date().getTime() / 1000
  if (!order) return <span>--</span>

  if (currentTime > order.lockTime.toNumber())
    return <Tag color="red">EXPIRED</Tag>

  return <span>{timeLeft(order.lockTime.toNumber() * 1000)}</span>
}

export default OrderLockTime
