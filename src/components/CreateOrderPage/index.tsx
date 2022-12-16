import {
  Button,
  Col,
  DatePicker,
  DatePickerProps,
  InputNumber,
  Row,
  Typography,
} from 'antd'
import { SetStateAction, useState } from 'react'
import { BN } from '@project-serum/anchor'

import { MintSelection, notifyError, notifySuccess } from '@sen-use/app'
import { useAccountBalanceByMintAddress } from 'shared/hooks/useAccountBalance'

import { easyCryptoProgram } from 'hooks/useEasyCrypto'

import gradient from 'static/images/gradient2.svg'
import { RangePickerProps } from 'antd/lib/date-picker'
import { OrderStep } from './OrderStep'
import configs from 'configs'
import { useAppRoute } from '@sentre/senhub'
import { isMintNft } from 'shared/utils'
import { PublicKey } from '@solana/web3.js'

const {
  manifest: { appId },
} = configs

const CreateOrderPage = () => {
  const [lockMint, setLockMint] = useState('')
  const [lockAmount, setLockAmount] = useState<number>(0)
  const [lockTime, setLockTime] = useState<number>(0)
  const [isNft, setIsNft] = useState(false)
  const [loading, setLoading] = useState(false)
  const { to } = useAppRoute(appId)

  const { balance } = useAccountBalanceByMintAddress(lockMint)

  const handleCreateOrder = async () => {
    try {
      setLoading(true)
      const { order, method } = await easyCryptoProgram.initializeOrder({
        lockMint,
        amount: isNft ? new BN(1) : new BN(Number(lockAmount) * 10 ** 9),
        lockTime: new BN(lockTime),
        isNft,
      })

      const txId = await method.rpc()
      notifySuccess('Create order', txId)
      to('/loan/' + order.publicKey.toBase58())
    } catch (error) {
      notifyError(error)
    } finally {
      setLoading(false)
    }
  }

  const handleMintChange = async (value: string) => {
    setLockMint(value)
    const checkNft = await isMintNft(new PublicKey(value))
    setIsNft(checkNft)
  }

  const onOkTime = (
    value: DatePickerProps['value'] | RangePickerProps['value'],
  ) => {
    setLockTime(Number(value?.valueOf()) / 1000)
  }

  return (
    <div style={{ background: 'rgba(248,250,252,1)', paddingTop: 128 }}>
      <img
        src={gradient}
        alt="Background"
        style={{ position: 'absolute', bottom: 0, left: 400, zIndex: 0 }}
      />
      <div className="easycrypto-container">
        <OrderStep currentStep={0} />
        <Row gutter={16}>
          <Col
            className="gutter-row"
            span={24}
            style={{
              padding: 32,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography.Title style={{ marginBottom: 24 }}>
              Create a loan request
            </Typography.Title>
            <Typography.Paragraph
              style={{ maxWidth: 448, marginBottom: 24, textAlign: 'center' }}
            >
              Borrow cryptocurrency with no surprise liquidation. Secured by
              smart contract and run on Solana blockchain.
            </Typography.Paragraph>
            <Row gutter={[16, 24]} style={{ maxWidth: 448 }}>
              <Col span={24}>
                <MintSelection onChange={handleMintChange} value={lockMint} />
                Balance: {balance}
              </Col>
              {!isNft && (
                <Col span={24}>
                  <InputNumber
                    size="large"
                    style={{ width: '100%' }}
                    min={0}
                    placeholder="Collateral amount"
                    onChange={(value) => setLockAmount(value)}
                  />
                </Col>
              )}
              <Col span={24}>
                <DatePicker
                  style={{ width: '100%' }}
                  showTime
                  placeholder="Loan expiration date"
                  size="large"
                  format="MMMM Do YYYY, h:mm:ss a"
                  onOk={onOkTime}
                />
              </Col>
              <Col span={24}>
                <Button
                  size={'large'}
                  style={{ width: '100%' }}
                  onClick={handleCreateOrder}
                  type="primary"
                  loading={loading}
                >
                  Create request
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default CreateOrderPage
