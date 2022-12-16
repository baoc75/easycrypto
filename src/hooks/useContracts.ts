import { ContractData } from 'model/contracts.controller'
import { Address } from '@project-serum/anchor'
import { useSelector } from 'react-redux'
import { AppState } from 'model'
import { useMemo } from 'react'

export const useContracts = () => {
  const contracts = useSelector((state: AppState) => state.contracts)
  return contracts
}

export const useContractData = (address: Address) => {
  const contractData = useSelector(
    (state: AppState) => state.contracts[address.toString()],
  )
  return contractData
}

export const useContractFiltered = ({
  order,
  buyer,
  seller,
  authority,
}: {
  order?: string
  buyer?: string
  seller?: string
  authority?: string
}) => {
  const contracts = useSelector((state: AppState) => state.contracts)

  const data: (ContractData & { address: string })[] = useMemo(() => {
    const results: (ContractData & { address: string })[] = []
    for (const address in contracts) {
      const contract = contracts[address]
      if (order && contract.order.toBase58() !== order) continue
      if (buyer && contract.buyer.toBase58() !== buyer) continue
      if (seller && contract.seller.toBase58() !== seller) continue
      if (authority && contract.authority.toBase58() !== authority) continue

      results.push({ address, ...contract })
    }
    return results
  }, [authority, buyer, contracts, order, seller])
  return data
}
