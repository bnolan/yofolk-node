import { h } from 'preact';

interface CommentRecord {
  id: string
  comment: string
}

interface PostRecord {
  id: string
  content: string
  user_id: string
  created_at: string
  comments: Array<CommentRecord>
}

interface CommentProps {
  comment: CommentRecord
}

export function Comment (props: CommentProps) {
  let { comment } = props
  
  return (
    <section>
      <h3>{ comment.id }</h3>
      <cite>{comment.comment}</cite>
    </section>
  )
}

interface PostProps {
  post: PostRecord
}

function Header () {
  return (
    <header>
      <a href="/">Home</a> |
      <a href="/p">Posts</a>
    </header>

  )
}
export default function Post (props: PostProps) {
  let { post } = props

  console.log(post)

  let comments = post.comments?.map(c => <Comment comment={c} />)

  return (
    <section>
      <Header />

      <h3 class='id'>{ post.id }</h3>
      <time>{ post.created_at }</time>
      <cite>{post.content}</cite>

      { comments }
    </section>
  )
}
