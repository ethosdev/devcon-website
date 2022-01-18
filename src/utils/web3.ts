import { VerificationToken } from 'src/types/VerificationToken'
import Web3Modal from 'web3modal'
import { APP_CONFIG } from './config'

declare var window: any
const isBrowser = typeof window !== 'undefined'

export function getWeb3ProviderOptions() {
  let providerOptions: any = {}

  if (isBrowser && window.WalletConnectProvider === 'undefined') {
    console.log('WalletConnect is undefined. Make sure to add it via CDN.')
  }
  if (isBrowser && typeof window.WalletConnectProvider !== 'undefined') {
    providerOptions.walletconnect = {
      package: window.WalletConnectProvider.default,
      options: {
        infuraId: APP_CONFIG.INFURA_ID,
      },
    }
  }

  if (isBrowser && window.Torus === 'undefined') {
    console.log('Torus is undefined. Make sure to add it via CDN.')
  }
  if (isBrowser && window.Torus !== undefined) {
    providerOptions.torus = {
      package: window.Torus,
    }
  }

  return providerOptions
}

export function getWeb3Modal(): Web3Modal | undefined {
  const providerOptions = getWeb3ProviderOptions()

  if (isBrowser) {
    return new Web3Modal({
      network: 'mainnet',
      cacheProvider: false,
      providerOptions,
    })
  }
}

export function getSiweMessage(address: string, token: VerificationToken): string {
  return `devcon.org wants you to sign in with your Ethereum account:
    ${address}
    
    Sign this message to prove you have access to this wallet. This won't cost you anything.
    
    URI: https://devcon.org/
    Version: 1
    Nonce: ${token.nonce}
    Issued At: ${token.issued}
    Expiration Time: ${token.expires}
    Chain ID: 1`
}
