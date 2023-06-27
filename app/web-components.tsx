import { Buffer } from 'buffer'
import { utils } from 'ethers'
import { effect, signal } from "@preact/signals";

// @ts-ignore
let ethereum = window.ethereum as any

// @ts-ignore
let cookieStore = window.cookieStore as any

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
    
    return <div class='x-icon' ref={div} />
  }
}

register(XIcon);

let accounts: Array<string> | undefined
const ACCOUNT_KEY = 'accounts'

async function fetchStorage () {
  if (sessionStorage.getItem(ACCOUNT_KEY) && ethereum.isConnected) {
    try {
      accounts = JSON.parse(sessionStorage.getItem(ACCOUNT_KEY))
      return true
    } catch (e) {
      sessionStorage.removeItem(ACCOUNT_KEY)
    }
  }

  return false
}

async function connect () {
  await fetchStorage()

  if (accounts) {
    return
  }
 
  try {
    accounts = await ethereum.request({ method: 'eth_requestAccounts' })

    sessionStorage.setItem(ACCOUNT_KEY, JSON.stringify(accounts))
  } catch (e) {

    if (e.code === 4001) {
      // EIP-1193 userRejectedRequest error
      console.log('Please connect to MetaMask.');
    } else {
      console.error(e);
    }
  }
}

const COOKIE_KEY = 'yofolk-auth'

async function hasCookie () {
  if (await cookieStore.get(COOKIE_KEY)) {
    try {
      return true
    }catch (e) {
      cookieStore.delete(COOKIE_KEY)
    }
  }

  return false
}

const account = signal(undefined);

async function initSession () {
  if (ethereum && await hasCookie() && await fetchStorage()) {
    account.value = accounts[0]
  }
}

// Fetch wallet!
initSession()

effect(() => {
  if (account.value) {
    document.body.classList.add('signed-in')
  } else {
    document.body.classList.remove('signed-in')
  }
});

const SignOut = () => {
  function signout () {
    cookieStore.delete(COOKIE_KEY)
    sessionStorage.removeItem(ACCOUNT_KEY)
    account.value = undefined
    accounts = undefined
    location.reload()
  }

  return <button onClick={signout}>Sign out</button>
}

const SignedIn = (props: { wallet: string }) => {
  return <Fragment><span>Signed in as {props.wallet}</span> <SignOut /></Fragment>
}

class XSignIn extends Component<any, any> {
  // Register as <x-greeting>:
  static tagName = 'x-sign-in';

  // Track these attributes:
  static observedAttributes = ['name'];

  onClick = async () => {
    if (!accounts) {
      await connect()
    }

    if (!accounts) {
      return
    }

    const domain = window.location.host;
    const from = accounts[0];
    const nonce = Math.floor(0xFFFFFF * Math.random())
    const date = new Date().toISOString()
    const siweMessage = `I accept the YoFolk Terms of Service.\n\nAccount: ${from}\nURI: https://${domain}\nVersion: 1\nChain ID: 1\nNonce: ${nonce}\nIssued At: ${date}`;
    const msg = `0x${Buffer.from(siweMessage, 'utf8').toString('hex')}`;

      const sig = await ethereum.request({
        method: 'personal_sign',
        params: [msg, from],
      });

      let cookie = JSON.stringify({ msg: siweMessage, from, sig })
      cookieStore.set(COOKIE_KEY, cookie)

      account.value = from
     try {
    } catch (err) {
      console.error(err);
      this.setState({ error: err.message })
    }
  }
  
  render(props) {
    if (!ethereum) {
      return <span />
    }

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