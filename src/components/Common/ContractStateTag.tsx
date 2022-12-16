import { Tag } from 'antd'
import { ContractState } from 'model/contracts.controller'

export default function ContractStateTag({ state }: { state: ContractState }) {
  if (state?.approved) return <Tag color="green">Approved</Tag>
  if (state?.rejected) return <Tag color="red">Rejected</Tag>
  if (state?.initialized) return <Tag color="orange">Initialized</Tag>
  if (state?.uninitialized) return <Tag color="red">Uninitialized</Tag>
  if (state?.canceled) return <Tag color="red">Canceled</Tag>

  if (state?.paid) return <Tag color="gold">Paid</Tag>
  if (state?.claimed) return <Tag color="purple">Claimed</Tag>

  return <Tag color="red">Unknown</Tag>
}
