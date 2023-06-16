import { Header } from './header'
import { PostRecord } from './post'

declare module 'preact/src/jsx' {
  namespace JSXInternal {

      // We're extending the IntrinsicElements interface which holds a kv-list of
      // available html-tags.
      interface IntrinsicElements {
          'x-icon': unknown;
      }
  }
}

type UserCache = Record<string, string>

export function Post (props: { users: UserCache, post: PostRecord }) {
  let { post, users } = props
  
  let url = `/p/${post.id}`

  return (
    <div class='post'>
      <x-icon wallet={post.author} />
      <small class='meta'><a href={url}>{ users[post.author] }</a></small>
      <cite>{post.content}</cite>
    </div>
  )
}


interface HomeProps {
  users: UserCache
  posts: Array<PostRecord>
}

export default function Home (props: HomeProps) {
  let posts = props.posts?.map(p => <Post users={props.users} post={p} />)
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
