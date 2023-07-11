import { Author } from '../components/author';
import Summary from '../components/summary';
import { Header } from './header'
import { PostRecord } from './post'

export type UserCache = Record<string, string>

interface HomeProps {
  users: UserCache
  posts: Array<PostRecord>
}

export default function Home (props: HomeProps) {
  let posts = props.posts?.map(p => <Summary users={props.users} post={p} />)
  let newPostUrl = '/p'

  return (
    <section>
      <Header />

      <form action={newPostUrl} method="post">
        <textarea name="content" />
        <input type="submit" value="Post" />
      </form>

      { posts }
    </section>
  )
}
