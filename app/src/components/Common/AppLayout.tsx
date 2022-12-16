import { Layout } from 'antd'
import Navigation from './Navigation'
import AppFooter from './AppFooter'
import RepayLoanAlert from './RepayLoanBanner'
const { Header, Content, Footer } = Layout

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Layout className="layout" style={{background: "#fff"}}>
        <Header style={{background: "#fff", padding: 0, zIndex: 20}}>
          <Navigation />
        </Header>
        <Content>
          <RepayLoanAlert/>
          {children}
          </Content>
        <Footer style={{ background: '#fff' }}><AppFooter></AppFooter></Footer>
      </Layout>
    </>
  )
}
