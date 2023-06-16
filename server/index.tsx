import { getPosts, createComment, getPostById, createPost, getUsers } from './posts'
import * as bodyParser from 'body-parser'
import * as express from 'express'
import { render } from 'preact-render-to-string';

import Home from '../app/views/home'
import Post from '../app/views/post'

const app = express();
const port = process.env.PORT || 3000

if (process.env.NODE_ENV != 'production') {
  app.set('json spaces', 2)
}

let users = {}

main () 

async function main (){
  let rows = await getUsers()

  rows.forEach(u => {
    users[u.eth_address] = u.name
  })
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))

bodyParser.urlencoded({
  extended: true,
})

let user = 'df1e18d7-e487-42f7-b9d6-3dee771e1f96'

// Api

app.get('/api/posts', async (req, res) => {
  let results = await getPosts()
  res.status(200).json(results.rows);
})
app.get('/api/posts/:id', async (req, res) => {
  let results = await getPostById(req.params.id.toString())
  res.status(200).json(results.rows);
})

// Views

app.get('/', async (req, res) => {
  let results = await getPosts()
  res.status(200).send(render(<body><script src="/bundle.js" /><link href='/theme.css' type='text/css' rel='stylesheet' /><Home users={users} posts={results.rows} /></body>));
});
app.post('/p', async (req, res) => {
  // let r = await createPost(user, req.body.content.toString())
  // res.redirect('/')
})
app.get('/p/:id', async (req, res) => {
  let results = await getPostById(req.params.id.toString())
  res.status(200).send(render(<body><link href='/theme.css' type='text/css' rel='stylesheet' /><Post post={results.rows[0]} /></body>));
})
app.post('/p/:id/c', async (req, res) => {
  // let id = req.params.id.toString()
  // let results = await createComment(user, id, req.body.comment.toString())
  // let path = `/p/${id}`
  // res.redirect(path)
})

// app.post('/users', db.createUser);
// app.put('/users/:id', db.updateUser);
// app.delete('/users/:id', db.deleteUser);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});