import { useWalletAddress } from '@sentre/senhub'
import { Button, Col, Modal, Row, Space, Typography } from 'antd'
import { useContractData } from 'hooks/useContracts'
import { easyCryptoProgram } from 'hooks/useEasyCrypto'
import { useOrderData } from 'hooks/useOrders'
import { useState } from 'react'
import {
  MintAmount,
  MintAvatar,
  notifyError,
  notifySuccess,
} from '@sen-use/app'
import ExploreAddress from 'components/exploreAddress'
import moment from 'moment'
import { timeLeft } from 'shared/utils'
import MintSymbolWrapper from '../Mint/MintSymbolWrapper'

const ApproveBookingButton = ({
  contractAddress,
}: {
  contractAddress: string
}) => {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const contractData = useContractData(contractAddress)
  const orderData = useOrderData(contractData.order.toBase58())
  const walletAddress = useWalletAddress()

  const handleApprove = async () => {
    try {
      setLoading(true)
      const method = await easyCryptoProgram.approveContract({
        contract: contractAddress,
      })
      const txId = await method.rpc()
      notifySuccess('Create contract', txId)
    } catch (error) {
      notifyError(error)
    } finally {
      setLoading(false)
    }
  }

  if (
    contractData.seller.toBase58() !== walletAddress ||
    !contractData.state.initialized ||
    !orderData?.state.open
  )
    return null
  return (
    <>
    <Button type="primary" onClick={() => setOpen(true)} loading={loading}>
      Accept Offer
    </Button>
    <Modal
        title={'Do you want to accept this offer?'}
        open={open}
        onCancel={() => setOpen(false)}
        width={800}
        footer={[
          <Button onClick={() => setOpen(false)}>Close</Button>,
          <Button
            type="primary"
            onClick={handleApprove}
            loading={loading}
          >
            Accept
          </Button>,
        ]}
      >
        <Row gutter={[16, 24]}>
          <Col span={24}>
            <Typography.Title level={4}>Offer Info</Typography.Title>
          </Col>
          <Col span={12}>
            <Typography.Text style={{ display: 'block' }}>
              <span style={{ fontWeight: 'bold' }}>Contract ID:</span>{' '}
              <ExploreAddress address={contractAddress} />
            </Typography.Text>
          </Col>
          <Col span={12}>
            <Typography.Text style={{ display: 'block' }}>
              <span style={{ fontWeight: 'bold' }}>Borrower:</span>{' '}
              <ExploreAddress address={contractData.seller.toBase58()} />
            </Typography.Text>
          </Col>
          <Col span={12}>
            <Typography.Text style={{ display: 'block' }}>
              <span style={{ fontWeight: 'bold' }}>Mint Amount:</span>{' '}
              <Space>
                <Typography.Text>
                  <MintAmount mintAddress={contractData.lockMint} amount={contractData.lockAmount} />
                </Typography.Text>
                <Typography.Text type="secondary">
                  <MintSymbolWrapper mintAddress={contractData.lockMint} isNft={contractData.isNft} />
                </Typography.Text>

                <MintAvatar mintAddress={contractData.lockMint} />
              </Space>
            </Typography.Text>
          </Col>

          <Col span={24}>
            <Typography.Text style={{ display: 'block' }}>
              <span style={{ fontWeight: 'bold' }}>Lock Time:</span>{' '}
              {moment(contractData.lockTime.toNumber() * 1000).toLocaleString()}
              ({timeLeft(contractData.lockTime.toNumber() * 1000)})
            </Typography.Text>
          </Col>

          <Col span={12}>
            <Typography.Text style={{ display: 'block' }}>
              <span style={{ fontWeight: 'bold' }}>Lender:</span>{' '}
              <ExploreAddress address={contractData.buyer.toBase58()} />
            </Typography.Text>
          </Col>
          <Col span={12}>
            <Typography.Text style={{ display: 'block' }}>
              <span style={{ fontWeight: 'bold' }}>Repay Mint Amount:</span>{' '}
              <Space>
                <Typography.Text>
                  <MintAmount mintAddress={contractData.repayMint} amount={contractData.repayAmount} />
                </Typography.Text>
                <Typography.Text type="secondary">
                  <MintSymbolWrapper mintAddress={contractData.repayMint} isNft={contractData.isNft} />
                </Typography.Text>

                <MintAvatar mintAddress={contractData.repayMint} />
              </Space>
            </Typography.Text>
          </Col>

          <Col span={24}>
            <Typography.Text style={{ display: 'block' }}>
              <span style={{ fontWeight: 'bold' }}>Fee Amount:</span>{' '}
              <Space>
                <Typography.Text>
                  <MintAmount mintAddress={contractData.repayMint} amount={contractData.feeAmount} />
                </Typography.Text>
                <Typography.Text type="secondary">
                  <MintSymbolWrapper mintAddress={contractData.repayMint} isNft={contractData.isNft} />
                </Typography.Text>

                <MintAvatar mintAddress={contractData.repayMint} />
              </Space>
            </Typography.Text>
          </Col>
        </Row>
      </Modal>
    </>
  )
}

export default ApproveBookingButton
