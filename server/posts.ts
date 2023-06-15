import { Pool } from 'pg'

const pool = new Pool({
  database: 'yofolk-prod',
  port: 5432
});

type Wallet = string
type UUID = string

const fields = `p.id, p.content, p.user_id, p.created_at, json_agg(json_build_object('id', c.id, 'comment', c.comment)) as comments`

export const getPosts = async () => {
  return pool.query(`
    SELECT 
      ${fields} 
    FROM 
      posts p 
    LEFT JOIN
      comments c on commentable_id = p.id
    GROUP BY
      p.id
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
    LEFT JOIN
      comments c on commentable_id = p.id
    WHERE 
      p.id = $1
    GROUP BY
      p.id
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
