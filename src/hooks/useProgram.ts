import { useMemo } from 'react'
import { Program, web3 } from '@project-serum/anchor'
import { getAnchorProvider } from '@sentre/senhub'

export const useProgram = () => {
  const program = useMemo(() => {
    return new Program(
      IDL,
      'H4mRYtWnvQkQgbM9iw4TxGZxeqfHMKCCdc2eehbCua1f',
      getAnchorProvider(),
    )
  }, [])
  return program
}

export const PROGRAMS = {
  rent: web3.SYSVAR_RENT_PUBKEY,
  systemProgram: web3.SystemProgram.programId,
}
export type EasycryptoSdk = {
  version: '0.1.0'
  name: 'easycrypto_sdk'
  instructions: [
    {
      name: 'initializeOrder'
      accounts: [
        {
          name: 'authority'
          isMut: true
          isSigner: true
        },
        {
          name: 'order'
          isMut: true
          isSigner: true
        },
        {
          name: 'lockMint'
          isMut: true
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'rent'
          isMut: false
          isSigner: false
        },
      ]
      args: [
        {
          name: 'lockAmount'
          type: 'u64'
        },
        {
          name: 'lockTime'
          type: 'i64'
        },
        {
          name: 'isNft'
          type: 'bool'
        },
      ]
    },
    {
      name: 'initializeContract'
      accounts: [
        {
          name: 'authority'
          isMut: true
          isSigner: true
        },
        {
          name: 'lockMint'
          isMut: true
          isSigner: false
        },
        {
          name: 'repayMint'
          isMut: true
          isSigner: false
        },
        {
          name: 'order'
          isMut: true
          isSigner: false
        },
        {
          name: 'contract'
          isMut: true
          isSigner: true
        },
        {
          name: 'treasurer'
          isMut: false
          isSigner: false
        },
        {
          name: 'repayTreasury'
          isMut: true
          isSigner: false
        },
        {
          name: 'repayTokenAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'associatedTokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'rent'
          isMut: false
          isSigner: false
        },
      ]
      args: [
        {
          name: 'amount'
          type: 'u64'
        },
        {
          name: 'feeAmount'
          type: 'u64'
        },
      ]
    },
    {
      name: 'approveContract'
      accounts: [
        {
          name: 'authority'
          isMut: true
          isSigner: true
        },
        {
          name: 'lockMint'
          isMut: true
          isSigner: false
        },
        {
          name: 'repayMint'
          isMut: true
          isSigner: false
        },
        {
          name: 'order'
          isMut: true
          isSigner: false
        },
        {
          name: 'contract'
          isMut: true
          isSigner: false
        },
        {
          name: 'treasurer'
          isMut: false
          isSigner: false
        },
        {
          name: 'repayTreasury'
          isMut: true
          isSigner: false
        },
        {
          name: 'repayTokenAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'lockTreasury'
          isMut: true
          isSigner: false
        },
        {
          name: 'lockTokenAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'associatedTokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'rent'
          isMut: false
          isSigner: false
        },
      ]
      args: []
    },
    {
      name: 'repayContract'
      accounts: [
        {
          name: 'authority'
          isMut: true
          isSigner: true
        },
        {
          name: 'lockMint'
          isMut: true
          isSigner: false
        },
        {
          name: 'repayMint'
          isMut: true
          isSigner: false
        },
        {
          name: 'order'
          isMut: true
          isSigner: false
        },
        {
          name: 'contract'
          isMut: true
          isSigner: false
        },
        {
          name: 'treasurer'
          isMut: false
          isSigner: false
        },
        {
          name: 'repayTreasury'
          isMut: true
          isSigner: false
        },
        {
          name: 'repayTokenAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'lockTreasury'
          isMut: true
          isSigner: false
        },
        {
          name: 'lockTokenAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'associatedTokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'rent'
          isMut: false
          isSigner: false
        },
      ]
      args: []
    },
    {
      name: 'cancelContract'
      accounts: [
        {
          name: 'authority'
          isMut: true
          isSigner: true
        },
        {
          name: 'repayMint'
          isMut: true
          isSigner: false
        },
        {
          name: 'contract'
          isMut: true
          isSigner: false
        },
        {
          name: 'treasurer'
          isMut: false
          isSigner: false
        },
        {
          name: 'repayTreasury'
          isMut: true
          isSigner: false
        },
        {
          name: 'repayTokenAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'associatedTokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'rent'
          isMut: false
          isSigner: false
        },
      ]
      args: []
    },
    {
      name: 'cancelOrder'
      accounts: [
        {
          name: 'authority'
          isMut: true
          isSigner: true
        },
        {
          name: 'order'
          isMut: true
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'rent'
          isMut: false
          isSigner: false
        },
      ]
      args: []
    },
    {
      name: 'claimContract'
      accounts: [
        {
          name: 'authority'
          isMut: true
          isSigner: true
        },
        {
          name: 'repayMint'
          isMut: true
          isSigner: false
        },
        {
          name: 'order'
          isMut: true
          isSigner: false
        },
        {
          name: 'contract'
          isMut: true
          isSigner: false
        },
        {
          name: 'treasurer'
          isMut: false
          isSigner: false
        },
        {
          name: 'repayTreasury'
          isMut: true
          isSigner: false
        },
        {
          name: 'repayTokenAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'associatedTokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'rent'
          isMut: false
          isSigner: false
        },
      ]
      args: []
    },
  ]
  accounts: [
    {
      name: 'contract'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'authority'
            type: 'publicKey'
          },
          {
            name: 'order'
            type: 'publicKey'
          },
          {
            name: 'buyer'
            type: 'publicKey'
          },
          {
            name: 'seller'
            type: 'publicKey'
          },
          {
            name: 'lockMint'
            type: 'publicKey'
          },
          {
            name: 'repayMint'
            type: 'publicKey'
          },
          {
            name: 'lockTime'
            type: 'i64'
          },
          {
            name: 'lockAmount'
            type: 'u64'
          },
          {
            name: 'repayAmount'
            type: 'u64'
          },
          {
            name: 'feeAmount'
            type: 'u64'
          },
          {
            name: 'state'
            type: {
              defined: 'ContractState'
            }
          },
          {
            name: 'isNft'
            type: 'bool'
          },
        ]
      }
    },
    {
      name: 'order'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'authority'
            type: 'publicKey'
          },
          {
            name: 'lockMint'
            type: 'publicKey'
          },
          {
            name: 'lockAmount'
            type: 'u64'
          },
          {
            name: 'totalContracts'
            type: 'u64'
          },
          {
            name: 'lockTime'
            type: 'i64'
          },
          {
            name: 'state'
            type: {
              defined: 'OrderState'
            }
          },
          {
            name: 'isNft'
            type: 'bool'
          },
        ]
      }
    },
  ]
  types: [
    {
      name: 'ContractState'
      type: {
        kind: 'enum'
        variants: [
          {
            name: 'Uninitialized'
          },
          {
            name: 'Initialized'
          },
          {
            name: 'Rejected'
          },
          {
            name: 'Canceled'
          },
          {
            name: 'Approved'
          },
          {
            name: 'Paid'
          },
          {
            name: 'Claimed'
          },
        ]
      }
    },
    {
      name: 'OrderState'
      type: {
        kind: 'enum'
        variants: [
          {
            name: 'Uninitialized'
          },
          {
            name: 'Open'
          },
          {
            name: 'Approved'
          },
          {
            name: 'Done'
          },
          {
            name: 'Canceled'
          },
        ]
      }
    },
  ]
  errors: [
    {
      code: 6000
      name: 'Overflow'
      msg: 'Operation overflowed'
    },
    {
      code: 6001
      name: 'InvalidPermission'
      msg: 'Not have permission!'
    },
    {
      code: 6002
      name: 'InvalidCurrentDate'
      msg: "Can't get current date"
    },
    {
      code: 6003
      name: 'InvalidState'
      msg: 'Invalid state'
    },
  ]
}

export const IDL: EasycryptoSdk = {
  version: '0.1.0',
  name: 'easycrypto_sdk',
  instructions: [
    {
      name: 'initializeOrder',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'order',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'lockMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'lockAmount',
          type: 'u64',
        },
        {
          name: 'lockTime',
          type: 'i64',
        },
        {
          name: 'isNft',
          type: 'bool',
        },
      ],
    },
    {
      name: 'initializeContract',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'lockMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'repayMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'order',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'contract',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'treasurer',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'repayTreasury',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'repayTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'amount',
          type: 'u64',
        },
        {
          name: 'feeAmount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'approveContract',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'lockMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'repayMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'order',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'contract',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'treasurer',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'repayTreasury',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'repayTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'lockTreasury',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'lockTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'repayContract',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'lockMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'repayMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'order',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'contract',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'treasurer',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'repayTreasury',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'repayTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'lockTreasury',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'lockTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'cancelContract',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'repayMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'contract',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'treasurer',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'repayTreasury',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'repayTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'cancelOrder',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'order',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'claimContract',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'repayMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'order',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'contract',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'treasurer',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'repayTreasury',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'repayTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: 'contract',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'authority',
            type: 'publicKey',
          },
          {
            name: 'order',
            type: 'publicKey',
          },
          {
            name: 'buyer',
            type: 'publicKey',
          },
          {
            name: 'seller',
            type: 'publicKey',
          },
          {
            name: 'lockMint',
            type: 'publicKey',
          },
          {
            name: 'repayMint',
            type: 'publicKey',
          },
          {
            name: 'lockTime',
            type: 'i64',
          },
          {
            name: 'lockAmount',
            type: 'u64',
          },
          {
            name: 'repayAmount',
            type: 'u64',
          },
          {
            name: 'feeAmount',
            type: 'u64',
          },
          {
            name: 'state',
            type: {
              defined: 'ContractState',
            },
          },
          {
            name: 'isNft',
            type: 'bool',
          },
        ],
      },
    },
    {
      name: 'order',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'authority',
            type: 'publicKey',
          },
          {
            name: 'lockMint',
            type: 'publicKey',
          },
          {
            name: 'lockAmount',
            type: 'u64',
          },
          {
            name: 'totalContracts',
            type: 'u64',
          },
          {
            name: 'lockTime',
            type: 'i64',
          },
          {
            name: 'state',
            type: {
              defined: 'OrderState',
            },
          },
          {
            name: 'isNft',
            type: 'bool',
          },
        ],
      },
    },
  ],
  types: [
    {
      name: 'ContractState',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'Uninitialized',
          },
          {
            name: 'Initialized',
          },
          {
            name: 'Rejected',
          },
          {
            name: 'Canceled',
          },
          {
            name: 'Approved',
          },
          {
            name: 'Paid',
          },
          {
            name: 'Claimed',
          },
        ],
      },
    },
    {
      name: 'OrderState',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'Uninitialized',
          },
          {
            name: 'Open',
          },
          {
            name: 'Approved',
          },
          {
            name: 'Done',
          },
          {
            name: 'Canceled',
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'Overflow',
      msg: 'Operation overflowed',
    },
    {
      code: 6001,
      name: 'InvalidPermission',
      msg: 'Not have permission!',
    },
    {
      code: 6002,
      name: 'InvalidCurrentDate',
      msg: "Can't get current date",
    },
    {
      code: 6003,
      name: 'InvalidState',
      msg: 'Invalid state',
    },
  ],
}
