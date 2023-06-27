import { Header } from "./header"
import { UserCache } from "./home"

export interface CommentRecord {
  id: string
  comment: string
  author: string
}

export interface PostRecord {
  id: string
  content: string
  author: string
  created_at: string
  comments: Array<CommentRecord>
}

interface CommentProps {
  users: UserCache
  comment: CommentRecord
  postId: string
}

export function Comment (props: CommentProps) {
  let { users, postId, comment } = props
  
  let url = `/p/${postId}#${comment.id}`

  if (!comment.author) {
    // fixme - not sure why this is happening (bad query?)
    return
  }
 
  return (
    <div class='comment'>
      <x-icon wallet={comment.author} />
      <small class='meta'><a href={url}>{ users[comment.author] }</a></small>
      <cite>{comment.comment}</cite>
    </div>
  )
}

interface PostProps {
  users: UserCache
  post: PostRecord
}

export default function Post (props: PostProps) {
  let { users, post } = props

  let comments = post.comments?.map(c => <Comment postId={post.id} users={users} comment={c} />)

  let newCommentUrl = `/p/${post.id}/c`
  let url = `/p/${post.id}`
 
  return (
    <section>
      <Header />

      <div class='post view'>
        <x-icon wallet={post.author} />
        <small class='meta'><a href={url}>{ users[post.author] }</a></small>
        <time>{ post.created_at }</time>
        <cite>{post.content}</cite>

        <div class='comments'>
          { comments }
        </div>

        <form class='new-comment' action={newCommentUrl} method="post">
          <textarea class='comment-field' name="comment" />
          <input type="submit" value="Post" />
        </form>
      </div>
    </section>
  )
}
