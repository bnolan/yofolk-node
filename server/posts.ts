import { Pool } from 'pg'
import { migrate } from "postgres-migrations"

const connectionString = process.env.DATABASE_URL || "postgres://localhost/yofolk-prod"

async function connect (client) {
  await migrate({ client }, "migrate")
  console.log(`Foxus web migrated db.`)
}

const pool = new Pool({ connectionString });
connect(pool)

type Wallet = string
type UUID = string

const fields = `p.id, p.content, p.user_address as author, p.created_at, json_agg(json_build_object('id', c.id, 'comment', c.comment, 'author', c.user_address)) as comments`
const comment_fields = `c.id, c.comment, c.user_address`

interface UserRecord {
  name: string
  eth_address: string
}

interface PostRecord {
  id: UUID
  author: Wallet
  comments: any
  content: string
}

export const getUsers = async () => {
  let result = await pool.query(`
    select name,eth_address from users;
  `)
  return result.rows as Array<UserRecord>
}

let gpt

export const getSummary = async (users) => {
  if (!gpt) {
    const importDynamic = new Function('modulePath', 'return import(modulePath)')
    const { ChatGPTAPI } = await importDynamic('chatgpt')
    
    gpt = new ChatGPTAPI({ apiKey: process.env.OPENAI_API_KEY })
  }

  function inline (st?: string) {
    return st?.replace(/[\r\t\s\n]+/g, ' ').replace(/"/g, '')
  }

  function username (st: Wallet) {
    return st ? (users[st] || (st.slice(0, 6) + '..')) : 'unknown'
  }

  let d = new Date()
  d.setHours(0)
  d.setMinutes(0)

  // @ts-ignore
  d = new Date(d - 1000 * 3600 * 24 * 7)

  let result = await pool.query(`
    SELECT 
      ${fields} 
    FROM 
      posts p 
    LEFT JOIN
      comments c on commentable_id = p.id
    WHERE
      p.created_at > $1 or c.created_at > $1
    GROUP BY
      p.id
  `, [d]
  )

  let posts = result.rows.slice() as Array<PostRecord>
  let text = posts.map(p => {
    return `${username(p.author)} said "${inline(p.content)}"` + p.comments.filter(c => c.comment).map(c => `and ${username(c.author)} replied "${inline(c.comment)}"`).join(' ')
  }).join("\n")

  if (posts.length == 0) {
    text = "Nothing is happening"
  }
  
  const res = await gpt.sendMessage(`Please summarise in as few words as possible:\n\n${text}`)
  return res.text
}

export const getPosts = async () => {
  return pool.query(`
    SELECT 
      ${fields} 
    FROM 
      posts p 
    LEFT JOIN
      comments c on commentable_id = p.id
    WHERE
      public <> false
    GROUP BY
      p.id
    ORDER BY 
      created_at DESC
    `)
}

export const getPostsByUser = async (user: Wallet) => {
  return pool.query(`
    SELECT 
      ${fields} 
    FROM 
      posts p 
    LEFT JOIN
      comments c on commentable_id = p.id
    WHERE
      p.user_address = $1 and public <> false
    GROUP BY
      p.id
    ORDER BY 
      created_at DESC
    `, [user])
}

export const getPostById = (id: string) => {
  return pool.query(`
    SELECT 
      ${fields} 
    FROM 
      posts p 
    LEFT JOIN
      comments c on commentable_id = p.id
    WHERE
      p.id = $1 and public <> false
    GROUP BY
      p.id
  `, [id])
}

export const createComment = (user: Wallet, post: UUID, comment: string) => {
  return pool.query(`
    INSERT INTO
      comments (user_address, commentable_id, comment, updated_at, created_at)
    VALUES
      ($1, $2, $3, now(), now());
  `, [user, post, comment])
}

export const createPost = (user: Wallet, postContent: string) => {
  return pool.query(`
    INSERT INTO
      posts (user_address, content, updated_at, created_at)
    VALUES
      ($1, $2, now(), now());
  `, [user, postContent])
}

export const deletePost = async (user: Wallet, post: UUID) => {
  await pool.query(`
    DELETE FROM 
      comments
    WHERE
      commentable_id=$2 AND (select true from posts p where p.id=$2 and p.user_address=$1)
  `, [user, post])

  await pool.query(`
    DELETE FROM 
      posts
    WHERE
      user_address=$1 AND id=$2;
  `, [user, post])
}

export const deleteComment = (user: Wallet, post: UUID, comment: UUID) => {
  return pool.query(`
    DELETE FROM 
      comments
    WHERE
        id=$3 
      and 
        commentable_id=$2 
      and (
        (select true from posts p where p.id=$2 and p.user_address=$1) or user_address=$1
      )
  `, [user, post, comment])
}


