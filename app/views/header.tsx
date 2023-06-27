export function Header () {
  return (
    <header>
      <p>
        <b><a class='logo' href="/"><img src="/logo.svg" />yofolk</a></b> |
        {' '}<a href="https://github.com/bnolan/yofolk-node">Github</a> |
        {' '}<a href="https://app.uniswap.org/#/tokens/polygon/0xe05fba9fb4796dedf2e81e6f85f11d0fd6f1ade0">$FOLK</a>
      </p>

    <p>
      <small>Yofolk is an experiment in social networking on ethereum</small>
    </p>

    <x-sign-in />

    </header>

  )
}
