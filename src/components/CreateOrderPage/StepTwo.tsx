import { Button, Col, Result, Row, Space, Table, Typography } from 'antd'

import gradient from 'static/images/gradient2.svg'
import { useContracts } from 'hooks/useContracts'
import { useMemo } from 'react'
import { WrapContractData } from 'components/LoanOffersPage'
import { OrderStep } from './OrderStep'
import ExploreAddress from 'components/exploreAddress'
import { ColumnsType } from 'antd/es/table'
import ContractStateTag from 'components/Common/ContractStateTag'
import { useOrderData } from 'hooks/useOrders'
import { MintAmount, MintAvatar, MintName, MintSymbol } from '@sen-use/app'
import { useAppRoute, useWalletAddress } from '@sentre/senhub'
import moment from 'moment'
import CreateBooking from 'components/Common/Button/createBooking'
import configs from 'configs'
import ApproveBookingButton from 'components/Common/Button/ApproveBookingButton'
import RepayButton from 'components/Common/Button/RepayButton'
import MintNameWrapper from 'components/Common/Mint/MintNameWrapper'
import MintSymbolWrapper from 'components/Common/Mint/MintSymbolWrapper'
import CancelOrderButton from 'components/Common/Button/CancelOrderButton'

const {
  manifest: { appId },
} = configs

const StepTwoPage = ({ txId }: { txId: string }) => {
  const contracts = useContracts()
  const order = useOrderData(txId)
  const walletAddress = useWalletAddress()
  const isOwner = String(order?.authority) === walletAddress
  const { to } = useAppRoute(appId)

  let offerColumns: ColumnsType<WrapContractData> = [
    {
      title: 'Offered by',
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      // sortDirections: ['descend'],
      render: (data: WrapContractData) => (
        <ExploreAddress address={data.buyer.toBase58()} />
      ),
    },
    {
      title: 'Repay Mint',
      render: (data: WrapContractData) => (
        <MintAvatar mintAddress={data.repayMint} />
      ),
    },
    {
      title: 'Repay Amount',
      render: (data: WrapContractData) => (
        <Space>
          <MintAmount mintAddress={data.repayMint} amount={data.repayAmount} />
          <MintNameWrapper mintAddress={data.repayMint} />
        </Space>
      ),
    },
    {
      title: 'Fee Amount',
      render: (data: WrapContractData) => (
        <Space>
          <MintAmount mintAddress={data.repayMint} amount={data.feeAmount} />
          <MintNameWrapper mintAddress={data.repayMint} />
        </Space>
      ),
    },
    {
      title: 'Status',
      render: (data: WrapContractData) => (
        <ContractStateTag state={data.state} />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (data: WrapContractData) => (
        <Space size="middle">
          <ApproveBookingButton contractAddress={data.address} />
          <RepayButton contractAddress={data.address} />
        </Space>
      ),
    },
  ]

  const filteredContract = useMemo(() => {
    const data: WrapContractData[] = []
    for (const address in contracts) {
      const contractData = contracts[address]
      if (String(contractData.order) === txId) {
        data.push({ address, ...contractData })
      }
    }
    return data
  }, [contracts, txId])
  if (!order)
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button onClick={() => to('/')} type="primary">
            Back Home
          </Button>
        }
      />
    )
  return (
    <div style={{ background: 'rgba(248,250,252,1)', paddingTop: 128 }}>
      <img
        src={gradient}
        alt="Background"
        style={{ position: 'absolute', bottom: 0, left: 400 }}
      />
      <div className="easycrypto-container">
        <OrderStep currentStep={1} isOwner={isOwner} />
        <Row gutter={16}>
          <Col
            className="gutter-row"
            span={24}
            style={{
              padding: 32,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography.Title style={{ marginBottom: 24 }}>
              {isOwner
                ? 'Waiting for loan offers'
                : 'Waiting for borrower to accept loan offer'}
            </Typography.Title>
            <Typography.Paragraph
              style={{ maxWidth: 448, marginBottom: 24, textAlign: 'center' }}
            >
              {isOwner
                ? `Your loan request has been created. Now you need to wait for a
              loan offer from a lender. You can check the status of your request
              in the "Borrow > Loan offers" section.`
                : 'You need to wait for the borrower to accept your offer. You can check the status of your offer in the "Lend > Loan offers" section.'}
            </Typography.Paragraph>
          </Col>
          <Col
            span={24}
            style={{
              paddingBottom: 32,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography.Text style={{ display: 'block' }}>
              <span style={{ fontWeight: 'bold' }}>Loan Request ID: </span>
              <ExploreAddress address={txId} />
            </Typography.Text>
            <Typography.Text style={{ display: 'block' }}>
              <span style={{ fontWeight: 'bold' }}>Requested by:</span>{' '}
              <ExploreAddress address={String(order.authority)} />
            </Typography.Text>
            <Typography.Text style={{ display: 'block' }}>
              <span style={{ fontWeight: 'bold' }}>Mint Amount:</span>{' '}
              <Space>
                <Typography.Text>
                  <MintAmount mintAddress={order.lockMint} amount={order.lockAmount} />
                </Typography.Text>
                <Typography.Text type="secondary">
                  <MintSymbolWrapper mintAddress={order.lockMint} isNft={order.isNft} />
                </Typography.Text>

                <MintAvatar mintAddress={order.lockMint} />
              </Space>
            </Typography.Text>
            <Typography.Text style={{ display: 'block' }}>
              <span style={{ fontWeight: 'bold' }}>Lock Time:</span>{' '}
              {moment(order.lockTime.toNumber() * 1000).toLocaleString()}
            </Typography.Text>
          </Col>
          <Col
            span={24}
            style={{
              paddingBottom: 32,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {isOwner ? (
              <Space>
                <CancelOrderButton orderAddress={txId} />
              </Space>
            ) : (
              <Space>
                <CreateBooking order={txId} />
              </Space>
            )}
          </Col>
          <Col
            className="gutter-row"
            span={24}
            style={{
              paddingBottom: 32,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Table
              columns={offerColumns}
              dataSource={filteredContract}
              style={{ minWidth: 720 }}
            />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default StepTwoPage
