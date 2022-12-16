import { Fragment, useState } from 'react'

import { Button, Col, Modal, Row, Space, Typography } from 'antd'
import {
  MintAmount,
  MintAvatar,
  notifyError,
  notifySuccess,
} from '@sen-use/app'

import ExploreAddress from 'components/exploreAddress'
import moment from 'moment'
import { timeLeft } from 'shared/utils'
import { useWalletAddress } from '@sentre/senhub'
import { useOrderData } from 'hooks/useOrders'
import OrderOffers from 'components/order/orderOffers'
import { easyCryptoProgram } from 'hooks/useEasyCrypto'
import MintSymbolWrapper from '../Mint/MintSymbolWrapper'

const CancelOrderButton = ({
  orderAddress,
  type,
}: {
  orderAddress: string
  type?: 'link' | 'text' | 'ghost' | 'default' | 'primary' | 'dashed'
}) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const orderData = useOrderData(orderAddress)
  const walletAddress = useWalletAddress()

  const handleCancelOrder = async () => {
    try {
      setLoading(true)
      const method = await easyCryptoProgram.cancelOrder({
        order: orderAddress,
      })
      const txId = await method.rpc()
      notifySuccess('Create order', txId)
      setOpen(false)
    } catch (error) {
      notifyError(error)
    } finally {
      setLoading(false)
    }
  }

  if (
    !orderData ||
    orderData.authority.toBase58() !== walletAddress ||
    !orderData.state.open
  )
    return null
  return (
    <Fragment>
      <Button type={type} onClick={() => setOpen(true)}>
        Cancel Request
      </Button>
      <Modal
        title={'Do you want to cancel this request?'}
        open={open}
        onCancel={() => setOpen(false)}
        width={800}
        footer={[
          <Button onClick={() => setOpen(false)}>Close</Button>,
          <Button type="primary" onClick={handleCancelOrder} loading={loading}>
            Cancel
          </Button>,
        ]}
      >
        <Row gutter={[16, 24]}>
          <Col span={24}>
            <Typography.Title level={4}>Loan Request Info</Typography.Title>
          </Col>
          <Col span={12}>
            <Typography.Text style={{ display: 'block' }}>
              <span style={{ fontWeight: 'bold' }}>Request ID:</span>{' '}
              <ExploreAddress address={orderAddress} />
            </Typography.Text>
          </Col>
          <Col span={12}>
            <Typography.Text style={{ display: 'block' }}>
              <span style={{ fontWeight: 'bold' }}>Borrower:</span>{' '}
              <ExploreAddress address={orderData.authority.toBase58()} />
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

          <Col span={24}>
            <Typography.Text style={{ display: 'block' }}>
              <span style={{ fontWeight: 'bold' }}>Lock Time:</span>{' '}
              {moment(orderData.lockTime.toNumber() * 1000).toLocaleString()}(
              {timeLeft(orderData.lockTime.toNumber() * 1000)})
            </Typography.Text>
          </Col>

          <Col span={24}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Typography.Title level={4}>List Offers</Typography.Title>
              <OrderOffers orderAddress={orderAddress} />
            </Space>
          </Col>
        </Row>
      </Modal>
    </Fragment>
  )
}

export default CancelOrderButton
