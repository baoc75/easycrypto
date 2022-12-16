import { useAppRoute } from '@sentre/senhub'
import { Button, Col, Row, Space, Typography } from 'antd'
import configs from 'configs'
import Logo from './Logo'
import SolanaLogo from 'static/images/landing/solana-logo.svg'

const {
  manifest: { appId },
} = configs

const footerColumns = [
  {
    title: 'For lenders',
    items: [
      {
        title: 'Browse loan requests',
        url: '/loan-requests',
      },
      {
        title: 'My Offers',
        url: '/my-lending',
      },
    ],
  },
  {
    title: 'For borrowers',
    items: [
      {
        title: 'Create a loan request',
        url: '/loan',
      },
      {
        title: 'My loan requests',
        url: '/my-loan',
      },
      {
        title: 'Repay loan',
        url: '/repay-loan',
      },
    ],
  },
]

export default function AppFooter() {
  const { to } = useAppRoute(appId)
  return (
    <div>
      <Row className="footer">
        <Col span={6}>
          <Logo style={{height: 50}} />
        </Col>
        {footerColumns.map((column, index) => (
          <Col span={6} key={index}>
            <h3>{column.title}</h3>
            <ul>
              {column.items.map((item, index) => (
                <li key={index}>
                  <Button
                    style={{ paddingLeft: 0 }}
                    size="small"
                    type="link"
                    onClick={() => to(item.url)}
                  >
                    {item.title}
                  </Button>
                </li>
              ))}
            </ul>
          </Col>
        ))}
        <Col span={6}>
          <h3>Powered by</h3>
          <Space size={'middle'}>
            <img
              src={SolanaLogo}
              alt="Solana Blockchain"
              style={{ height: 32 }}
            />
            <Typography.Text style={{ color: '#101010' }} type="secondary">
              Solana Blockchain
            </Typography.Text>
          </Space>
          <h3 style={{ marginTop: 24 }}>See you at Vietnam Web3 Coding Camp</h3>
        </Col>
        <hr />
        <Col span={24} style={{ marginTop: 64 }}>
          <Typography.Text type="secondary">
            © 2022 EasyCrypto. All rights reserved.
          </Typography.Text>
        </Col>
      </Row>
    </div>
  )
}
