import { MintAmount, MintAvatar, MintName, MintSymbol } from '@sen-use/app'
import IonIcon from '@sentre/antd-ionicon'
import { useAppRoute, useWalletAddress } from '@sentre/senhub'
import { Button, PageHeader, Result, Space, Table, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import CancelOrderButton from 'components/Common/Button/CancelOrderButton'
import MintNameWrapper from 'components/Common/Mint/MintNameWrapper'
import MintSymbolWrapper from 'components/Common/Mint/MintSymbolWrapper'
import OrderStateTag from 'components/Common/OrderStateTag'
import ExploreAddress from 'components/exploreAddress'
import { WrapData } from 'components/LoanRequestsPage'
import OrderLockTime from 'components/order/orderLockTime'
import configs from 'configs'
import { useOrders } from 'hooks/useOrders'
import { ContractData } from 'model/contracts.controller'
import { useMemo } from 'react'
import { loanDetailPath } from 'shared/utils'

export type WrapContractData = ContractData & { address: string }

const {
  manifest: { appId },
} = configs

export default function LoanOffersPage() {
  const walletAddress = useWalletAddress()
  const orders = useOrders()
  const { to } = useAppRoute(appId)

  const filteredOrders = useMemo(() => {
    const data: WrapData[] = []
    for (const address in orders) {
      const orderData = orders[address]
      if (String(orderData.authority) === walletAddress)
        data.push({ address, ...orderData })
    }
    return data
  }, [orders, walletAddress])

  const columns: ColumnsType<WrapData> = [
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
          <Space>
            <CancelOrderButton orderAddress={data.address} />
            <Button
              type="primary"
              icon={<IonIcon name="open-outline" />}
              onClick={() => to(loanDetailPath(data.address))}
            >
              View Offers
            </Button>
          </Space>
        </Space>
      ),
    },
  ]

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
              My Loan Requests
            </Typography.Title>
          }
        >
          {filteredOrders.length === 0 && (
            <Result
              status="info"
              title="You don't have any loan requests yet."
              extra={
                <Button
                  type="primary"
                  key="console"
                  onClick={() => to('/loan')}
                >
                  Create A Loan Request
                </Button>
              }
            />
          )}
          {filteredOrders.length > 0 && (
            <Table
              columns={columns}
              dataSource={filteredOrders}
              rowKey={(e) => e.address}
            />
          )}
        </PageHeader>
      </div>
    </div>
  )
}
