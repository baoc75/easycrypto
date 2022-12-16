import React, { useState } from 'react'
import {
  HomeOutlined,
  UpSquareOutlined,
  DownSquareOutlined,
  DollarCircleOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import configs from 'configs'
import { useAppRoute } from '@sentre/senhub'
import Logo from './Logo'
import { useLocation } from 'react-router-dom'

const {
  manifest: { appId },
} = configs

const items: MenuProps['items'] = [
  {
    label: 'Home',
    key: 'home',
  },
  {
    label: 'Lend',
    key: 'lend',
    children: [
      {
        label: 'Loan Requests',
        key: 'loan-requests',
      },
      {
        label: 'My Offers',
        key: 'my-lending',
      },
    ],
  },
  {
    label: 'Borrow',
    key: 'borrow',
    children: [
      {
        label: 'My Loan Requests',
        key: 'my-loan',
      },
      {
        label: 'Repay',
        key: 'repay-loan',
      },
    ],
  },
  {
    label: 'Borrow now',
    key: 'loan',
    icon: <DollarCircleOutlined />,
  },
]

export default function Navigation() {
  const { to, root } = useAppRoute(appId)
  const location = useLocation()
  // root: /app/easycrypto
  // location.pathname: /app/easycrypto/loan
  const [current, setCurrent] = useState(
    location.pathname.replace(root, '').replace('/', ''),
  )

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key)
    to('/' + e.key)
  }
  return (
    <div style={{ display: 'flex', paddingLeft: 20, paddingRight: 20 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Logo style={{ cursor: 'pointer', height: 25 }} onClick={() => to('/')} />
      </div>
      <Menu
        style={{ background: '#fff', borderBottom: 'none', width: '100%' }}
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </div>
  )
}
