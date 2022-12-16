import { useAppRoute } from '@sentre/senhub'
import { Button, Col, Row, Space, Typography } from 'antd'
import configs from 'configs'
import { useContracts } from 'hooks/useContracts'
import { useOrders } from 'hooks/useOrders'
import HeroImage from './HeroImage'

const {
  manifest: { appId },
} = configs

export default function Cover() {
  const { to } = useAppRoute(appId)
  return (
    <div style={{ background: '#e3ecfbff' }}>
      <div className="easycrypto-container">
        <Row gutter={14}>
          <Col
            className="gutter-row"
            span={10}
            style={{
              padding: 32,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography.Title style={{ marginBottom: 24 }}>
              P2P Pawm Marketplace for
              <br />
              Crypto Assets
            </Typography.Title>
            <Typography.Paragraph style={{ maxWidth: 448, marginBottom: 24 }}>
              Create loan offer with your own terms or borrow with no surprise
              liquidation. Secured by smart contract and run on Solana
              blockchain.
            </Typography.Paragraph>
            <div>
              <Button type="primary" size="large" onClick={() => to('/loan')}>
                Create A Loan Request
              </Button>
              <Button
                size="large"
                style={{ marginLeft: 16 }}
                onClick={() => to('/loan-requests')}
              >
                Browse Loan Requests
              </Button>
            </div>
            <Space style={{marginTop: 48}}>
              <div style={{display: "flex", flexDirection: "column", alignItems: "center", marginRight: 48}}>
                <Typography.Title level={4}>100+</Typography.Title>
                <Typography.Text>Loan Requests</Typography.Text>
              </div>
              <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Typography.Title level={4}>300+</Typography.Title>
                <Typography.Text>Loan Offers</Typography.Text>
              </div>
            </Space>
          </Col>
          <Col className="gutter-row" span={10}>
            <HeroImage />
          </Col>
        </Row>
      </div>
    </div>
  )
}
