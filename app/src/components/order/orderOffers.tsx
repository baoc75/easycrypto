import { MintAmount, MintAvatar, MintSymbol } from '@sen-use/app'
import { Col, Row, Space, Table, Typography } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import ContractStateTag from 'components/Common/ContractStateTag'
import MintSymbolWrapper from 'components/Common/Mint/MintSymbolWrapper'
import ExploreAddress from 'components/exploreAddress'
import { useContractFiltered } from 'hooks/useContracts'
import { ContractData } from 'model/contracts.controller'

export type WrapContractData = ContractData & { address: string }

const offerColumns: ColumnsType<WrapContractData> = [
  {
    title: 'Offered by',
    render: (data: WrapContractData) => (
      <ExploreAddress address={data.buyer.toBase58()} />
    ),
  },
  {
    title: 'Repay',
    render: (data: WrapContractData) => (
      <Space>
        <MintAvatar mintAddress={data.repayMint} />
        <MintAmount mintAddress={data.repayMint} amount={data.repayAmount} />
        <Typography.Text type="secondary">
          <MintSymbolWrapper mintAddress={data.repayMint} isNft={data.isNft} />
        </Typography.Text>
      </Space>
    ),
  },
  {
    title: 'Fee',
    render: (data: WrapContractData) => (
      <Space>
        <MintAvatar mintAddress={data.repayMint} />
        <MintAmount mintAddress={data.repayMint} amount={data.feeAmount} />
        <Typography.Text type="secondary">
          <MintSymbolWrapper mintAddress={data.repayMint} isNft={data.isNft} />
        </Typography.Text>
      </Space>
    ),
  },
  {
    title: 'Status',
    key: 'state',
    dataIndex: 'state',
    render: (_, { state }) => <ContractStateTag state={state} />,
  },
]

const OrderOffers = ({ orderAddress }: { orderAddress: string }) => {
  const contracts = useContractFiltered({ order: orderAddress })
  return (
    <Row>
      <Col span={24}>
        <Table
          columns={offerColumns}
          dataSource={contracts}
          rowKey={(e) => e.address}
        />
      </Col>
    </Row>
  )
}

export default OrderOffers
