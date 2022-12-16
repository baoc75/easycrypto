import { useState } from 'react'
import { util } from '@sentre/senhub'
import CopyToClipboard from 'react-copy-to-clipboard'

import { Button, Space, Tooltip, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

type ExploreAddressProps = { address: string }
const ExploreAddress = ({ address }: ExploreAddressProps) => {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    setCopied(true)
    await util.asyncWait(500)
    setCopied(false)
  }

  return (
    <Space size={4}>
      {/* Shorten address */}
      <Typography.Text type="secondary">
        {util.shortenAddress(address)}
      </Typography.Text>
      {/* Copy address */}
      <Tooltip title="Copied" open={copied}>
        <CopyToClipboard text={address}>
          <Button
            style={{
              width: 'auto',
              height: 'auto',
              padding: 0,
              background: 'transparent',
            }}
            type="text"
            icon={<IonIcon name="copy-outline" />}
            onClick={onCopy}
          />
        </CopyToClipboard>
      </Tooltip>
      {/* Explore address */}
      <Button
        style={{
          width: 'auto',
          height: 'auto',
          padding: 0,
          background: 'transparent',
        }}
        type="text"
        icon={<IonIcon name="open-outline" />}
        onClick={() => window.open(util.explorer(address), '_blank')}
      />
    </Space>
  )
}

export default ExploreAddress
