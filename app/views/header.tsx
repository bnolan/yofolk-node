declare module 'preact/src/jsx' {
  namespace JSXInternal {

      // We're extending the IntrinsicElements interface which holds a kv-list of
      // available html-tags.
      interface IntrinsicElements {
          'x-icon': unknown;
          'x-read': unknown;
          'x-meta': unknown;
          'x-sign-in': unknown;
      }
  }
}

interface HeaderProps {
  minimal? : boolean
}

export function Header (props: HeaderProps) {
  return (
    <header>
      <div class='logo'>
        <a href="/"><img src="/logo.svg" /><br />yo folk</a>
      </div>

      <p>
        {' '}<a href="https://github.com/bnolan/yofolk-node">Github</a> |
        {' '}<a href="https://app.uniswap.org/#/tokens/polygon/0xe05fba9fb4796dedf2e81e6f85f11d0fd6f1ade0">$FOLK</a>
      </p>

    { props.minimal || <p>
      <small>Simple social network with ethereum identities</small>
    </p> }

    { props.minimal || <x-sign-in /> }

    </header>

  )
}
