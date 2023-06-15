import { Header } from "./header"

export interface CommentRecord {
  id: string
  comment: string
}

export interface PostRecord {
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

export default function Post (props: PostProps) {
  let { post } = props

  let comments = post.comments?.map(c => <Comment comment={c} />)

  let newCommentUrl = `/p/${post.id}/c`
 
  return (
    <section>
      <Header />

      <h3 class='id'>{ post.id }</h3>
      <time>{ post.created_at }</time>
      <cite>{post.content}</cite>

      { comments }

      <form action={newCommentUrl} method="post">
        <textarea name="comment" />
        <input type="submit" value="Post" />
      </form>
    </section>
  )
}
