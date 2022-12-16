import { Col, Row } from 'antd'
import React from 'react'
import CreateOrder from './createOrder'

const EasyCrypto = () => {
  return (
    <Row>
      <Col span={24}>
        <CreateOrder />
      </Col>
    </Row>
  )
}

export default EasyCrypto
