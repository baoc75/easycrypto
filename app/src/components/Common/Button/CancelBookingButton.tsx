import { Fragment, useState } from 'react'

import { Button, Col, Modal, Row, Space, Typography } from 'antd'
import {
  MintAmount,
  MintAvatar,
  MintSymbol,
  notifyError,
  notifySuccess,
} from '@sen-use/app'

import ExploreAddress from 'components/exploreAddress'
import moment from 'moment'
import { useContractData } from 'hooks/useContracts'
import { timeLeft } from 'shared/utils'
import { useWalletAddress } from '@sentre/senhub'
import { easyCryptoProgram } from 'hooks/useEasyCrypto'
import MintSymbolWrapper from '../Mint/MintSymbolWrapper'

const CancelBookingButton = ({
  contractAddress,
  type,
}: {
  contractAddress: string
  type?: 'link' | 'text' | 'ghost' | 'default' | 'primary' | 'dashed'
}) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const contractData = useContractData(contractAddress)
  const walletAddress = useWalletAddress()

  const handleCancelBooking = async () => {
    try {
      setLoading(true)
      const method = await easyCryptoProgram.cancelContract({
        contract: contractAddress,
      })
      const txId = await method.rpc()
      notifySuccess('Create offer', txId)
      setOpen(false)
    } catch (error) {
      notifyError(error)
    } finally {
      setLoading(false)
    }
  }

  if (
    !contractData ||
    contractData.authority.toBase58() !== walletAddress ||
    !contractData.state.initialized
  )
    return null

  return (
    <Fragment>
      <Button type={type} onClick={() => setOpen(true)}>
        Cancel Offer
      </Button>
      <Modal
        title={'Do you want to cancel this offer?'}
        open={open}
        onCancel={() => setOpen(false)}
        width={800}
        footer={[
          <Button onClick={() => setOpen(false)}>Close</Button>,
          <Button
            type="primary"
            onClick={handleCancelBooking}
            loading={loading}
          >
            Cancel
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
    </Fragment>
  )
}

export default CancelBookingButton
