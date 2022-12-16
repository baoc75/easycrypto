import { useAppRoute, useWalletAddress } from "@sentre/senhub/dist"
import { Alert, Button } from "antd"
import configs from "configs"
import { useContractFiltered } from "hooks/useContracts"


const {
    manifest: { appId },
  } = configs

export default function RepayLoanAlert() {
    const { to } = useAppRoute(appId)
    const walletAddress = useWalletAddress()
    let contracts = useContractFiltered({ seller: walletAddress })
    contracts = contracts.filter((contract) => contract.state.approved)
    const expireContracts = contracts.findIndex((contract) => {
        const now = new Date()
        const lockTime = new Date(contract.lockTime.toNumber() * 1000)
        const diff = now.getTime() - lockTime.getTime()
        const diffDays = Math.ceil(diff / (1000 * 3600 * 24))
        return diffDays <= 3
      })
    if (expireContracts > -1) 
        return <Alert
        type="warning"
        message="You have a loan that will expire in 3 days. Please repay it before it expires."
        banner
        action={
          <Button size="small" onClick={() => to('/repay-loan')} type="primary">
            Repay
          </Button>
        }
      />
    return null
}