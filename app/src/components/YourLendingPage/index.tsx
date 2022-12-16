import { MintAmount, MintAvatar } from '@sen-use/app'
import { useWalletAddress } from '@sentre/senhub'
import { PageHeader, Space, Table, Typography } from 'antd'
import type { ColumnsType, TableProps } from 'antd/es/table'
import CancelBookingButton from 'components/Common/Button/CancelBookingButton'
import RedeemContractButton from 'components/Common/Button/RedeemContractButton'
import ContractStateTag from 'components/Common/ContractStateTag'
import MintSymbolWrapper from 'components/Common/Mint/MintSymbolWrapper'
import { WrapContractData } from 'components/LoanOffersPage'
import OrderLockTime from 'components/order/orderLockTime'
import { useContractFiltered } from 'hooks/useContracts'

const columns: ColumnsType<WrapContractData> = [
  {
    title: 'Collateral',
    render: (data: WrapContractData) => (
      <Space>
        <MintAvatar mintAddress={data.lockMint} />
        <MintAmount mintAddress={data.lockMint} amount={data.lockAmount} />
        <MintSymbolWrapper mintAddress={data.lockMint} isNft={data.isNft} />
      </Space>
    ),
  },
  {
    title: 'Repay',
    render: (data: WrapContractData) => (
      <Space>
        <MintAvatar mintAddress={data.repayMint} />
        <MintAmount mintAddress={data.repayMint} amount={data.repayAmount} />
        <MintSymbolWrapper mintAddress={data.repayMint} isNft={data.isNft} />
      </Space>
    ),
  },
  {
    title: 'Fee',
    render: (data: WrapContractData) => (
      <Space>
        <MintAvatar mintAddress={data.lockMint} />
        <MintAmount mintAddress={data.repayMint} amount={data.feeAmount} />
        <MintSymbolWrapper mintAddress={data.repayMint} isNft={data.isNft} />
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
    key: 'state',
    dataIndex: 'state',
    render: (_, { state }) => <ContractStateTag state={state} />,
  },
  {
    title: 'Action',
    render: (data: WrapContractData) => (
      <Space size="middle">
        <CancelBookingButton contractAddress={data.address} />
        <RedeemContractButton type="primary" contractAddress={data.address} />
      </Space>
    ),
  },
]

export default function YourLendingPage() {
  const walletAddress = useWalletAddress()
  const contracts = useContractFiltered({ authority: walletAddress })

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
              My Offers
            </Typography.Title>
          }
        >
          <Table columns={columns} dataSource={contracts} />
        </PageHeader>
      </div>
    </div>
  )
}
