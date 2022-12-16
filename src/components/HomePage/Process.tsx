import { Col, Row, Steps, Typography } from 'antd'
import {
  DollarCircleOutlined,
  SolutionOutlined,
  SmileOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
import step1 from 'static/images/landing/step-1.jpg'
import step2 from 'static/images/landing/step-2.jpg'
import step3 from 'static/images/landing/step-3.jpg'

const { Step } = Steps
export default function Process() {
  const [current, setCurrent] = useState(0)
  return (
    <div
      style={{
        background: 'rgba(248,250,252,1)',
        paddingTop: 96,
        paddingBottom: 96,
      }}
    >
      <div className="easycrypto-container">
        <Row gutter={64}>
          <Col span={12} style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
            <Typography.Title level={2} style={{marginBottom: 24}}>
              How It Works
            </Typography.Title>
            <Steps className="how-it-works" onChange={(value) => setCurrent(value)} current={current} style={{ marginBottom: 24, height: 300 }} direction="vertical">
              <Step title="Create request" description="Define your loan terms, which include mint and amount of mint and loan duration." icon={<SolutionOutlined />} />
              <Step title="Wait for offers" description="Your request will be sent to our vibrant community of lenders where their will propose their loan offer." icon={<SmileOutlined />} />
              <Step title="Receive the loan" description="Once you accept any offers, you will immediately receive your loan." icon={<DollarCircleOutlined />} />
            </Steps>
          </Col>
          <Col span={12} style={{minHeight: 512}}>
            <img style={{borderRadius: 16}} src={current === 0 ? step1 : current === 1 ? step2 : step3} alt="step" />
          </Col>
        </Row>
      </div>
    </div>
  )
}
