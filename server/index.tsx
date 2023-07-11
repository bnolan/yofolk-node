import { getPosts, getSummary, getPostsByUser, createComment, getPostById, createPost, getUsers, deleteComment, deletePost } from './posts'
import * as bodyParser from 'body-parser'
import * as express from 'express'
import { render } from 'preact-render-to-string';
import * as cookieParser from 'cookie-parser'
import { ethers } from 'ethers'

import Home from '../app/views/home'
import Post from '../app/views/post'
import User from '../app/views/user'
import NotFound from '../app/views/not-found'

const app = express();
const port = process.env.PORT || 3000

if (process.env.NODE_ENV != 'production') {
  app.set('json spaces', 2)
}

let users = {}

main () 

type wallet = string
export interface AuthenticatedRequest extends express.Request {
  user: wallet
}

async function main (){
  let rows = await getUsers()

  rows.forEach(u => {
    users[u.eth_address] = u.name
  })
}

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))

bodyParser.urlencoded({
  extended: true,
})

// Api

app.get('/api/posts', async (req, res) => {
  let results = await getPosts()
  res.status(200).json(results.rows);
})
app.get('/api/posts/:id', async (req, res) => {
  let results = await getPostById(req.params.id.toString())
  res.status(200).json(results.rows);
})

async function auth (req: AuthenticatedRequest, res, next) {
  let string = req.cookies['yofolk-auth']

  try {
    let { msg, from, sig } = JSON.parse(string)

    const signerAddr = await ethers.utils.verifyMessage(msg, sig);

    if (signerAddr.toLowerCase() == from.toLowerCase()) {
      req.user = from
      next()
    } else {
      res.status(401)
      next(new Error('Not authorized'))
    }
  } catch (err) {
    res.status(401)
    next(new Error('Not authorized'))
  }
}

function page (component) {
  return render(
    <html>
      <head>
        <script src="/bundle.js" />
        <link href='/theme.css' type='text/css' rel='stylesheet' />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/logo.svg" />
        <title>yo folk</title>
      </head>
      <body>
        {component}
      </body>
    </html>
  );
}

// Views

app.get('/', async (req, res) => {
  let results = await getPosts()
  res.status(200).send(page(<Home users={users} posts={results.rows} />))
});
app.post('/p', auth, async (req: AuthenticatedRequest, res) => {
  let r = await createPost(req.user, req.body.content.toString())
  res.redirect('/')
})
app.delete('/p/:id', auth, async (req: AuthenticatedRequest, res) => {
  let id = req.params.id.toString()
  await deletePost(req.user, id)
  res.type('text/plain').send('Post and comments deleted')
})

app.get('/p/summary', async (req, res) => {
  let summary = await getSummary(users)
  res.type('text/plain').send(summary)
})
app.get('/p/:id', async (req, res) => {
  let results = await getPostById(req.params.id.toString())

  if (results.rowCount > 0) {
    res.status(200).send(page(<Post users={users} post={results.rows[0]} />));
  } else {
    res.status(404).send(page(<NotFound />));
  }
})
app.post('/p/:id/c', auth, async (req: AuthenticatedRequest, res) => {
  let id = req.params.id.toString()
  let results = await createComment(req.user, id, req.body.comment.toString())
  let path = `/p/${id}`
  res.redirect('back')
})
app.delete('/p/:postId/c/:id', auth, async (req: AuthenticatedRequest, res) => {
  let postId = req.params.postId.toString()
  let id = req.params.id.toString()
  await deleteComment(req.user, postId, id)
  res.type('text/plain').send('Comment deleted')
})

app.get('/u/:id', async (req, res) => {
  let user = req.params.id.toString() as wallet
  let results = await getPostsByUser(user)
  res.status(200).send(page(<User users={users} user={user} posts={results.rows} />))
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});