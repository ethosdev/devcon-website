import { createContext, useContext } from 'react'
import { providers } from 'ethers'
import { UserAccount } from 'src/types/UserAccount'
import { SignedMessage } from 'src/types/SignedMessage'
import { Session } from 'src/types/Session'

export interface AccountContextType {
  loading: boolean
  provider: providers.Web3Provider | undefined
  account: UserAccount | undefined
  connectWeb3: () => Promise<providers.Web3Provider | undefined>
  signMessage: (message: string, provider?: providers.Web3Provider) => Promise<SignedMessage | undefined>
  getNonce: () => Promise<number | undefined>
  loginWeb3: (address: string, message: string, signature: string) => Promise<UserAccount | undefined>
  loginEmail: (email: string) => Promise<UserAccount | undefined>
  verifyEmail: (email: string, code: string) => Promise<boolean>
  logout: (id: string) => Promise<boolean>
  getAccount: () => Promise<UserAccount | undefined>
  updateAccount: (id: string, account: UserAccount) => Promise<boolean>
  deleteAccount: (id: string) => Promise<boolean>,
  setSpeakerFavorite: (speakerId: string, remove: boolean) => void,
  setSessionBookmark: (session: Session, interestLevel: 'attending' | 'interested', remove: boolean) => void, 
}

export const useAccountContext = () => useContext<AccountContextType>(AccountContext)
export const AccountContext = createContext<AccountContextType>({
  loading: false,
  provider: undefined,
  account: undefined,
  connectWeb3: async () => undefined,
  signMessage: async () => undefined,
  getNonce: async () => undefined,
  loginWeb3: async () => undefined,
  loginEmail: async () => undefined,
  verifyEmail: async () => false,
  logout: async () => false,
  getAccount: async () => undefined,
  updateAccount: async () => false,
  deleteAccount: async () => false,
  setSpeakerFavorite: () => {},
  setSessionBookmark: () => {},
})
