import { Header } from "./header"

export default function NotFound (props: any) {
  let type = 'Page'

  return (
    <section>
      <Header minimal={true} />

      <h1>{type} not found</h1>
    </section>
  )
}
