import jazzicon from 'jazzicon'
import { Component } from 'preact';
import register from 'preact-custom-element'
import { useRef, useEffect } from 'preact/hooks'

// <x-greeting name="Bo"></x-greeting>
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

    icon.style.clipPath = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'

    useEffect(() => {
      div.current.appendChild(icon)
    });
    
    return <div class='x-icon' ref={div} />
  }
}

register(XIcon);

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