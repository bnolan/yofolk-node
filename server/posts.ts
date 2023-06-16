import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL || "postgres://localhost/yofolk-prod"

const pool = new Pool({ connectionString });

type Wallet = string
type UUID = string

const fields = `p.id, p.content, u.eth_address as author, p.created_at, json_agg(json_build_object('id', c.id, 'comment', c.comment)) as comments`

interface UserRecord {
  name: string
  eth_address: string
}

export const getUsers = async () => {
  let result = await pool.query(`
    select name,eth_address from users;
  `)
  return result.rows as Array<UserRecord>
}

export const getPosts = async () => {
  return pool.query(`
    SELECT 
      ${fields} 
    FROM 
      posts p 
    INNER JOIN
      users u on u.id = p.user_id
    LEFT JOIN
      comments c on commentable_id = p.id
    GROUP BY
      p.id, u.eth_address
    ORDER BY 
      created_at DESC
    `)
}

export const getPostById = (id: string) => {
  return pool.query(`
    SELECT 
      ${fields} 
    FROM 
      posts p 
    INNER JOIN
      users u on u.id = p.user_id
    LEFT JOIN
      comments c on commentable_id = p.id
    WHERE 
      p.id = $1
    GROUP BY
      p.id, u.eth_address
  `, [id])
}

export const createComment = (user: Wallet, post: UUID, comment: string) => {
  return pool.query(`
    INSERT INTO
      comments (user_id, commentable_id, comment, updated_at, created_at)
    VALUES
      ($1, $2, $3, now(), now());
  `, [user, post, comment])
}

export const createPost = (user: Wallet, postContent: string) => {
  return pool.query(`
    INSERT INTO
      posts (user_id, content, updated_at, created_at)
    VALUES
      ($1, $2, now(), now());
  `, [user, postContent])
}
