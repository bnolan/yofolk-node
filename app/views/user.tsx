import { Author } from '../components/author';
import Summary from '../components/summary';
import { Header } from './header'
import { UserCache } from './home';
import { PostRecord } from './post'

type wallet = string

interface UserProps {
  users: UserCache
  user: wallet
  posts: Array<PostRecord>
}

export default function Home (props: UserProps) {
  let posts = props.posts?.map(p => <Summary users={props.users} post={p} />)
  let newPostUrl = '/p'

  return (
    <section>
      <Header />

      <h1>{props.user}</h1>

      { posts }
    </section>
  )
}
