import { MintAmount, MintAvatar, MintName } from '@sen-use/app'
import { useWalletAddress } from '@sentre/senhub'
import { Alert, Button, PageHeader, Space, Table, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import RepayButton from 'components/Common/Button/RepayButton'
import ContractStateTag from 'components/Common/ContractStateTag'
import MintNameWrapper from 'components/Common/Mint/MintNameWrapper'
import ExploreAddress from 'components/exploreAddress'
import { WrapContractData } from 'components/LoanOffersPage'
import OrderLockTime from 'components/order/orderLockTime'
import { useContractFiltered } from 'hooks/useContracts'

const columns: ColumnsType<WrapContractData> = [
  {
    title: 'Lender',
    render: (data: WrapContractData) => (
      <ExploreAddress address={data.buyer.toBase58()} />
    ),
  },
  {
    title: 'Collateral',
    render: (data: WrapContractData) => (
      <Space>
        <MintAvatar mintAddress={data.lockMint} />
        <MintAmount mintAddress={data.lockMint} amount={data.lockAmount} />
        <MintNameWrapper mintAddress={data.lockMint} isNft={data.isNft} />
      </Space>
    ),
  },
  {
    title: 'Repay',
    render: (data: WrapContractData) => (
      <Space>
        <MintAvatar mintAddress={data.repayMint} />
        <MintAmount mintAddress={data.repayMint} amount={data.repayAmount} />
        <MintNameWrapper mintAddress={data.repayMint} />
      </Space>
    ),
  },
  {
    title: 'Fee',
    render: (data: WrapContractData) => (
      <Space>
        <MintAmount mintAddress={data.repayMint} amount={data.feeAmount} />
        <MintNameWrapper mintAddress={data.repayMint} />
      </Space>
    ),
  },
  {
    title: 'Expires In',
    render: (data: WrapContractData) => {
      return <OrderLockTime orderAddress={data.order.toBase58()} />
    },
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
    render: (data: WrapContractData) =>
      data.state.approved && (
        <Space size="middle">
          <RepayButton type="primary" contractAddress={data.address} />
        </Space>
      ),
  },
]

export default function YourLoanPage() {
  const walletAddress = useWalletAddress()
  let contracts = useContractFiltered({ seller: walletAddress })
  contracts = contracts.filter((contract) => contract.state.approved)
  // get list of contracts that have now - lockTime <= 3 days
  const expireContracts = contracts.find((contract) => {
    const now = new Date()
    const lockTime = new Date(contract.lockTime.toNumber() * 1000)
    const diff = now.getTime() - lockTime.getTime()
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24))
    return diffDays <= 3
  })


  return (
    <div
      style={{
        background: 'rgba(248,250,252,1)',
        paddingTop: 64,
        paddingBottom: 64,
      }}
    >
      <div className="easycrypto-container">
        <PageHeader
          title={
            <Typography.Title style={{ marginBottom: 24 }}>
              Repay Loan
            </Typography.Title>
          }
        >
          <Table columns={columns} dataSource={contracts} />
        </PageHeader>
      </div>
    </div>
  )
}
