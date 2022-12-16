import AppLayout from 'components/Common/AppLayout'
import StepTwoPage from 'components/CreateOrderPage/StepTwo'
import { useParams } from 'react-router-dom'

const OrderDetail = () => {
  let { txId } = useParams<{ txId: string }>()
  return (
    <AppLayout>
      <StepTwoPage txId={txId} />
    </AppLayout>
  )
}

export default OrderDetail
