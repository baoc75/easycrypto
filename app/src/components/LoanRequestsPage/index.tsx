import { MintAmount, MintAvatar } from '@sen-use/app'

import { PageHeader, Space, Table, Tag, Typography } from 'antd'
import type { ColumnsType, TableProps } from 'antd/es/table'
import ExploreAddress from 'components/exploreAddress'
import OrderLockTime from 'components/order/orderLockTime'

import CreateBooking from 'components/Common/Button/createBooking'

import { useOrders } from 'hooks/useOrders'
import { OrderData } from 'model/orders.controller'

import { useMemo } from 'react'
import { useWalletAddress } from '@sentre/senhub'
import MintSymbolWrapper from 'components/Common/Mint/MintSymbolWrapper'
import MintNameWrapper from 'components/Common/Mint/MintNameWrapper'
import OrderStateTag from 'components/Common/OrderStateTag'

export type WrapData = OrderData & { address: string }

export default function LoanRequestsPage() {
  const orders = useOrders()
  const walletAddress = useWalletAddress()

  const columns: ColumnsType<WrapData> = [
    {
      title: 'Borrower',
      render: (data: WrapData) => (
        <Space>
          <ExploreAddress address={data.authority.toBase58()} />
          {walletAddress === data.authority.toBase58() && (
            <Tag color="blue">owner</Tag>
          )}
        </Space>
      ),
    },
    {
      title: 'Collateral',
      render: (data: WrapData) => (
        <Space>
          <MintAvatar mintAddress={data.lockMint} />

          <MintNameWrapper mintAddress={data.lockMint} isNft={data.isNft} />
        </Space>
      ),
    },
    {
      title: 'Amount',
      render: (data: WrapData) => (
        <Space>
          <MintAmount mintAddress={data.lockMint} amount={data.lockAmount} />
          <Typography.Text type="secondary">
            <MintSymbolWrapper mintAddress={data.lockMint} isNft={data.isNft} />
          </Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Expires In',
      render: (data: WrapData) => {
        return <OrderLockTime orderAddress={data.address} />
      },
    },
    {
      title: 'Total Offers',
      render: (data: WrapData) => {
        return <span>{data.totalContracts.toNumber()}</span>
      },
    },
    {
      title: 'Status',
      render: (data: WrapData) => (
        <OrderStateTag state={data.state} />
      ),
    },
    {
      title: 'Action',
      render: (data: WrapData) => (
        <Space size="middle">
          <CreateBooking order={data.address} />
        </Space>
      ),
    },
  ]

  const data = useMemo(() => {
    let data: WrapData[] = []
    for (const address in orders) {
      const orderData = orders[address]
      if (orderData.state.open) {
        data.push({ address, ...orderData })
      }
    }
    return data
  }, [orders])

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
              Loan Requests
            </Typography.Title>
          }
        >
          <Table
            columns={columns}
            dataSource={data}
            rowKey={(e) => e.address}
          />
        </PageHeader>
      </div>
    </div>
  )
}
