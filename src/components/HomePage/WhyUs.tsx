import { Col, Row, Tabs, Typography } from 'antd'
import liquidity from 'static/images/landing/liquidity.png'
import increase from 'static/images/landing/increase.png'
import bitcoin from 'static/images/landing/bitcoin.png'

export default function WhyUs() {
  return (
    <div
      style={{
        background: '#fff',
        paddingTop: 96,
        paddingBottom: 96,
      }}
    >
      <div className="easycrypto-container">
        <Typography.Title level={2} style={{ textAlign: 'center' }}>
          EasyCrypto - The trusted way to borrow and lend crypto assets
        </Typography.Title>
        <Tabs defaultActiveKey="1" className="feature-tab">
          <Tabs.TabPane tab="For Borrower" key="1">
            <Row gutter={24} style={{ marginTop: 64 }}>
              <Col span={8} className="gutter-row">
                <div className="feature-card">
                  <img
                    src={liquidity}
                    alt="No surprise liquidation"
                    style={{ marginBottom: 16, height: 75 }}
                  />
                  <Typography.Title level={3} className="feature-title">
                    No surprise liquidation
                  </Typography.Title>
                </div>
              </Col>
              <Col span={8} className="gutter-row">
                <div className="feature-card">
                  <img
                    src={increase}
                    alt="Attractive interest rates"
                    style={{ marginBottom: 16, height: 75 }}
                  />
                  <Typography.Title level={3} className="feature-title">
                    Attractive interest rates
                  </Typography.Title>
                </div>
              </Col>
              <Col span={8} className="gutter-row">
                <div className="feature-card">
                  <img
                    src={bitcoin}
                    alt="Support All Cryptocurrencies"
                    style={{ marginBottom: 16, height: 75 }}
                  />
                  <Typography.Title level={3} className="feature-title">
                    Support all cryptocurrencies & NFTs
                  </Typography.Title>
                </div>
              </Col>
            </Row>
          </Tabs.TabPane>
          <Tabs.TabPane tab="For Lender" key="2">
            <Row gutter={24} style={{ marginTop: 64 }}>
              <Col span={8} className="gutter-row">
                <div className="feature-card">
                  <img
                    src={liquidity}
                    alt="No surprise liquidation"
                    style={{ marginBottom: 16, height: 75 }}
                  />
                  <Typography.Title level={3} className="feature-title">
                    Huge demand of crypto loans
                  </Typography.Title>
                </div>
              </Col>
              <Col span={8} className="gutter-row">
                <div className="feature-card">
                  <img
                    src={increase}
                    alt="Define your own lending terms"
                    style={{ marginBottom: 16, height: 75 }}
                  />
                  <Typography.Title level={3} className="feature-title">
                    Define your own lending terms
                  </Typography.Title>
                </div>
              </Col>
              <Col span={8} className="gutter-row">
                <div className="feature-card">
                  <img
                    src={bitcoin}
                    alt="Support All Cryptocurrencies"
                    style={{ marginBottom: 16, height: 75 }}
                  />
                  <Typography.Title level={3} className="feature-title">
                  Support all cryptocurrencies & NFTs
                  </Typography.Title>
                </div>
              </Col>
            </Row>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  )
}
