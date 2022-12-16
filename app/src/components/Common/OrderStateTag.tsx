import { Tag } from 'antd'
import { OrderStatus } from 'model/orders.controller'

export default function OrderStateTag({ state }: { state: OrderStatus }) {
  if (state?.approved) return <Tag color="green">Approved</Tag>
  if (state?.canceled) return <Tag color="red">Cancelled</Tag>
  if (state?.done) return <Tag color="purple">Done</Tag>
  if (state?.open) return <Tag color="orange">Open</Tag>
  return <Tag color="red">Unknown</Tag>
}
