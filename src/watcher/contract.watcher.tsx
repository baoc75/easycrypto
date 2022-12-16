import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { web3 } from '@project-serum/anchor'

import Watcher from './watcher'

import { initContracts, upsetContract } from 'model/contracts.controller'
import { AppDispatch } from 'model'
import { useProgram } from 'hooks/useProgram'

// TODO: Config
const NAME = 'contract'
const FILTER: web3.GetProgramAccountsFilter[] = []

const ContractWatcher = () => {
  const dispatch = useDispatch<AppDispatch>()
  const program = useProgram()

  // TODO: init all account data
  const init = useCallback(
    (data: any) => dispatch(initContracts(data)),
    [dispatch],
  )
  // TODO: upset account data
  const upset = useCallback(
    (key: string, value: any) =>
      dispatch(upsetContract({ address: key, data: value })),
    [dispatch],
  )

  if (!program) return null
  return (
    <Watcher
      program={program}
      name={NAME}
      filter={FILTER}
      init={init}
      upset={upset}
    />
  )
}
export default ContractWatcher
