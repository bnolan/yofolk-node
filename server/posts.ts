import { Pool } from 'pg'

const pool = new Pool({
  database: 'yofolk-prod',
  port: 5432
});

const fields = `p.id, p.content, p.user_id, p.created_at, json_agg(json_build_object('id', c.id, 'comment', c.comment)) as comments`

export const getPosts = async () => {
  return pool.query(`
    SELECT 
      ${fields} 
    FROM 
      posts p 
    INNER JOIN
      comments c on commentable_id = p.id
    GROUP BY
      p.id
    ORDER BY 
      id ASC
    `)
}

export const getPostById = (id: string) => {
  return pool.query(`
    SELECT 
      ${fields} 
    FROM 
      posts p 
    INNER JOIN
      comments c on commentable_id = p.id
    WHERE 
      p.id = $1
    GROUP BY
      p.id
  `, [id])
}
