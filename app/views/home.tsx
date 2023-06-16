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

export function Post (props: { post: PostRecord }) {
  let { post } = props
  
  let url = `/p/${post.id}`

  return (
    <div class='post'>
      <x-icon wallet={post.user_id} />
      <small class='meta'><a href={url}>{ post.id }</a></small>
      <cite>{post.content}</cite>
    </div>
  )
}

interface HomeProps {
  posts: Array<PostRecord>
}

export default function Home (props: HomeProps) {
  let posts = props.posts?.map(p => <Post post={p} />)
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
