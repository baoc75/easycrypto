import { Steps } from 'antd'
import {
  DollarCircleOutlined,
  SolutionOutlined,
  SmileOutlined,
} from '@ant-design/icons'

const { Step } = Steps

export function OrderStep({ currentStep, isOwner = true }: { currentStep: number, isOwner?: boolean }) {
  return isOwner ? (
    <Steps current={currentStep} style={{ marginBottom: 24 }}>
      <Step title="Create request" icon={<SolutionOutlined />} />
      <Step title="Wait for offers" icon={<SmileOutlined />} />
      <Step title="Receive the loan" icon={<DollarCircleOutlined />} />
    </Steps>
  ) : (
    <Steps current={currentStep} style={{ marginBottom: 24 }}>
    <Step title="Create offer" icon={<SolutionOutlined />} />
    <Step title="Borrower accepts an offer" icon={<SmileOutlined />} />
    <Step title="Release the loan" icon={<DollarCircleOutlined />} />
  </Steps>
  )
}
