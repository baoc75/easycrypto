import { Provider } from 'react-redux'
import { AntdProvider, useAppRoute, useSetBackground } from '@sentre/senhub'

import model from 'model'
import configs from 'configs'
import './app.css'
import './static/styles/light.less'
import './static/styles/dark.less'
import { Route, Switch } from 'react-router-dom'
import EasyCrypto from './pages/easyCrypto'
import ContractWatcher from 'watcher/contract.watcher'
import OrderWatcher from 'watcher/order.watcher'
import Home from 'pages'
import CreateOrder from 'pages/createOrder'
import LoanRequests from 'pages/loan-requests'
import LoanOffers from 'pages/loan-offers'
import YourLoan from 'pages/your-loan'
import YourLending from 'pages/your-lending'
import OrderDetail from 'pages/orderDetail'
import { useEffect } from 'react'

const {
  manifest: { appId },
} = configs

export const Page = () => {
  const { extend } = useAppRoute(appId)

  const setBackground = useSetBackground()

  useEffect(() => {
    setBackground({ dark: 'rgb(248, 250, 252)', light: 'rgb(248, 250, 252)' })
  }, [setBackground])

  return (
    <AntdProvider appId={appId} prefixCls={appId}>
      <Provider store={model}>
        <ContractWatcher />
        <OrderWatcher />
        <Switch>
          <Route path={`${extend('/loan/')}:txId`}>
            <OrderDetail />
          </Route>
          <Route path={extend('/loan')}>
            <CreateOrder />
          </Route>
          <Route path={extend('/loan-requests')}>
            <LoanRequests />
          </Route>
          <Route path={extend('/my-loan')}>
            <LoanOffers />
          </Route>
          <Route path={extend('/repay-loan')}>
            <YourLoan />
          </Route>
          <Route path={extend('/my-lending')}>
            <YourLending />
          </Route>
          <Route path={extend('/easy-crypto')}>
            <EasyCrypto />
          </Route>
          <Route path={extend('/')}>
            <Home />
          </Route>
        </Switch>
      </Provider>
    </AntdProvider>
  )
}

export * from 'static.app'
