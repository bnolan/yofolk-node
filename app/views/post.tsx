import { Author } from "../components/author"
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
  postAuthor: string
}

export function Comment (props: CommentProps) {
  let { users, postId, postAuthor, comment } = props
  
  let anchor = `/p/${postId}#${comment.id}`
  let url = `/p/${postId}/c/${comment.id}`

  if (!comment.author) {
    // fixme - not sure why this is happening (bad query?)
    return
  }
 
  return (
    <div class='comment'>
      <x-icon id={comment.id} />
      <a href={anchor}><Author author={comment.author} users={users} /></a>
      <x-meta url={url} author={comment.author} moderator={postAuthor}></x-meta>
      <Format value={comment.comment} />
    </div>
  )
}

interface PostProps {
  users: UserCache
  post: PostRecord
}

interface ValueProps {
  value: string
}

const Linkify = (props : ValueProps): any => {
  const re = new RegExp('https://\\S+', 'g')

  let elements = []
  let match
  let lastIndex = 0

  while (match = re.exec(props.value)) {
    if (lastIndex < match.index) {
      elements.push(props.value.substring(lastIndex, match.index))
    }

    elements.push(<a rel='nofollow' href={match[0]}>{match[0].slice(8)}</a>)
    lastIndex += match.index + match[0].length
  }

  if (props.value.length > lastIndex) {
    elements.push(props.value.substring(lastIndex));
  }

  return (elements.length === 1) ? elements[0] : elements
}

const Format = (props : ValueProps) => {
  return <cite class='content'>{props.value.split("\n").map((str, key) => <div key={key}><Linkify value={str} /></div>)}</cite>
}

const Embeds = (props: ValueProps): any => {
  const re = new RegExp('https://(www.voxels.com/(womps|parcels)/\\d+)', 'g')
  const matches = Array.from(props.value.matchAll(re))

  return matches.length > 0 ? <ul>{matches.map(m => <iframe class='voxels-embed' src={m[0]} />)}</ul> : null
}

export default function Post (props: PostProps) {
  let { users, post } = props

  let comments = post.comments?.map(c => <Comment postAuthor={post.author} postId={post.id} users={users} comment={c} />)

  let newCommentUrl = `/p/${post.id}/c`
  let url = `/p/${post.id}`
 
  return (
    <section>
      <Header />

      <div class='post view'>
        <x-icon wallet={post.author} />
        <a href={url}><Author author={post.author} users={users} /></a>
        <x-meta url={url} author={post.author} moderator={post.author}></x-meta>
        <time>{ post.created_at }</time>
        <Format value={post.content} />
        <Embeds value={post.content} />

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
