import { Header } from './header'
import { PostRecord } from './post'

export function Post (props: { post: PostRecord }) {
  let { post } = props
  
  let url = `/p/${post.id}`

  return (
    <section>
      <h3><a href={url}>{ post.id }</a></h3>
      <cite>{post.content}</cite>
    </section>
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
