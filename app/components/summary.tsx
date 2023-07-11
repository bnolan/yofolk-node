import { UserCache } from "../views/home"
import { PostRecord } from "../views/post"
import { Author } from "./author"

export default function Summary (props: { users: UserCache, post: PostRecord }) {
  let { post, users } = props
  
  let url = `/p/${post.id}`
  let content = post.content.replace(/(https:\/\/\S+)/, f => f.slice(0, 40) + (f.length > 40 ? '...' : ''))

  return (
    <div class='post'>
      <x-icon wallet={post.author} />
      <small class='meta'><a href={url}><Author author={post.author} users={users} /></a></small>
      <cite>{content}</cite>
    </div>
  )
}

