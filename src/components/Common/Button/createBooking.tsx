import { Fragment, useState } from 'react'
import { BN } from '@project-serum/anchor'

import { Button, Col, InputNumber, Modal, Row, Space, Typography } from 'antd'
import {
  MintAmount,
  MintAvatar,
  MintSelection,
  MintSymbol,
  notifyError,
  notifySuccess,
} from '@sen-use/app'

import { easyCryptoProgram } from 'hooks/useEasyCrypto'
import { useOrderData } from 'hooks/useOrders'
import ExploreAddress from 'components/exploreAddress'
import moment from 'moment'
import { useAccountBalanceByMintAddress } from 'shared/hooks/useAccountBalance'
import OrderOffers from 'components/order/orderOffers'
import MintSymbolWrapper from '../Mint/MintSymbolWrapper'

const CreateBooking = ({ order }: { order: string }) => {
  const [open, setOpen] = useState(false)
  const [repayMint, setRepayMint] = useState(
    '2z6Ci38Cx6PyL3tFrT95vbEeB3izqpoLdxxBkJk2euyj',
  )
  const [loading, setLoading] = useState(false)
  const [amount, setAmount] = useState<number>(0)
  const [fee, setFee] = useState<number>(0)
  const orderData = useOrderData(order)
  const { balance } = useAccountBalanceByMintAddress(repayMint)

  const handleCreateBooking = async () => {
    try {
      setLoading(true)
      const methods = await easyCryptoProgram.initializeContract({
        amount: new BN(Number(amount) * 10 ** 9),
        fee: new BN(Number(fee) * 10 ** 9),
        order,
        repayMint,
      })
      const txId = await methods.rpc()
      notifySuccess('Create contract', txId)
      setOpen(false)
    } catch (error) {
      console.log('error', error)
      notifyError(error)
    } finally {
      setLoading(false)
    }
  }

  if (!orderData) return null
  return (
    <Fragment>
      <Button type="primary" onClick={() => setOpen(true)}>
        Create Offer
      </Button>
      <Modal
        title={'Create Loan Offer'}
        open={open}
        onCancel={() => setOpen(false)}
        width={800}
        footer={[
          <Button onClick={() => setOpen(false)}>Cancel</Button>,
          <Button
            type="primary"
            onClick={handleCreateBooking}
            loading={loading}
          >
            Create Offer
          </Button>,
        ]}
      >
        <Row gutter={[16, 24]}>
          <Col span={24}>
            <Typography.Title level={4}>Order Info</Typography.Title>
          </Col>
          <Col span={12}>
            <Typography.Text style={{ display: 'block' }}>
              <span style={{ fontWeight: 'bold' }}>Request ID:</span>{' '}
              <ExploreAddress address={order} />
            </Typography.Text>
          </Col>
          <Col span={12}>
            <Typography.Text style={{ display: 'block' }}>
              <span style={{ fontWeight: 'bold' }}>Requested by:</span>{' '}
              <ExploreAddress address={String(orderData.authority)} />
            </Typography.Text>
          </Col>
          <Col span={12}>
            <Typography.Text style={{ display: 'block' }}>
              <span style={{ fontWeight: 'bold' }}>Mint Amount:</span>{' '}
              <Space>
                <Typography.Text>
                  <MintAmount mintAddress={orderData.lockMint} amount={orderData.lockAmount} /> 
                </Typography.Text>
                <Typography.Text type="secondary">
                  <MintSymbolWrapper mintAddress={orderData.lockMint} isNft={orderData.isNft} />
                </Typography.Text>

                <MintAvatar mintAddress={orderData.lockMint} />
              </Space>
            </Typography.Text>
          </Col>

          <Col span={12}>
            <Typography.Text style={{ display: 'block' }}>
              <span style={{ fontWeight: 'bold' }}>Lock Time:</span>{' '}
              {moment(orderData.lockTime.toNumber() * 1000).toLocaleString()}
            </Typography.Text>
          </Col>

          <Col span={24}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Typography.Title level={4}>List Offers</Typography.Title>
              <OrderOffers orderAddress={order} />
            </Space>
          </Col>

          <Col span={24}>
            <Typography.Title level={4}>Create New Offer</Typography.Title>
            <MintSelection onChange={setRepayMint} value={repayMint} />
            Balance: {balance}
          </Col>
          <Col span={12}>
            <InputNumber
              size="large"
              style={{ width: '100%' }}
              min={0}
              placeholder="Repay amount"
              onChange={(value) => setAmount(value)}
            />
          </Col>
          <Col span={12}>
            <InputNumber
              size="large"
              style={{ width: '100%' }}
              min={0}
              placeholder="Fee"
              onChange={(value) => setFee(value)}
            />
          </Col>
        </Row>
      </Modal>
    </Fragment>
  )
}

export default CreateBooking
