import { Buffer } from 'buffer'
import { utils } from 'ethers'
import { effect, signal } from "@preact/signals"
import { Core } from '@walletconnect/core'

// Fucking wallet connect hugeness - would like to nerf all this from the bundle one day
import SignClient from '@walletconnect/sign-client'
import { WalletConnectModal } from '@walletconnect/modal'

// @ts-ignore
let ethereum = window.ethereum as any

import jazzicon from 'jazzicon'
import { Component, Fragment } from 'preact';
import register from 'preact-custom-element'
import { useRef, useEffect } from 'preact/hooks'

class XIcon extends Component {
  // Register as <x-greeting>:
  static tagName = 'x-icon';

  // Track these attributes:
  static observedAttributes = ['name'];

  render(props) {
    let { wallet, size } = props
    
    const div = useRef(null);
    
    const icon = jazzicon(
      parseInt(size || '32', 10),
      parseInt(wallet.slice(2, 10), 16)
    ) as HTMLDivElement

    icon.style.borderRadius = '0'
    icon.style.clipPath = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'

    useEffect(() => {
      div.current.appendChild(icon)
    });
    
    let href = `/u/${wallet}`

    return <a href={href} class='x-icon' ref={div} />
  }
}

register(XIcon);

const credentials = 'include'

const method = async (e: Event) => {
  e.preventDefault()

  // @ts-ignore
  let url = e.target.href
  
  await fetch(url, { method: 'delete', credentials })

  location.reload()
}

class XMeta extends Component {
  // Register as <x-greeting>:
  static tagName = 'x-meta';

  // Track these attributes:
  static observedAttributes = ['name'];

  render(props) {
    let { url, moderator, author } = props

    let actions = []

    if (account.value == moderator || account.value == author) {
      actions.push(<a onClick={method} href={url}>Delete</a>)
    }

    return <small class='x-meta'>{props.children} {actions}</small>
  }
}

register(XMeta);

const ACCOUNT_KEY = 'account'

async function fetchAccount () {
  if (localStorage.getItem(ACCOUNT_KEY)) {
    try {
      return localStorage.getItem(ACCOUNT_KEY)
    } catch (e) {
      localStorage.removeItem(ACCOUNT_KEY)
    }
  }

  return false
}

let signClient
let walletConnectModal
let session

window.global = window

async function initWalletConnect () {
  let projectId = '57a44dd49a2cb498967d87490efc6336'

  try {
    signClient = await SignClient.init({
      projectId,
      metadata: {
        name: 'Yo Folk',
        description: 'Simple social network with ethereum identities',
        url: 'https://www.yofolk.com',
        icons: ['https://www.yofolk.com/logo.png']
      }
    })

    signClient.on("session_proposal", (event) => {
      console.log("session_proposal", event)
    })

    signClient.on('session_event', ({ event }) => {
      console.log('session_event', event)
      // Handle session events, such as "chainChanged", "accountsChanged", etc.
    })
    
    signClient.on('session_update', ({ topic, params }) => {
      console.log('session_update', topic, params)

      const { namespaces } = params
      const _session = signClient.session.get(topic)
      // Overwrite the `namespaces` of the existing session with the incoming one.
      const updatedSession = { ..._session, namespaces }
      // Integrate the updated session state into your dapp state.
      onSessionUpdate(updatedSession)
    })
    
    signClient.on('session_delete', () => {
      console.log('session_delete')
      // Session was deleted -> reset the dapp state, clean up from user session, etc.
    })
    
    walletConnectModal = new WalletConnectModal({
      projectId,
      // `standaloneChains` can also be specified when calling `walletConnectModal.openModal(...)` later on.
      // standaloneChains: ['eip155:1']
    })
    
    
    const { uri, approval } = await signClient.connect({
      // Provide the namespaces and chains (e.g. `eip155` for EVM-based chains) we want to use in this session.
      requiredNamespaces: {
        eip155: {
          methods: [
            // 'eth_sendTransaction',
            // 'eth_signTransaction',
            // 'eth_sign',
            'personal_sign',
            // 'requestAccounts',
            // 'eth_requestAccounts',
            // 'eth_signTypedData'
          ],
          chains: ['eip155:1'],
          events: ['chainChanged', 'accountsChanged']
        }
      }
    })
  
    // Open QRCode modal if a URI was returned (i.e. we're not connecting an existing pairing).
    if (uri) {
      walletConnectModal.openModal({ uri })
      // Await session approval from the wallet.
      session = await approval()
      // Handle the returned session (e.g. update UI to "connected" state).
      // * You will need to create this function *
      onSessionConnect(session)
      // Close the QRCode modal in case it was open.
      walletConnectModal.closeModal()
    }
  } catch (e) {
    console.error(e)
  }
}

let accounts = signal([])
let sessionConnected = false

function onSessionConnect (args) {
  sessionConnected = true

  console.log('onSessionConnect', args)

  accounts.value = args.namespaces.eip155.accounts.map(a => a.replace('eip155:1:', ''))
}

function hasAccount () {
  return new Promise((resolve, reject) => {
    function test () {
      console.log(accounts.peek())
     
      if (accounts.peek().length > 0) {
        resolve(accounts.peek())
      } else {
        setTimeout(test, 100)
      }
    }

    test()
  })
}

function onSessionUpdate (args) {
  console.log('onSessionUpdate', args)
}

async function connect () {
  if (ethereum) {
    try {
      accounts.value = await ethRequest({ method: 'eth_requestAccounts' })
    } catch (e) {

      if (e.code === 4001) {
        // EIP-1193 userRejectedRequest error
        console.log('Please connect to MetaMask.');
      } else {
        console.error(e);
      }
    }
  } else {
    await initWalletConnect()
  }
}

const COOKIE_KEY = 'yofolk-auth'

async function hasCookie () {
  if (await document.cookie.match(COOKIE_KEY)) {
    try {
      return true
    }catch (e) {
      document.cookie = `${COOKIE_KEY}=;expires=Thu, 01 Jan 1970 00:00:01 GMT`
    }
  }

  return false
}

const account = signal(undefined);

async function initSession () {
  if (await hasCookie() && await fetchAccount()) {
    account.value = await fetchAccount()
  }
}

// Fetch wallet!
initSession()

function toggleClass (value) {
  let body = document.querySelector('body')

  if (!body) {
    return
  }

  if (value) {
    body.classList.add('signed-in')
  } else {
    body.classList.remove('signed-in')
  }
}

window.addEventListener("load", (event) => {
  toggleClass(account.value)
})

effect(() => {
  toggleClass(account.value)
})

const SignOut = () => {
  function signout () {
    document.cookie = `${COOKIE_KEY}=;expires=Thu, 01 Jan 1970 00:00:01 GMT`
    localStorage.removeItem(ACCOUNT_KEY)
    account.value = undefined
    accounts = undefined
    location.reload()
  }

  return <button onClick={signout}>Sign out</button>
}

const SignedIn = (props: { wallet: string }) => {
  let href = `/u/${props.wallet}`

  return <Fragment><span>Signed in as <a href={href}>{props.wallet}</a></span> <SignOut /></Fragment>
}

async function ethRequest(request) {
  let r

  if (ethereum) {
    r = await ethereum.request(request)
  } else if (signClient && session) {
    r = await signClient.request({
      topic: session.topic,
      chainId: 'eip155:1',
      request
    })
  } else {
    console.error('Cannot do ethRequest')
  }

  return r
}

class XSignIn extends Component<any, any> {
  // Register as <x-greeting>:
  static tagName = 'x-sign-in';

  // Track these attributes:
  static observedAttributes = ['name'];

  onClick = async () => {
    await connect()
    await hasAccount()

    const domain = window.location.host;
    const from = accounts.value[0]
    const nonce = Math.floor(0xFFFFFF * Math.random())
    const date = new Date().toISOString()
    const siweMessage = `I accept the YoFolk Terms of Service.\n\nURI: https://${domain}\nVersion: 1\nChain ID: 1\nNonce: ${nonce}\nIssued At: ${date}`;
    const msg = `0x${Buffer.from(siweMessage, 'utf8').toString('hex')}`;
   
    const sig = await ethRequest({
      method: 'personal_sign',
      params: [msg, from],
    });

    // 26 weeks
    const expiry = new Date(Date.now() + (26 * 7 * 24 * 60 * 60 * 1000))

    let cookie = JSON.stringify({ msg: siweMessage, from, sig })
    document.cookie = `${COOKIE_KEY}=${cookie};expires=${expiry.toUTCString()}`

    account.value = from
    localStorage.setItem(ACCOUNT_KEY, account.value)
  }
  
  render(props) {
    if (account.value) {
      return <SignedIn wallet={account.value} />
    }
   
    let { value } = props
    
    return (
      <div>
        {this.state.error}
        <button onClick={this.onClick} class='x-signin'>{value || 'Sign in'}</button>
      </div>
    )
  }
}

register(XSignIn);

/*

customElements.define(
  "folk-balance",
  class extends HTMLElement {
    constructor() {
      super();

      this.wallet = this.innerText;

      this.innerHTML = `<div class='loadingspinner'></div>`;
      this.getBalance();
    }

    async getBalance() {
      await isLoaded("tokenContract");

      let value = await tokenContract.methods.balanceOf(this.wallet).call();
      this.innerText = `${folkize(value)}`;
    }
  }
);

function folkize(wei) {
  // fml lol
  return parseFloat(
    Web3.utils.fromWei(web3.utils.toBN(wei.toString()))
  ).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

customElements.define(
  "folk-allowance",
  class extends HTMLElement {
    constructor() {
      super();

      this.wallet = this.innerText;

      this.loading();
      this.getBalance();
    }

    loading() {
      this.innerHTML = `<div class='loadingspinner'></div>`;
    }

    async getBalance() {
      await isLoaded("tokenContract");

      let value = await tokenContract.methods
        .allowance(this.wallet, TIPPING_CONTRACT)
        .call();

      this.innerHTML = `<a href='javascript:void(0)'>${folkize(value)}</a>`;
      clearListeners(this);
      this.addEventListener("click", () => this.setAllowance());
    }

    async setAllowance() {
      let value = prompt(
        "💪 Enter an allowance (in $FOLK) to authorize yourself to spend.\n\n(This will not spend your $FOLK, it authorises yofolk so you can click the tip button)"
      );

      if (!value) {
        return;
      }

      this.loading();

      await isLoaded("tokenContract");
      await hasPermission();
      await tokenContract.methods
        .approve(TIPPING_CONTRACT, Web3.utils.toWei(value))
        .send({ from: localStorage.getItem("account") });

      await this.getBalance();
    }
  }
);

customElements.define(
  "badge-count",
  class extends HTMLElement {
    constructor() {
      super();

      this.load(this.innerText);
    }

    async load(uuid) {
      this.loading();
      await isLoaded("web3");
      await isLoaded("badgeContract");

      this.account = this.getAttribute("account");
      this.token = parseInt(this.getAttribute("token"));
      this.getBalance();
    }

    loading() {
      this.innerHTML = `<div class='loadingspinner'></div>`;
    }

    async getBalance() {
      let value = await badgeContract.methods
        .balanceOf(this.account, this.token)
        .call();

      this.innerText = value;
    }
  }
);

/*

customElements.define(
  "post-value",
  class extends HTMLElement {
    constructor() {
      super();

      this.load(this.innerText);
    }

    async load(uuid) {
      this.loading();
      await isLoaded("web3");
      await isLoaded("tippingContract");

      this.hexUuid = web3.utils.bytesToHex(uuidParse(uuid));
      this.author = this.getAttribute("author");
      this.getBalance();
    }

    loading() {
      this.innerHTML = `<div class='loadingspinner'></div>`;
    }

    async getBalance() {
      let value = await tippingContract.methods
        .getPostValue(this.hexUuid)
        .call();

      if (folkize(value) === "0.00") {
        this.innerText = `Tip`;
      } else {
        this.innerText = `${folkize(value)}`;
      }

      clearListeners(this.parentNode);
      this.parentNode.addEventListener("click", () => this.tip());
    }

    async tip() {
      let balance = BigInt(
        await tokenContract.methods
          .balanceOf(localStorage.getItem("account"))
          .call()
      );

      if (balance === 0) {
        alert(
          "👽 You must construct additional pylons.\n\n(Go to your account page and click $FOLK to get some $FOLK to tip with)"
        );
        this.getBalance();
        return;
      }

      let value = prompt(
        "🍳 Enter an amount (in $FOLK) to tip.\n\n(Maybe something like 1 or 2)"
      );

      if (!value) {
        return;
      }

      value = BigInt(parseFloat(value) * 1000) * BigInt(10) ** BigInt(15);

      this.loading();

      let allowance = BigInt(
        await tokenContract.methods
          .allowance(localStorage.getItem("account"), TIPPING_CONTRACT)
          .call()
      );

      console.log({ allowance, balance, value });

      if (value > balance) {
        alert(
          `🤑 Dollar dollar bills y'all.\n\n(You don't have enough $FOLK to tip this much)`
        );
        this.getBalance();
        return;
      }

      if (value > allowance) {
        alert(
          `🙅‍♂️ Insufficient allowance.\n\n(Go to your account page and click ${folkize(
            allowance
          )} to authorize us to spend your $FOLK)`
        );
        this.getBalance();
        return;
      }

      await hasPermission();

      // This waits 15 seconds before syncing, so you have time to sign the txn
      fetch("/tips/sync");

      await tippingContract.methods.tip(this.hexUuid, this.author, value).send({
        from: localStorage.getItem("account"),

        // magic voodoo: https://stackoverflow.com/questions/68926306/avoid-this-gas-fee-has-been-suggested-by-message-in-metamask-using-web3
        gasLimit: "420690",
        maxPriorityFeePerGas: null,
        maxFeePerGas: null,
      });

      this.getBalance();

      setTimeout(() => {
        // Metamask jankiness
        this.getBalance();
      }, 2000);
    }
  }
);

async function portFetch(url) {
  let r = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "7e9e46a0-a923-4eaf-9a4a-4208df62d2ba",
    },
  });
  return await r.json();
}

*/